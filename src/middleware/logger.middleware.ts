import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

export interface IRequest extends Request {
  user?: string; // or any other type
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: IRequest, res: Response, next: NextFunction) {
    console.log('Request...');
    req.user = { username: 'admin' } as any;
    next();
  }
}
