import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from 'src/players/services/players.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly playersService: PlayersService,
    private readonly jwtService: JwtService,
    private playerService: PlayersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return await this.playersService.validateUser(username, password);
  }

  async generateJwt(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUserByPayload(payload: any): Promise<object> {
    // This method is used by the JwtStrategy to validate the user based on the JWT payload
    return await this.playersService.findOne(payload.sub);
  }
}
