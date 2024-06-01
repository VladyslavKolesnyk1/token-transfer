import { IsEthereumAddress, IsNumber } from 'class-validator';

export class GetBalanceDto {
  @IsEthereumAddress()
  tokenAddress: string;

  @IsEthereumAddress()
  userAddress: string;
}

export class BalanceResponseDto {
  balance: string;
}

export class SendTokenDto {
  @IsEthereumAddress()
  tokenAddress: string;

  @IsEthereumAddress()
  userAddress: string;

  @IsEthereumAddress()
  recipientAddress: string;

  @IsNumber()
  amount: number;
}

export class SendTokenResponseDto {
  hash: string;
}
