import { Router } from "express";
import LivreControllers from "../controllers/livre";
import Auth from "../middlewares/auth";

const router = Router()

router.get("/:id", Auth, LivreControllers.createLivre)
router.get("/",Auth, LivreControllers.getAllLivre)
router.post("/", Auth, LivreControllers.createLivre)
router.put("/:id", Auth, LivreControllers.updateLivre)
router.delete("/:id",Auth, LivreControllers.deleteLivre)

export default router