import { Request, Response } from "express";
import { AuthRequest } from "../interface/authRequest";
import { compareMdpHash, hasHMdp } from "../utils/Hash";
import { MailOptions, sendEmail } from "../utils/sendMail";
import { generateToken } from "../utils/token";
import { IUser, User } from "./../models/users";
class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, ...body } = req.body;

      //$or ==> operator OU logique
      // Verifie si un user a deja un username ou un email existant dans la bd
      const exist: IUser | null = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (exist)
        return res
          .status(400)
          .json({ statut: false, message: "ce user existe deja" });
      const newUser = await User.create({
        username,
        email,
        password: await hasHMdp(password),
        ...body,
      });

      if (!newUser)
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la création" });

      res.status(200).json({
        statut: true,
        message: { ...newUser.toObject(), password: undefined },
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async updateUser(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const auth: IUser = req.auth as IUser;
      const exist: IUser | null = await User.findById(id);
      const { password, newPassword, ...body } = req.body;

      if (!exist)
        return res
          .status(400)
          .json({ statut: false, message: "ce user n'existe pas" });

      if (auth && auth._id !== id) {
        return res
          .status(400)
          .json({ statut: false, message: "action non autorisé" });
      }

      let updateUser: object;

      if (newPassword) {
        updateUser = await User.updateOne(
          { _id: id },
          { password: await hasHMdp(newPassword), ...body }
        );
      } else {
        updateUser = await User.updateOne({ _id: id }, { ...body });
      }

      if (!updateUser)
        return res
          .status(400)
          .json({ statut: false, message: "error lors de la modification" });

      return res.status(200).json({
        statut: true,
        message: "use modifié !!!",
      });

      return res
        .status(400)
        .json({ statut: false, message: "error lors de la modification" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async deleteUser(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const auth: IUser = req.auth as IUser;
      const user: IUser | null = await User.findById(id);
      if (id !== auth._id)
        return res
          .status(400)
          .json({ statut: false, message: "action non autorisé" });

      if (!user)
        return res
          .status(400)
          .json({ statut: false, message: "Ce user n'existe pas" });

      await User.deleteOne({ _id: id });
      res.status(400).json({ statut: 200, message: "succès" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: IUser | null = await User.findById(id);
      if (!user)
        return res
          .status(400)
          .json({ statut: false, message: "ce user n'existe pas" });

      res.status(200).json({
        statut: true,
        message: { ...user.toObject(), password: undefined },
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const exist: IUser | null = await User.findOne({ email });

      if (exist && (await compareMdpHash(password, exist.password))) {
        res.cookie("token", generateToken(exist.toObject()));
        return res
          .status(200)
          .json({
            statut: true,
            message: { ...exist.toObject() },
            token: generateToken(exist.toObject()),
          });
      }
      res
        .status(400)
        .json({ statut: false, message: "email ou mot de passe incorrect" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async forgetPassword(req: AuthRequest, res: Response) {
    try {
      const { email, boddy } = req.body;
      if (!req.body.email) {
        return res.status(400).json({
          statut: false,
          message: "L'adresse e-mail doit être fournie",
        });
      }
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          statut: false,
          message: "L'utilisateur avec l'adresse e-mail fournie n'existe pas",
        });
      }

      await User.updateOne(
        { _id: user._id },
        { password: await hasHMdp(req.body.password) }
      );
      const myEmail: string = process.env.email || "";
      const resetPasswordEmail: MailOptions = {
        from: myEmail,
        to: user.email,
        subject: "Réinitialisation du mot de passe",
        html: `
          <p>Veuillez vous connecter avec votre nouveau mot de passe lors de votre prochaine visite.</p>
          <a href="/">Accueil</a>
        `,
      };

      await sendEmail(resetPasswordEmail);
      res.status(200).json({
        statut: true,
        message: "Un e-mail de réinitialisation du mot de passe a été envoyé",
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
export default UserController;
