import express from "express";

import { getNotifications, updateNotificationStatus } from "../controllers/notificationControllers";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const notificationRouter = express.Router();

notificationRouter.get("/all-notifications", isAutheticated, authorizeRoles("admin"), getNotifications);
notificationRouter.put("/update-notification/:id", isAutheticated, authorizeRoles("admin"), updateNotificationStatus);

export default notificationRouter;
