// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { AuthController } from './controller/auth.controller';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [
    PlayersModule, // Importez PlayersModule pour utiliser PlayersService.
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
