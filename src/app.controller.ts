import { Controller, Get, Post, Redirect, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { IsPublic } from './auth/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  @Redirect('/index.html')
  getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('/admin')
  @Redirect('/admin/index.html')
  getAdmin(): string {
    return this.appService.getHello();
  }

  //公共上传图片模块
  @Post('/adminapi/upload')
  @UseInterceptors(FileInterceptor('file'))//这里是上传文件的字段名
  uploadImgFile(@UploadedFile() file){
    return file.filename
  }
}
