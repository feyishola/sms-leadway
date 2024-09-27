import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import userModel from "../models/user.model";
import coursesModel from "../models/course.model";

import { generateLast12MonthsData } from "../utils/analyticsGenerator";
import orderModel from "../models/order.model";

//User analytics -- admmin only
export const getUserAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Couses analytics -- admmin only
export const getCourseAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthsData(coursesModel);

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Order analytics -- admmin only
export const getOrderAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsData(orderModel);

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
