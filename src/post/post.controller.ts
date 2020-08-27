import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getMany() {
    const data = this.postService.getMany();

    return {
      msg: 'Get many success !!!',
      data,
    };
  }

  @Get(':id')
  getOne(@Param('id') id) {
    return this.postService.getOne(id);
  }

  @Post()
  createOne(@Body() createDto: CreatePostDto) {
    return this.postService.createOne(createDto);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updateDto: UpdatePostDto) {
    return this.postService.updateOne(id, updateDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.postService.deleteOne(id);
  }
}
