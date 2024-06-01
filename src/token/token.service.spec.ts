import { TokenService } from './token.service';
import { Web3Service } from '../shared/web3/web3.service';
import { Test } from '@nestjs/testing';
import { Contract, Signer, Wallet } from 'ethers';

describe('TokenService', () => {
  let tokenService: TokenService;

  const web3MockService = {
    getConnectedWallet: jest.fn(),
    getContract: (address: string, abi: any, wallet?: Signer) => {
      return {
        balanceOf: jest.fn((address) => '0'),
        decimals: jest.fn().mockReturnValue('18'),
        transfer: jest.fn((address: string, amount: string) => ({
          hash: 'resultHash',
        })),
      } as unknown as Contract;
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: Web3Service,
          useValue: web3MockService,
        },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  describe('get balance', () => {
    it('should return user balance', async () => {
      const result = await tokenService.getBalance('0x123', '0x123');

      expect(result).toEqual({ balance: '0' });
    });
  });

  describe('send token', () => {
    const mockData = {
      wallet: new Wallet(
        '21c6d1f900c2e548f3f8c1ff2e47ce14e80ee8b6bf2182aa3f89f7e0ed22626b',
      ),
      userAddress: '0xC58f5f09427fa2a34Ab6E20b6000111DA78dA02c',
      tokenAddress: '0x123',
      recipientAddress: '0x321',
      amount: 100,
    };

    it('should transfer token', async () => {
      const result = await tokenService.sendToken(
        mockData.wallet,
        mockData.userAddress,
        mockData.tokenAddress,
        mockData.recipientAddress,
        mockData.amount,
      );

      expect(result).toEqual({ hash: 'resultHash' });
    });

    it('should throw error if user address is invalid', async () => {
      const fakeUserAddress = '0x321';

      await expect(
        tokenService.sendToken(
          mockData.wallet,
          fakeUserAddress,
          mockData.tokenAddress,
          mockData.recipientAddress,
          mockData.amount,
        ),
      ).rejects.toThrow('Invalid from address');
    });
  });
});
