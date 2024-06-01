import { Wallet } from 'ethers';
import { BadRequestException } from '@nestjs/common';

export function getWalletFromKey(privateKey: string) {
  try {
    return new Wallet(privateKey);
  } catch (e) {
    throw new BadRequestException('Invalid private key');
  }
}
