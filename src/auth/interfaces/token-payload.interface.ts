export enum IRoles {
  admin = 'admin',
  user = 'user',
}

export interface ITokenPayload {
  id: number | null;
  email: string;
  role: IRoles;
}
