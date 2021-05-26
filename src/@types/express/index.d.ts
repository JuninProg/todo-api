import { ITokenPayload } from '../../auth/interfaces/token-payload.interface';

declare global {
  namespace Express {
    interface Request {
      user: ITokenPayload;
    }
  }
}
