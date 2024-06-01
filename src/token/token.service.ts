import { BadRequestException, Injectable } from '@nestjs/common';
import { BigNumber, Wallet } from 'ethers';
import { BalanceResponseDto, SendTokenResponseDto } from './dto/token.dto';
import erc20Abi from '../core/abi/erc-20.abi';
import { Web3Service } from '../shared/web3/web3.service';

@Injectable()
export class TokenService {
  constructor(private web3Service: Web3Service) {}

  async sendToken(
    wallet: Wallet,
    userAddress: string,
    tokenAddress: string,
    recipientAddress: string,
    amount: number,
  ): Promise<SendTokenResponseDto> {
    if (wallet.address !== userAddress) {
      throw new BadRequestException('Invalid from address');
    }

    const walletWithProvider = this.web3Service.getConnectedWallet(wallet);

    const token = this.web3Service.getContract(
      tokenAddress,
      erc20Abi,
      walletWithProvider,
    );

    const decimals = await token.decimals();
    const parsedAmount = BigNumber.from(amount).mul(
      BigNumber.from(10).pow(decimals),
    );

    const { hash } = await token.transfer(
      recipientAddress,
      parsedAmount.toString(),
    );

    return { hash };
  }

  async getBalance(
    tokenAddress: string,
    userAddress: string,
  ): Promise<BalanceResponseDto> {
    const token = this.web3Service.getContract(tokenAddress, erc20Abi);
    const decimals = await token.decimals();
    const balance = await token.balanceOf(userAddress);

    return {
      balance: BigNumber.from(balance)
        .div(BigNumber.from(10).pow(decimals))
        .toString(),
    };
  }
}
