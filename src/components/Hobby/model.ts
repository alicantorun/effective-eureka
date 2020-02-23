import * as connections from "@/config/connection/connection";

import { Document, Schema } from "mongoose";

/**
 * @export
 * @interface IHobbyModel
 * @extends {Document}
 */
export interface IHobbyModel extends Document {
  name: string;
  passionLevel: string;
  year: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    HobbySchema:
 *      properties:
 *        name:
 *          type: string
 *        passionLevel:
 *          type: string
 *        year:
 *          type: string
 */
const HobbySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: "Enter Hobby"
    },
    passionLevel: { type: Number, required: "Enter Passion Level" },
    year: { type: Number, required: "Enter Year" }
  },
  {
    collection: "hobbies",
    versionKey: false,
    timestamps: true
  }
);

export default connections.db.model<IHobbyModel>("HobbyModel", HobbySchema);
