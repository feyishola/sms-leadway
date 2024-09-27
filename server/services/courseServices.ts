import { NextFunction, Request, Response } from "express";
import courseModel, { ICourse } from "../models/course.model";
import { catchAsyncError } from "../middleware/catchAsyncErrors";

//create a course
export const createCourse = catchAsyncError(
  async (data: any, req: Request, res: Response, next: NextFunction) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

//Get All
export const getAllCoursesService = async (res: Response) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    courses,
  });
};
