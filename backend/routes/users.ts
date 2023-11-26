import { Router} from "express";
import UserController from "../controllers/users";
import Auth from "../middlewares/auth";
import { User } from "../models/users";
const router = Router();

router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.put("/:id", Auth , UserController.updateUser);
router.delete("/:id", Auth, UserController.deleteUser)
router.post("/login", UserController.login)
export default router;
