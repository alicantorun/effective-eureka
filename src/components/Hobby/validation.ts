import * as Joi from "@hapi/joi";
import Validation from "@/components/validation";
import { IHobbyModel } from "./model";

/**
 * @export
 * @class HobbyValidation
 * @extends Validation
 */
class HobbyValidation extends Validation {
  /**
   * Creates an instance of HobbyValidation.
   * @memberof HobbyValidation
   */
  constructor() {
    super();
  }

  /**
   * @param {IHobbyModel} params
   * @returns {Joi.ValidationResult<IHobbyModel >}
   * @memberof HobbyValidation
   */
  createHobby(params: IHobbyModel): Joi.ValidationResult<IHobbyModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      name: Joi.string().required(),
      passionLevel: Joi.number().required(),
      year: Joi.number().required()
    });

    return schema.validate(params);
  }

  /**
   * @param {IHobbyModel} params
   * @returns {Joi.ValidationResult<IHobbyModel >}
   * @memberof HobbyValidation
   */
  updateHobby(params: IHobbyModel): Joi.ValidationResult<IHobbyModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      name: Joi.string().required(),
      passionLevel: Joi.string().required(),
      year: Joi.string().required()
    });

    return schema.validate(params);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof HobbyValidation
   */
  getHobby(body: {
    id: string;
  }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return schema.validate(body);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof HobbyValidation
   */
  removeHobby(body: {
    id: string;
  }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return schema.validate(body);
  }
}

export default new HobbyValidation();
