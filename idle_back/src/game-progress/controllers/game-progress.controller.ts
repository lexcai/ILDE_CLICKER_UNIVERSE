import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GameProgressService } from '../services/game-progress.service';
import { GameProgress } from '../../entities/game-progress.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('game-progress')
@Controller('game-progress/gameboard')
@UseGuards(AuthGuard('jwt'))
export class GameProgressController {
  constructor(private readonly gameProgressService: GameProgressService) {}

  @ApiOperation({ summary: 'Poster la première progression du joueur' })
  @ApiResponse({ status: 201, description: 'Progression créée avec succès.' })
  @ApiResponse({
    status: 400,
    description: 'Erreur lors de la création de la progression.',
  })
  @ApiBody({ type: GameProgress })
  @Post(':playerId')
  @UseGuards(AuthGuard('jwt'))
  async post1stPlayerProgress(
    @Param('playerId') playerId: string,
  ): Promise<GameProgress> {
    return this.gameProgressService.post1stProgress(playerId);
  }

  @ApiOperation({ summary: 'Obtenir la progression du joueur' })
  @ApiResponse({
    status: 200,
    description: 'Progression du joueur récupérée avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erreur lors de la récupération de la progression.',
  })
  @Get('/get:playerId')
  @UseGuards(AuthGuard('jwt'))
  async getPlayerProgress(
    @Param('playerId') playerId: string,
  ): Promise<GameProgress> {
    return this.gameProgressService.getProgress(playerId);
  }

  @ApiOperation({ summary: 'Mettre à jour la progression du joueur' })
  @ApiResponse({
    status: 200,
    description: 'Progression du joueur mise à jour avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erreur lors de la mise à jour de la progression.',
  })
  @ApiBody({ type: GameProgress })
  @Put('/update:playerId')
  @UseGuards(AuthGuard('jwt'))
  async updatePlayerProgress(
    @Param('playerId') playerId: string,
    @Body() updatedProgress: Partial<GameProgress>,
  ): Promise<GameProgress> {
    return this.gameProgressService.updateProgress(playerId, updatedProgress);
  }

  @ApiOperation({ summary: 'Calculer la progression hors ligne du joueur' })
  @ApiResponse({
    status: 200,
    description: 'Progression hors ligne calculée avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erreur lors du calcul de la progression hors ligne.',
  })
  @Get(':playerId/offline')
  @UseGuards(AuthGuard('jwt'))
  async offlineProgress(
    @Param('playerId') playerId: string,
  ): Promise<GameProgress> {
    return this.gameProgressService.calculateOfflineProgress(playerId);
  }
}
