import { Test, TestingModule } from '@nestjs/testing';
import { SpotService } from './spots.service';

describe('SpotService', () => {
  let service: SpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotService],
    }).compile();

    service = module.get<SpotService>(SpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
