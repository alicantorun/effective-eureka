import * as Joi from "@hapi/joi";
import HobbyModel, { IHobbyModel } from "./model";
import HobbyValidation from "./validation";
import { IHobbyService } from "./interface";
import { Types } from "mongoose";

/**
 * @export
 * @implements {IHobbyModelService}
 */
const HobbyService: IHobbyService = {
  /**
   * @returns {Promise < IHobbyModel[] >}
   * @memberof HobbyService
   */
  async findAll(): Promise<IHobbyModel[]> {
    try {
      return await HobbyModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IHobbyModel >}
   * @memberof HobbyService
   */
  async findOne(id: string): Promise<IHobbyModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = HobbyValidation.getHobby({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await HobbyModel.findOne({
        _id: Types.ObjectId(id)
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IHobbyModel} hobby
   * @returns {Promise < IHobbyModel >}
   * @memberof HobbyService
   */
  async insert(body: IHobbyModel): Promise<IHobbyModel> {
    try {
      const validate: Joi.ValidationResult<IHobbyModel> = HobbyValidation.createHobby(
        body
      );

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const hobby: IHobbyModel = await HobbyModel.create(body);

      return hobby;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IHobbyModel} hobby
   * @returns {Promise < IHobbyModel >}
   * @memberof HobbyService
   */
  async update(id: string, body: IHobbyModel): Promise<IHobbyModel> {
    try {
      const validate: Joi.ValidationResult<IHobbyModel> = HobbyValidation.updateHobby(
        body
      );

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const hobby: IHobbyModel = await HobbyModel.findByIdAndUpdate(
        {
          _id: Types.ObjectId(id)
        },
        body
      );

      return hobby;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IHobbyModel >}
   * @memberof HobbyService
   */
  async remove(id: string): Promise<IHobbyModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = HobbyValidation.removeHobby({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const hobby: IHobbyModel = await HobbyModel.findOneAndRemove({
        _id: Types.ObjectId(id)
      });

      return hobby;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default HobbyService;
