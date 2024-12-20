import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(`Incoming Request: ${request.method} ${request.url}`);

    const now = Date.now();

    return next.handle().pipe(
      tap(() =>
        console.log(
          `Outgoing Response: ${request.method} ${request.url} - ${Date.now() - now}ms`,
        ),
      ),
      map((data) => {
        // Thêm field vào response nếu cần
        return {
          ...data,
          customField: 'Handled by Global Interceptor',
        };
      }),
    );
  }
}
