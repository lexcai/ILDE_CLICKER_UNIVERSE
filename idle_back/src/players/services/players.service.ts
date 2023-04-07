/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUserName(username);
    if (user && user.password_hash === password) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }
  async findByUserName(username: string): Promise<Player> {
    // Convertir le paramètre id en nombre
    const playerUsername = username;

    // Récupérer un utilisateur spécifique en fonction de l'ID
    const userFound = await this.playersRepository.findOne({
      where: { username: playerUsername },
    });
    if (!userFound) {
      throw new NotFoundException(`Player with username ${username} not found`);
    }
    console.log('User Find by Username in SERVICE : ', username, userFound);
    return userFound;
  }

  async findAll(query: any): Promise<Player[]> {
    // Vous pouvez ajouter des options à la méthode `find` pour filtrer ou trier les résultats
    let findOptions = {};

    if (query.id) {
      findOptions = { where: { id: parseInt(query.id, 10) } };
    } else if (query.username) {
      findOptions = { where: { username: query.username } };
    } else if (query.email) {
      findOptions = { where: { email: query.email } };
    }

    const players = await this.playersRepository.find(findOptions);
    if (!players) {
      throw new NotFoundException(`Players not found`);
    }
    // Retourner la liste des joueurs
    return players;
  }

  async findOne(id: string): Promise<Player> {
    // Convertir le paramètre id en nombre
    const playerId = parseInt(id, 10);

    // Récupérer un utilisateur spécifique en fonction de l'ID
    const userFound = await this.playersRepository.findOne({
      where: { id: playerId },
    });
    if (!userFound) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    console.log('User Find by ID in SERVICE : ', id, userFound);
    return userFound;
  }

  async create(userData: Partial<Player>): Promise<Player> {
    console.log('userData in service:', userData);

    // Crée une instance de Player avec les données fournies
    const newPlayer = this.playersRepository.create(userData);

    // Enregistre l'instance de Player dans la base de données
    const savedPlayer = await this.playersRepository.save(newPlayer);

    // Retourne l'utilisateur créé
    return savedPlayer;
  }

  async update(id: string, updatedUserData: Partial<Player>): Promise<Player> {
    // Convertir le paramètre id en nombre
    const playerId = parseInt(id, 10);

    // Récupérer un utilisateur spécifique en fonction de l'ID
    const playerToUpdate = await this.playersRepository.findOne({
      where: { id: playerId },
    });

    // Check si l'User existe
    if (!playerToUpdate) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    } else {
      console.log('User Found by ID in SERVICE "UPDATE":', id, playerToUpdate);
    }

    // Mettre à jour les données de l'utilisateur
    Object.assign(playerToUpdate, updatedUserData);

    // Enregistrer les modifications dans la base de données
    const updatedPlayer = await this.playersRepository.save(playerToUpdate);

    // Retourner l'utilisateur modifié
    return updatedPlayer;
  }

  async remove(id: string): Promise<Player> {
    // Supprimer un utilisateur spécifique en fonction de l'ID

    // Convertir le paramètre id en nombre
    const playerId = parseInt(id, 10);

    // Récupérer un utilisateur spécifique en fonction de l'ID
    const playerToRemove = await this.playersRepository.findOne({
      where: { id: playerId },
    });

    if (!playerToRemove) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    } else {
      console.log(
        'User Found by ID in SERVICE "DELETE" : ',
        id,
        playerToRemove,
      );
    }
    // DELETE un utilisateur spécifique en fonction de l'ID
    return await this.playersRepository.remove(playerToRemove);
  }
}
