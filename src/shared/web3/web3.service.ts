import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, providers, Wallet } from 'ethers';

@Injectable()
export class Web3Service {
  private readonly provider: providers.JsonRpcProvider;

  constructor(private configService: ConfigService) {
    this.provider = new providers.JsonRpcProvider(
      this.configService.get<string>('JSON_RPC'),
    );
  }

  getConnectedWallet(wallet: Wallet): Wallet {
    return wallet.connect(this.provider);
  }

  getContract(address: string, abi: any, wallet?: Wallet): Contract {
    return new Contract(address, abi, wallet || this.provider);
  }
}
