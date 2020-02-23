import { IHobbyModel } from "./model";

/**
 * @export
 * @interface IHobbyService
 */
export interface IHobbyService {
  /**
   * @returns {Promise<IHobbyModel[]>}
   * @memberof IHobbyService
   */
  findAll(): Promise<IHobbyModel[]>;

  /**
   * @param {string} code
   * @returns {Promise<IHobbyModel>}
   * @memberof IHobbyService
   */
  findOne(code: string): Promise<IHobbyModel>;

  /**
   * @param {IHobbyModel} IHobbyModel
   * @returns {Promise<IHobbyModel>}
   * @memberof IHobbyService
   */
  insert(IHobbyModel: IHobbyModel): Promise<IHobbyModel>;

  /**
   * @param {IHobbyModel} IHobbyModel
   * @returns {Promise<IHobbyModel>}
   * @memberof IHobbyService
   */
  update(id: string, IHobbyModel: IHobbyModel): Promise<IHobbyModel>;

  /**
   * @param {string} id
   * @returns {Promise<IHobbyModel>}
   * @memberof IHobbyService
   */
  remove(id: string): Promise<IHobbyModel>;
}
