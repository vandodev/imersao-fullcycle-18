import { Test, TestingModule } from '@nestjs/testing';
import { SpotsController } from './spots.controller';
import { SpotService } from './spots.service';

describe('SpotController', () => {
  let controller: SpotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotsController],
      providers: [SpotService],
    }).compile();

    controller = module.get<SpotsController>(SpotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
