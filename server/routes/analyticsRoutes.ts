import express from "express";

import {
  getUserAnalytics,
  getCourseAnalytics,
  getOrderAnalytics,
} from "../controllers/analyticsControllers";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAutheticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
analyticsRouter.get(
  "/get-courses-analytics",
  isAutheticated,
  authorizeRoles("admin"),
  getCourseAnalytics
);
analyticsRouter.get(
  "/get-orders-analytics",
  isAutheticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);

export default analyticsRouter;
