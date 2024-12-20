import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Không yêu cầu role
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Kiểm tra và lấy token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1]; // Lấy giá trị token

    // Kiểm tra role
    return requiredRoles.includes(token);
  }
}
