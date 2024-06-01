import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from './shared/web3/web3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
    Web3Module,
  ],
})
export class AppModule {}
