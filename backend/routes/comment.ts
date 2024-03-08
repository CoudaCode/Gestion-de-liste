import { Router } from "express";
import CommentControllers from "../controllers/comment";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", CommentControllers.getAllComment);
router.post("/:id/comment", Auth, CommentControllers.createComment);
router.get("/:id/comment/:commentId", Auth, CommentControllers.getComment);
router.put("/:id/comment/:commentId", Auth, CommentControllers.updateComment);
router.delete(
  "/:id/comment/:commentId",
  Auth,
  CommentControllers.deleteComment
);
router.get("/:id/comments", Auth, CommentControllers.getCommentsForLivre);
export default router;
