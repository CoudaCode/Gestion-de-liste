import { Response, Request } from "express";
import { User, IUser } from "./../models/users";
import { compareMdpHash, hasHMdp } from "../utils/Hash";
class UserController {
  static async createUser(req: Request, res: Response): Promise<void | object> {
    try {
      const { username, email, password, ...body } = req.body;

      //$or ==> operator OU logique
      // Verifie si un user a deja username ou un email existant dans la bd
      const exist = await User.findOne({ $or: [{ username }, { email }] });

      if (exist)
        return res
          .status(400)
          .json({ statut: false, message: "ce user existe deja" });
      const newUser = await User.create({
        username,
        email,
        password: hasHMdp(password),
        ...body,
      });

      if (!newUser)
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la création" });

      res.status(200).json({ statut: true, message: newUser });
    } catch (e) {
      res.status(500).json({ statut: true, message: e.message });
    }
  }
  static async updateUser(req: Request, res: Response): Promise<void> {}
  static async deleteUser(req: Request, res: Response): Promise<void> {}
  static async getUser(req: Request, res: Response): Promise<void> {}
  static async editUser(req: Request, res: Response): Promise<void> {}
  static async login(req: Request, res: Response): Promise<void> {}
}
