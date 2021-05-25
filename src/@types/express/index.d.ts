import { IUser } from '../../users/interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: Pick<IUser, 'id' | 'email'>;
    }
  }
}
