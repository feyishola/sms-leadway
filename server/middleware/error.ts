import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: Function) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongo ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Duplicate Key error
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonwebTokenError") {
    const message = `JWT is Invalid. Try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `JWT has expired. Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
