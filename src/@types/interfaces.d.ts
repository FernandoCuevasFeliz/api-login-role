interface IUser extends TMongoDocument {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  roles?: TMongoId[];
  password?: string;
  confirmAccount?: boolean;
  stateUser?: TUserState;
  image?: string;
  googleId?: string;
  facebookId?: string;
}

interface IUserN {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  roles?: TMongoId[];
  password?: string;
  confirmAccount?: boolean;
  stateUser?: TUserState;
  image?: string;
  googleId?: string;
  facebookId?: string;
}

interface IRole extends TMongoDocument {
  name: string;
  description: string;
}

interface IPayload {
  user: {
    id: string;
  };
}
