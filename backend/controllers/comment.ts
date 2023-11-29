import { Request, Response, NextFunction } from "express";
import { Comment, IComment } from "./../models/comment";
import { AuthRequest } from "../interface/authRequest";
import { IUser } from "./../models/users";
import { Livre } from "../models/livre";
class CommentControllers {
  static async createComment(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const { auteur, ...body } = req.body;

      const newComment = await Comment.create({
        auteur: auth._id,
        ...body,
      });

      await Livre.findOneAndUpdate(
        { _id: auth._id },
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
      const { ...body } = req.body;

      const auth: IUser = req.auth as IUser;
      const id: string = req.params.id;
      const exist = await Comment.findById(id);

      if (exist && exist.auteur == auth._id) {
        const updateComment = await Livre.updateOne({ _id: id }, { ...body });
        return res.status(200).json({
          statut: true,
          message: { ...updateComment },
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
        const deleteComment = await Comment.deleteOne({ _id: id });
        return res
          .status(204)
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
      const auth: IUser = req.auth as IUser;
      const id: string = req.params.id;
      const exist = await Comment.findById(id);

      if (exist && exist.auteur == auth._id) {
        return res.status(204).json({ statut: true, message: { ...exist } });
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
  static async getAllComment(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const exist = await Comment.find({ auteur: auth._id });

      if (auth) {
        return res.status(200).json({ statut: true, message: { ...exist } });
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
}

export default CommentControllers;
