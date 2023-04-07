import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { Player } from '../../entities/player.entity';
import { PlayersService } from '../services/players.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiOperation({ summary: 'Récupérer tous les joueurs' })
  @ApiResponse({ status: 200, description: 'Joueurs récupérés avec succès.' })
  @Get('/Allsearch')
  async findAll(@Query() query: string) {
    const player: Player[] = await this.playersService.findAll(query);
    console.log('Users retrived : ', player.length, 'Résultas', player);
    return await this.playersService.findAll(query);
  }

  @ApiOperation({ summary: "Récupérer un joueur par son nom d'utilisateur" })
  @ApiResponse({ status: 200, description: 'Joueur récupéré avec succès.' })
  @Get('/USERNAMEsearch:username')
  async findByUserName(@Param('username') username: string): Promise<Player> {
    const player: Player = await this.playersService.findByUserName(username);
    console.log(
      'User Found by ID in CONTROLLER "findONe" was successfully finded',
      username,
      player.username,
      player.email,
      player.password_hash,
    );
    return player;
  }

  @ApiOperation({ summary: 'Récupérer un joueur par son ID' })
  @ApiResponse({ status: 200, description: 'Joueur récupéré avec succès.' })
  @Get('/IDsearch:id')
  async findOne(@Param('id') id: string): Promise<string> {
    const player: Player = await this.playersService.findOne(id);
    console.log(
      'User Found by ID in CONTROLLER "findONe" was successfully finded',
      id,
      player.username,
    );
    return player.username;
  }

  @ApiOperation({ summary: 'Créer un nouveau joueur' })
  @ApiResponse({ status: 201, description: 'Joueur créé avec succès.' })
  @ApiBody({ type: Player })
  @Post('/CreateUser')
  async create(@Body() userData: Partial<Player>): Promise<Player> {
    console.log('userData in controller:', userData);
    console.log('User successfully created !');
    return await this.playersService.create(userData);
  }

  @ApiOperation({ summary: 'Mettre à jour un joueur' })
  @ApiResponse({ status: 200, description: 'Joueur mis à jour avec succès.' })
  @ApiBody({ type: Player })
  @Put('/USERupdate:id')
  async update(@Param('id') id: string, @Body() updatedUserData: object) {
    const player: Player = await this.playersService.findOne(id);
    console.log(
      'User Find by ID in CONTROLEUR UPDATE was updated successfully',
      id,
      player.username,
    );
    return await this.playersService.update(id, updatedUserData);
  }

  @ApiOperation({ summary: 'Supprimer un joueur' })
  @ApiResponse({ status: 200, description: 'Joueur supprimé avec succès.' })
  @Delete('/USERdelete:id')
  async remove(@Param('id') id: string) {
    const player: Player = await this.playersService.findOne(id);
    console.log(id, player.username);

    return await this.playersService.remove(id);
  }
}
