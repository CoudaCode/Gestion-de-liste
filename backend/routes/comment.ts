import { Router } from "express";
import CommentControllers from "../controllers/comment";
import Auth from "../middlewares/auth";

const router = Router()

router.get("/:id", Auth, CommentControllers.getComment)
router.get("/",CommentControllers.getAllComment)
router.post("/", Auth, CommentControllers.createComment)
router.put("/:id", Auth, CommentControllers.updateComment)
router.delete("/:id",Auth, CommentControllers.deleteComment)

export default router