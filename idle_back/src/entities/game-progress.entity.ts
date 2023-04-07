import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Player } from './player.entity';

@Entity('game_progress')
export class GameProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.gameProgress)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  autoClickerLevel: number;

  @Column({ nullable: true })
  offlineClickerLevel: number;

  @Column({ type: 'real', nullable: false })
  gold: number;

  @Column({ type: 'real', nullable: true })
  goldMultiplier: number;

  @Column({ type: 'real', nullable: true })
  experience: number;

  @Column({ type: 'real', nullable: true })
  experienceMultiplier: number;

  @Column({ type: 'real', nullable: true })
  point: number;

  @Column({ type: 'real', nullable: true })
  pointPerClick: number;

  @Column({ type: 'real', nullable: true })
  pointPerSecond: number;

  @Column({ type: 'real', nullable: true })
  pointsMultiplier: number;

  @Column()
  last_update: Date;
}
