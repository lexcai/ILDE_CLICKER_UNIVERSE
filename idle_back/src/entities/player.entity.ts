import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { GameProgress } from './game-progress.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => GameProgress, (gameProgress) => gameProgress.player)
  gameProgress: GameProgress[];
}
