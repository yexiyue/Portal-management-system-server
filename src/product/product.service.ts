import { PrismaServer } from 'src/prisma/prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma:PrismaServer){}
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data:createProductDto
      })
    } catch (error) {
      throw new HttpException('添加产品失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany({
        orderBy:{
          updateTime:'desc'
        }
      })
    } catch (error) {
      throw new HttpException('查找产品失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.product.findUnique({
        where:{
          id
        }
      })
    } catch (error) {
      throw new HttpException('查找产品失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where:{
          id
        },
        data:updateProductDto
      })
    } catch (error) {
      throw new HttpException('更新产品失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where:{
          id
        }
      })
    } catch (error) {
      throw new HttpException('删除产品失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
