import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategyService } from '../../../src/users/jwt-strategy/jwt-strategy.service';

describe('JwtStrategyService', () => {
  let service: JwtStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategyService],
    }).compile();

    service = module.get<JwtStrategyService>(JwtStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
