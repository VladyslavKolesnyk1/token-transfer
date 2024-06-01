import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Web3Module } from '../shared/web3/web3.module';

@Module({
  providers: [TokenService],
  controllers: [TokenController],
  imports: [Web3Module],
})
export class TokenModule {}
