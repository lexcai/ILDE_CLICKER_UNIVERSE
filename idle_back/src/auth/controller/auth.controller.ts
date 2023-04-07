import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { Player } from '../../entities/player.entity';
import { PlayersService } from '../../players/services/players.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly playersService: PlayersService,
    private authService: AuthService, // Injecter AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  async login(@Request() req) {
    console.log('userData in controller:', req.user.username);
    console.log('User successfully logged !');
    const jwtResponse = await this.authService.generateJwt(req.user);

    // Renvoyer l'ID de l'utilisateur et le token JWT
    return {
      playerId: req.user.id,
      playerName: req.user.username,
      token: jwtResponse.accessToken,
    };
  }

  @Post('/CreateUser')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: Player })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() userData: Partial<Player>): Promise<Player> {
    console.log('userData in controller:', userData);
    console.log('User successfully created !');
    return await this.playersService.create(userData);
  }
}
