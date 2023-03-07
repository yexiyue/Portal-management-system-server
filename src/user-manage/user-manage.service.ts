import { PrismaServer } from './../prisma/prisma';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserManageDto } from './dto/create-user-manage.dto';
import { UpdateUserManageDto } from './dto/update-user-manage.dto';

@Injectable()
export class UserManageService {
  constructor(private prisma:PrismaServer){}
  async create(createUserManageDto: CreateUserManageDto) {
    try {
      return await this.prisma.user.create({
        data:createUserManageDto,
        select:{
          username:true,
          role:true,
          gender:true,
          avatar:true,
          id:true,
          introduction:true
        }
      })
    } catch (error) {
      throw new HttpException('添加用户失败，该用户已经注册',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select:{
          username:true,
          role:true,
          gender:true,
          avatar:true,
          id:true,
          introduction:true
        }
      })
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where:{
          id
        },
      })
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateUserManageDto: UpdateUserManageDto) {
    try {
      return await this.prisma.user.update({
        where:{
          id
        },
        data:{
          username:updateUserManageDto.username,
          gender:updateUserManageDto.gender,
          introduction:updateUserManageDto.introduction,
          avatar:updateUserManageDto.avatar,
          role:updateUserManageDto.role,
          password:updateUserManageDto.password
        },
        select:{
          username:true,
          role:true,
          gender:true,
          avatar:true,
          id:true,
          introduction:true
        }
      })
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where:{
          id
        }
      })
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByUsername(username:string){
    try {
      return await this.prisma.user.findUnique({
        where:{
          username
        }
      })
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
