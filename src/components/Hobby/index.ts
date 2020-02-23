import HobbyService from "./service";
import { HttpError } from "@/config/error";
import { IHobbyModel } from "./model";
import { NextFunction, Request, Response } from "express";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hobbies: IHobbyModel[] = await HobbyService.findAll();

    res.status(200).json(hobbies);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hobby: IHobbyModel = await HobbyService.findOne(req.params.id);

    res.status(200).json(hobby);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hobby: IHobbyModel = await HobbyService.update(
      req.params.id,
      req.body
    );

    res.status(200).json(hobby);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hobby: IHobbyModel = await HobbyService.insert(req.body);

    res.status(201).json(hobby);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hobby: IHobbyModel = await HobbyService.remove(req.params.id);

    res.status(200).json(hobby);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
