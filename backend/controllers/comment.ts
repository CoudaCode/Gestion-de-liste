import { Request, Response } from "express";
import { AuthRequest } from "../interface/authRequest";
import { Livre } from "../models/livre";
import { Comment } from "./../models/comment";
import { IUser } from "./../models/users";
class CommentControllers {
  static async createComment(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const { content, ...body } = req.body;
      const livreID: string = req.params.id;

      const exist = await Livre.findById(livreID);
      if (!exist)
        return res.status(404).json({
          statut: false,
          message: "Livre introuvable",
        });

      const existComment = await Comment.findOne({ content });

      if (existComment)
        return res.status(400).json({
          statut: false,
          message: "Ce commentaire existe déjà",
        });
      const newComment = await Comment.create({
        auteur: auth._id,
        livreID,
        content,
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
      const { commentId, id } = req.params;
      const exist = await Comment.findById(commentId);
      const existLivre = await Livre.findById(id);
      if (!existLivre)
        return res.status(404).json({
          statut: false,
          message: "Livre introuvable",
        });
      if (!exist)
        return res.status(404).json({
          statut: false,
          message: "Commentaire introuvable",
        });

      if (exist.auteur != auth._id)
        return res.status(400).json({
          statut: false,
          message: "Vous n'êtes pas autorisé à modifié ce commentaire",
        });

      const update = await Comment.findByIdAndUpdate(
        commentId,
        { content, ...body },
        { new: true }
      );

      if (!update)
        return res.status(400).json({
          statut: false,
          message: "Erreur lors de la modification du commentaire",
        });

      return res
        .status(200)
        .json({ statut: true, message: "bien modifié !!!" });
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
      const { commentId, id } = req.params;
      const exist = await Comment.findById(commentId);
      const existLivre = await Livre.findById(id);

      if (!existLivre)
        return res.status(404).json({
          statut: false,
          message: "Livre introuvable",
        });

      if (!exist)
        return res.status(404).json({
          statut: false,
          message: "Commentaire introuvable",
        });

      if (exist.auteur != auth._id)
        return res.status(400).json({
          statut: false,
          message: "Vous n'êtes pas autorisé à supprimé ce commentaire",
        });

      const livres = await Livre.find({ comment: commentId });

      for (const livre of livres) {
        livre.comment = livre.comment.filter((c) => c.toString() !== commentId);
        await livre.save();
      }
      await Comment.deleteOne({ _id: commentId });
      return res
        .status(200)
        .json({ statut: true, message: "Suppression avec succès" });
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
      const { commentId, id } = req.params;

      const existLivre = await Livre.findById(id);

      if (!existLivre)
        return res.status(404).json({
          statut: false,
          message: "Livre introuvable",
        });

      const exist = await Comment.findById(commentId).populate(
        "auteur",
        "fullname username"
      );

      if (!exist) {
        return res.status(404).json({
          statut: false,
          message: "Commentaire introuvable",
        });
      }

      return res
        .status(200)
        .json({ statut: true, message: { ...exist.toObject() } });
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
        return res.status(200).json({ statut: true, message: { ...exist } });
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
  static async getCommentsForLivre(req: AuthRequest, res: Response) {
    try {
      const auth: IUser = req.auth as IUser;
      const livreId: string = req.params.id;

      // Vérifier si le livre existe
      const exist = await Livre.findById(livreId);

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "Livre introuvable",
        });
      }

      // Vérifier si l'utilisateur connecté est l'auteur du livre
      if (exist.auteur.toString() !== auth._id) {
        return res.status(403).json({
          status: false,
          message:
            "Vous n'êtes pas autorisé à voir les commentaires de ce livre",
        });
      }

      // Récupérer les commentaires pour le livre spécifié
      const comments = await Comment.find({ livreID: livreId }).populate(
        "auteur",
        "fullname username"
      );

      res.status(200).json({
        status: true,
        message: comments,
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res
          .status(500)
          .json({ statut: false, message: "Une erreur s'est produite" });
      }
    }
  }
}

export default CommentControllers;
