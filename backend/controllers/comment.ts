import { Request, Response, NextFunction } from "express";
import { Comment, IComment } from "./../models/comment";
import { AuthRequest } from "../interface/authRequest";
import { IUser } from "./../models/users";
import { Livre } from "../models/livre";
class CommentControllers {
  static async createComment(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const { livreID, auteur, ...body } = req.body;

      const newComment = await Comment.create({
        auteur: auth._id,
        livreID,
        ...body,
      });

      await Livre.findOneAndUpdate(
        { _id: livreID },
        {
          $push: {
            comment: {
              $each: [`${newComment._id}`],
            },
          },
        }
      );
      if (!newComment)
        return res.status(400).json({
          statut: false,
          message: "Erreur lors de la creation du commentaire",
        });
      res
        .status(201)
        .json({ statut: false, message: { ...newComment.toObject() } });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async updateComment(req: AuthRequest, res: Response) {
    try {
      const { content, ...body } = req.body;

      const auth: IUser = req.auth as IUser;
      const id: string = req.params.id;
      const exist = await Comment.findById(id);

      if (exist && exist.auteur == auth._id) {
        await Comment.updateOne({ _id: id }, { content, ...body });
        return res.status(200).json({
          statut: true,
          message: "Bien Modifié !!!",
        });
      }

      res.status(400).json({
        statut: false,
        message: "Vous n'êtes autorisé à modifié ce commentaire ",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async deleteComment(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const id: string = req.params.id;
      const exist = await Comment.findById(id);

      if (exist && exist.auteur == auth._id) {
        await Comment.deleteOne({ _id: id });
        return res
          .status(200)
          .json({ statut: true, message: "Suppression avec succès" });
      }
      res.status(400).json({
        statut: false,
        message: "Vous n'êtes autorisé à supprimé ce commentaire ",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getComment(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const exist = await Comment.findById(id).populate(
        "auteur",
        "fullname username"
      );

      if (exist) {
        return res
          .status(200)
          .json({ statut: true, message: { ...exist.toObject() } });
      }

      res.status(404).json({
        statut: false,
        message: "Commentaire introuvable",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getAllComment(req: Request, res: Response) {
    try {
      const exist = await Comment.find({}).populate(
        "auteur",
        "fullname username"
      );

      if (exist) {
        return res
          .status(200)
          .json({ statut: true, message: { ...exist } });
      }

      res.status(404).json({
        statut: false,
        message: "Commentaire introuvable",
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

export default CommentControllers;
