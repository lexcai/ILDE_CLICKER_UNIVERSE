import { Test, TestingModule } from '@nestjs/testing';
import { GameProgressController } from './game-progress.controller';

describe('GameProgressController', () => {
  let controller: GameProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameProgressController],
    }).compile();

    controller = module.get<GameProgressController>(GameProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
