import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.header('authorization');
    console.log(authHeader);
    if (!authHeader) {
      console.error('Nenhum token encontrado');
      return false;
    }

    if (authHeader !== process.env.JWT_SECRET) {
      console.error('JWT SECRET INCORRETO');
      return false;
    }

    const token = authHeader.split(' ').pop();

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      console.error('Falha na verificação do token', error.message);
      return false;
    }
  }
}
