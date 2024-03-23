import { Router } from "express";
import UserController from "../controllers/users";
import Auth from "../middlewares/auth";
const router = Router();

router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.put("/:id", Auth, UserController.updateUser);
router.delete("/:id", Auth, UserController.deleteUser);
router.post("/login", UserController.login);
router.post("/reset-forget", UserController.forgetPassword);
router.post("/check-token", UserController.checkValidateToken);

export default router;
