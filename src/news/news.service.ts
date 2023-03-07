import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaServer } from 'src/prisma/prisma';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaServer) {}
  async create(createNewsDto: CreateNewsDto) {
    try {
      return await this.prisma.news.create({
        data: createNewsDto,
      });
    } catch (error) {
      throw new HttpException('添加新闻失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId?: number) {
    try {
      /* 如果是编辑返回自己写的 */
      if (userId) {
        const role = (await this.prisma.user.findUnique({
          where:{id:userId}
        })).role
        
        if (role !== 1) {
          return await this.prisma.news.findMany({
            where: {
              userId,
            },
            include: {
              User: {
                select: {
                  username: true,
                },
              },
            },
            orderBy:{
              updateTime:'desc'
            }
          });
        }
      }

      return await this.prisma.news.findMany({
        include: {
          User: {
            select: {
              username: true,
            },
          },
        },
        orderBy:{
          updateTime:'desc'
        }
      });
    } catch (error) {
      console.log(error)
      throw new HttpException('获取新闻失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.news.findUnique({
        where: {
          id,
        },
        include: {
          User: {
            select: {
              username: true,
              role: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException('获取新闻失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    try {
      return await this.prisma.news.update({
        where: {
          id,
        },
        data: updateNewsDto,
        include: {
          User: {
            select: {
              username: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('更新新闻失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.news.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('删除新闻失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
