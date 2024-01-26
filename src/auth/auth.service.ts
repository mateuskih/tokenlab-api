import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

export class AuthResponseDto {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(username: string, senha: string): Promise<AuthResponseDto> {
    const user = await this.userService.findUserByUsernameAndPassword(
      username,
      senha,
    );

    const payload = { id: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { access_token: accessToken };
  }
}
