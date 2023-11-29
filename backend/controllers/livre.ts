import { Request, Response, NextFunction } from "express";
import { Livre, ILivre } from "./../models/livre";
import { AuthRequest } from "../interface/authRequest";
import { User, IUser } from "./../models/users";
class LivreControllers {
  static async createLivre(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const { title, ...body } = req.body;
      const exist = await Livre.findOne({ title });

      if (exist) {
        return res
          .status(400)
          .json({ statut: false, message: "ce livre exist deja" });
      }

      const newLivre = await Livre.create({
        auteur: auth._id,
        title,
        ...body,
      });

      res
        .status(201)
        .json({ statut: true, message: { ...newLivre.toObject() } });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async updateLivre(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const auth: IUser = req.auth as IUser;
      const exist = await Livre.findById(id);

      if (exist && auth._id === exist.auteur) {
        const editLivre = await Livre.updateOne({ _id: id }, { ...req.body });
        return res
          .status(201)
          .json({ statut: true, message: { ...editLivre } });
      }
      res.status(400).json({
        statut: false,
        message: "Vos n'êtes pas autorisé à modifier ce livre",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async deleteLivre(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const auth: IUser = req.auth as IUser;
      const exist = await Livre.findById(id);

      if (exist && auth._id === exist.auteur) {
        await Livre.deleteOne({ _id: id });
        return res
          .status(201)
          .json({ statut: true, message: "Bien supprimé !!!" });
      }
      res.status(400).json({
        statut: false,
        message: "Vos n'êtes pas autorisé à supprimer ce livre",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getLivre(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const auth: IUser = req.auth as IUser;
      const exist = await Livre.findById(id);

      if (exist && auth._id === exist._id) {
        return res.status(200).json({ statut: true, message: { ...exist } });
      }
      res.status(400).json({
        statut: false,
        message: "Vos n'êtes pas autorisé",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getAllLivre(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const allLivre = await Livre.find({ auteur: auth._id });

      if (!allLivre)
        return res.status(400).json({
          statut: false,
          message: "Ya pas livre ",
        });

        res.status(200).json({
            statut: false,
            message: {...allLivre},
          });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
}

export default LivreControllers;
