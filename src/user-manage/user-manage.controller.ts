import { JwtService } from '@nestjs/jwt';
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, Req, Res, Session, HttpException, HttpStatus, Header } from '@nestjs/common';
import { UserManageService } from './user-manage.service';
import { CreateUserManageDto } from './dto/create-user-manage.dto';
import { UpdateUserManageDto } from './dto/update-user-manage.dto';
import { IsPublic } from 'src/auth/auth.decorator';
import * as svgCapture from 'svg-captcha'
import {  Response } from 'express';



@Controller('/adminapi/user')
export class UserManageController {
  constructor(private readonly userManageService: UserManageService,private jwt:JwtService) {}

  @Post()
  create(@Body() createUserManageDto: CreateUserManageDto) {
    return this.userManageService.create(createUserManageDto);
  }

  @Get()
  findAll() {
    return this.userManageService.findAll();
  }

  @IsPublic()
  @Get('/code')
  getCode(@Req() req,@Res() res:Response){
    const capture=svgCapture.create({
      size:4,
      fontSize:50,
      width:100,
      height:34,
      background:'#33d2dd'
    })

    req.session.code=capture.text
    res.type('image/svg+xml')
    res.send(capture.data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userManageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserManageDto: UpdateUserManageDto) {
    return this.userManageService.update(+id, updateUserManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManageService.remove(+id);
  }


  //当使用res时需要自己手动返回响应
  @IsPublic()
  @Post('/login')
  async login(@Res() res:Response,@Body('username') username:string,@Body('password') password:string,@Body('code') code:string,@Session() session){
    
    if((session?.code?.toLocaleLowerCase()!==code?.toLocaleLowerCase()) || code==undefined){
      throw new HttpException('验证码错误，请重试',HttpStatus.BAD_REQUEST)
    }

    const user=await this.userManageService.findByUsername(username)
    if(password===user.password){
      user.password=undefined
      //生成token
      const token=this.jwt.sign({username,id:user.id},{
        secret:'123456',
        //设置过期时间
        expiresIn:'80h'
      })
      //token设置成响应头
      res.setHeader('Authorization',token)
      //手动响应
      res.status(201).send({
        data:user,
        success:true,
        message:'ok',
        status:201
      })
    }else{
      throw new ForbiddenException('账号密码错误，禁止访问')
    }
  }

  
}
