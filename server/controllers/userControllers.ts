require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  getUserById,
  getAllUsersService,
  updateUserRoleService,
} from "../services/userServices";

const cloudinary = require("cloudinary").v2;

//Register User
interface IRegisterationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return next(new ErrorHandler(`Email ${email} already exists`, 400));
      }

      const user: IRegisterationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate Your Account",
          template: "activation-mail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Your account activation email has been sent to ${user.email}`,
          activationToken: activationToken.token,
        });
      } catch (error) {
        return next(
          new ErrorHandler("There is an error sending you an email", 400)
        );
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(100000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

//Activate User Account

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } = req.body;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      ) as { user: IUser; activationCode: string };
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;
      const userExist = await userModel.findOne({ email });

      if (userExist) {
        return next(new ErrorHandler("User Already Exist", 400));
      }

      const user = await userModel.create({ name, email, password });

      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Login User
interface ILoginUser {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginUser;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please enter your email and password.", 400)
        );
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      const isPasswordMatch = await user.comparePasswords(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Logout user
export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const userId = req.user?._id || "";

      // redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Logged Out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Update Access Token
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Could not refresh token";
      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(
          new ErrorHandler("Please login to access this resourse!", 403)
        );
      }
      const user = JSON.parse(session);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800);

      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get User Information
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      getUserById(userId as any, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ISocialAuthBody {
  name: string;
  email: string;
  avatar?: string;
}

//Social Auth
export const socialAuth = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, avatar } = req.body as ISocialAuthBody;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ name, email, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Update user info
interface IUpdateUserInfo {
  name: string;
  email: string;
}

export const updateUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (name && user) {
        user.name = name;
      }

      await user?.save();
      // await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        message: "User update successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update user password
interface IUserPassword {
  oldPassword: string;
  newPassword: string;
}

export const updateUserPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUserPassword;

      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("Please enter old and new passwords", 400)
        );
      }

      const user = await userModel.findById(req.user?._id).select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid user", 400));
      }

      const isPasswordMatch = await user?.comparePasswords(oldPassword);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = newPassword;

      await user.save();
      // await redis.set(req.user?._id, JSON.stringify(user));

      res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update Avatar
interface IUpdateProfileImage {
  avatar: string;
}
export const updateImage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfileImage;
      const userId = req.user?._id;

      const user = await userModel.findById(userId);

      if (avatar && user) {
        if (user?.avatar?.public_id) {
          await cloudinary.v2.upload.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.upload.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.upload.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user.save();
      // await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        message: "Avatar saved successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all user -- AdminOnly
export const getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Update user role -- only Admin
export const updateUserRole = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const isUserExist = await userModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateUserRoleService(res, id as any, role);
      } else {
        res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Delete a user --- Admin Only
export const deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);

      if (!user) {
        return next(new ErrorHandler("User Not Found", 400));
      }
      user.deleteOne({ id });

      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
