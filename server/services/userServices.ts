import userModel from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { redis } from "../utils/redis";
import { catchAsyncError } from "../middleware/catchAsyncErrors";

//Get User By ID
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(200).json({
      success: true,
      user,
    });
  }
};

//Get All Users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
  });
};

//Update User Role Service
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findById(id, { role }, { new: true });
};
