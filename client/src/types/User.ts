export type registerUs = {
  email: string;
  password: string;
};
export type loginUs = {
  email: string;
  password: string;
};
export type User = {
  username: string;
  email: string;
  password: string;
  role: string;
};
export type loginResponse = {
  accessToken: string;
  user: {
    _id: string;
    email: string;
    role: string;
    username: string;
  };
};
