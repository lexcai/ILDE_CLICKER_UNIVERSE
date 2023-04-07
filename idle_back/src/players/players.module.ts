import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { Player } from 'src/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService, TypeOrmModule],
})
export class PlayersModule {}
