import { UnauthorizedException, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
}
