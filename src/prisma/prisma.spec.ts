import { PrismaServer } from './prisma';

describe('Prisma', () => {
  it('should be defined', () => {
    expect(new PrismaServer()).toBeDefined();
  });
});
