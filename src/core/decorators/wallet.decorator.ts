import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Wallet } from 'ethers';

export const UserWallet = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Wallet => {
    const request = ctx.switchToHttp().getRequest();
    return request.wallet;
  },
);
