import { Request, Response, NextFunction } from "express";
import { Livre, ILivre } from "./../models/livre";
import { AuthRequest } from "../interface/authRequest";
import { User, IUser } from "./../models/users";
import { Comment } from "../models/comment";
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

      await User.findOneAndUpdate(
        { _id: auth._id },
        {
          $push: {
            livre: {
              $each: [`${newLivre._id}`],
            },
          },
        }
      );
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

      if (exist && auth._id == exist.auteur) {
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

      if (exist && auth._id == exist.auteur) {
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
      const exist = await Livre.findById(id).populate("comment","content");
      if (exist && auth._id == exist.auteur) {
        return res
          .status(200)
          .json({ statut: true, message: { ...exist.toObject() } });
      }
      res.status(400).json({
        statut: false,
        message: "Vous n'êtes pas autorisé",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getAllLivre(req: Request, res: Response) {
    try {
      const allLivre = await Livre.find({}).populate("comment","content");

      if (!allLivre)
        return res.status(400).json({
          statut: false,
          message: "Ya pas livre ",
        });

      res.status(200).json({
        statut: true,
        message: { ...allLivre },
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }

  static async getCommentsForLivre(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const livreId: string = req.params.id;

      // Check if the user has permission to view comments for this Livre
      const hasPermission = await Livre.exists({
        _id: livreId,
        auteur: auth._id,
      });

      if (!hasPermission) {
        return res.status(403).json({
          statut: false,
          message:
            "Vous n'êtes pas autorisé à voir les commentaires de ce livre",
        });
      }

      // Retrieve comments for the specified Livre
      const comments = await Comment.find({ livreID: livreId }).populate("auteur","fullname username");

      res.status(200).json({
        statut: true,
        message: { comments },
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
