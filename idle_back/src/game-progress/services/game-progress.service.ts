import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameProgress } from '../../entities/game-progress.entity';
import { Player } from 'src/entities/player.entity';
import { PlayersService } from 'src/players/services/players.service';

@Injectable()
export class GameProgressService {
  constructor(
    @InjectRepository(GameProgress)
    private gameProgressRepository: Repository<GameProgress>,
    private playersService: PlayersService,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async post1stProgress(playerId: string): Promise<GameProgress> {
    const player = await this.playersRepository.findOne({
      where: { id: parseInt(playerId, 10) },
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    const newProgress = new GameProgress();
    newProgress.player = player;
    newProgress.level = 1;
    newProgress.experience = 100;
    newProgress.gold = 500;
    newProgress.last_update = new Date();

    const createdProgress = await this.gameProgressRepository.save(newProgress);
    console.log(`NEW PROGRESS FOR User ${playerId} was created with success`);
    return createdProgress;
  }

  async getProgress(playerId: string): Promise<GameProgress> {
    const progress = await this.gameProgressRepository.findOne({
      where: { player: { id: parseInt(playerId, 10) } },
    });

    if (!progress) {
      throw new NotFoundException(
        `Game progress for Player with ID ${playerId} not found`,
      );
    }
    console.log(
      `GET PROGRESS FOR User ${playerId} was ==> ${JSON.stringify(progress)}`,
    );

    return progress;
  }

  async updateProgress(
    playerId: string,
    updatedProgress: Partial<GameProgress>,
  ): Promise<GameProgress> {
    const progress = await this.gameProgressRepository.findOne({
      where: { player: { id: parseInt(playerId, 10) } },
    });

    if (!progress) {
      throw new NotFoundException(
        `Game progress for player with ID ${playerId} not found`,
      );
    }

    Object.assign(progress, updatedProgress);
    console.log(
      `UPDATED PROGRESS FOR User ${playerId} was added ==> ${JSON.stringify(
        updatedProgress,
      )}`,
    );

    return this.gameProgressRepository.save(progress);
  }
  async calculateOfflineProgress(playerId: string): Promise<GameProgress> {
    const playerProgress = await this.gameProgressRepository.findOne({
      where: { player: { id: parseInt(playerId, 10) } },
    });

    if (!playerProgress) {
      throw new NotFoundException(
        `Game progress for player with ID ${playerId} not found`,
      );
    }

    const currentTime = new Date();
    const timeElapsed =
      (currentTime.getTime() - playerProgress.last_update.getTime()) / 1000; // Time elapsed in seconds

    // Calculate offline experience and gold based on the player's upgrades
    const offlineExperience = timeElapsed * 1.02; // Replace experiencePerSecond with the actual value based on the player's upgrades
    const offlineGold = timeElapsed * 1.04; // Replace goldPerSecond with the actual value based on the player's upgrades
    playerProgress.experience = playerProgress.experience + offlineExperience;
    playerProgress.gold = playerProgress.gold + offlineGold;
    console.log(
      `OFFLINE PROGRESS FOR User ${playerId} was added ==> offlineExperience : ${offlineExperience}, offlineGold: ${offlineGold} timeElapsed: ${timeElapsed} from NOW : ${timeElapsed} `,
    );

    return this.gameProgressRepository.save(playerProgress);
  }
}
