import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameProgressController } from './controllers/game-progress.controller';
import { GameProgressService } from './services/game-progress.service';
import { GameProgress } from '../entities/game-progress.entity';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameProgress]), PlayersModule],
  controllers: [GameProgressController],
  providers: [GameProgressService],
  exports: [GameProgressService, TypeOrmModule],
})
export class GameProgressModule {}
