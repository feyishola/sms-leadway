import mongoose, { Document, Model, Schema } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: "string",
      required: true,
    },
    message: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

const notificationModel: Model<INotification> = mongoose.model(
  "Notofication",
  notificationSchema
);

export default notificationModel;
