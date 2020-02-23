import * as bcrypt from "bcrypt";
import * as connections from "@/config/connection/connection";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";

/**
 * @export
 * @interface IUserRequest
 */
export interface IUserRequest {
  id: string;
  email: string;
}

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
  email: string;
  password: string;
  name: string;
  hobbies: Array<String>;

  comparePassword: (password: string) => Promise<boolean>;
}

export type AuthToken = {
  accessToken: string;
  kind: string;
};

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        hobbies:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/HobbySchema'
 */
const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    hobbies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hobby"
      }
    ],
    password: String
  },
  {
    collection: "users",
    versionKey: false
  }
).pre("save", async function(next: NextFunction): Promise<void> {
  const user: any = this; // tslint:disable-line

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(
      candidatePassword,
      this.password
    );

    return match;
  } catch (error) {
    return error;
  }
};

export default connections.db.model<IUserModel>("UserModel", UserSchema);
