import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Wallet } from 'ethers';
import { TokenService } from './token.service';
import { JwtKeyGuard } from '../core/guards/jwt-key.guard';
import {
  GetBalanceDto,
  SendTokenDto,
  SendTokenResponseDto,
} from './dto/token.dto';
import { UserWallet } from '../core/decorators/wallet.decorator';

@Controller('tokens')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get('balance/:tokenAddress/:userAddress')
  async getBalance(@Param() { tokenAddress, userAddress }: GetBalanceDto) {
    return this.tokenService.getBalance(tokenAddress, userAddress);
  }

  @UseGuards(JwtKeyGuard)
  @Post('transfer')
  async sendToken(
    @Body()
    { tokenAddress, userAddress, recipientAddress, amount }: SendTokenDto,
    @UserWallet() wallet: Wallet,
  ): Promise<SendTokenResponseDto> {
    return this.tokenService.sendToken(
      wallet,
      userAddress,
      tokenAddress,
      recipientAddress,
      amount,
    );
  }
}
