import { Router } from "express";
import { HobbyComponent } from "@/components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/Hobbies
 *
 * @swagger
 * /v1/Hobbies:
 *   get:
 *     description: Get all stored Hobbies in Database
 *     tags: ["Hobbies"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of Hobbies
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Hobbies'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get("/", HobbyComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/Hobbies
 *
 * @swagger
 * /v1/Hobbies:
 *   post:
 *      description: Create new Hobby
 *      tags: ["Hobbies"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HobbySchema'
 *            example:
 *              name: userName
 *              email: test.user@mail.com
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/HobbySchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", HobbyComponent.create);

/**
 * GET method route
 * @example http://localhost:PORT/v1/Hobbies/:id
 *
 * @swagger
 * /v1/Hobbies/{id}:
 *  get:
 *    description: Get user by userId
 *    tags: ["Hobbies"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return user by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/HobbySchema'
 */
router.get("/:id", HobbyComponent.findOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/Hobbies/:id
 *
 * @swagger
 * /v1/Hobbies/{id}:
 *  put:
 *    description: Get user by userId
 *    tags: ["Hobbies"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return user by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/HobbySchema'
 */
router.put("/:id", HobbyComponent.update);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/Hobbies/:id
 *
 * @swagger
 * /v1/Hobbies/{id}:
 *  delete:
 *    description: Delete user by userId
 *    tags: ["Hobbies"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/HobbySchema'
 */
router.delete("/:id", HobbyComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
