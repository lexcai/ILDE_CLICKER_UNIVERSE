import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Player } from './entities/player.entity';
import { GameProgress } from './entities/game-progress.entity';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { GameProgressModule } from './game-progress/game-progress.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'adminPGS',
      database: 'idle_game_db',
      entities: [Player, GameProgress],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConstants.secret, // Utilisez une clé secrète plus sûre pour la production
      signOptions: { expiresIn: '1d' }, // Durée de validité du JWT
    }),
    AuthModule,
    PlayersModule,
    GameProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
