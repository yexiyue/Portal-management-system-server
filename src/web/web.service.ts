import { PrismaServer } from 'src/prisma/prisma';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class WebService {
  constructor(private prisma: PrismaServer) {}

  async findAll(take?: number) {
    try {
      return await this.prisma.news.findMany({
        where: {
          isPublish: 1,
        },
        orderBy: {
          updateTime: 'desc',
        },
        take: take,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.news.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllProduct() {
    try {
      return this.prisma.product.findMany()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
