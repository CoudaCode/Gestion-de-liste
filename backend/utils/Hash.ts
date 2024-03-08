import { compare, genSalt, hash } from "bcrypt";

export const compareMdpHash = async (
  from: string,
  to: string
): Promise<boolean> => {
  try {
    return await compare(from, to);
  } catch (e) {
    return false;
  }
};

export const hasHMdp = async (mdp: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(mdp, salt);
};
