import { Router } from "express";
import LivreControllers from "../controllers/livre";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", LivreControllers.getAllLivre);
router.get("/:id", LivreControllers.getLivre);
router.get("/:id/comments", Auth, LivreControllers.getCommentsForLivre);
router.post("/", Auth, LivreControllers.createLivre);
router.put("/:id", Auth, LivreControllers.updateLivre);
router.delete("/:id", Auth, LivreControllers.deleteLivre);

export default router;
