import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getWalletFromKey } from '../utils/web3.utils';

@Injectable()
export class JwtKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return false;
    }

    const [bearer, privateKey] = authorizationHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !privateKey) {
      return false;
    }

    request.wallet = getWalletFromKey(privateKey);

    return true;
  }
}
