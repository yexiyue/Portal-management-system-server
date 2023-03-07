import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { WebService } from './web.service';
import { IsPublic } from 'src/auth/auth.decorator';


@Controller('/webapi')
export class WebController {
  constructor(private readonly webService: WebService) {}

  @IsPublic()
  @Get('/news')
  findAll() {
    return this.webService.findAll();
  }

  @IsPublic()
  @Get('/news/last')
  findFourNews(@Query('take',ParseIntPipe) take:number) {
    return this.webService.findAll(take);
  }

  @IsPublic()
  @Get('/news/:id')
  findOne(@Param('id') id: string) {
    return this.webService.findOne(+id);
  }

  @IsPublic()
  @Get('/product')
  getProducts(){
    return this.webService.findAllProduct()
  }
}
