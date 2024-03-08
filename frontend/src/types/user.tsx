export interface userType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  livre: string[];
}

export interface SignupFormInputs extends userType {
  username: string;
  fullname: string;
  email: string;
  password: string;
  contact: number;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface LoginResponse {
  statut: boolean;
  message: userType | userType[] | string;
  token?: string;
}
