import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { PostEntity } from './entites';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    private configService: ConfigService,
  ) {}

  async getMany() {
    console.log(this.configService.get('JWT_SECRET'));

    return await this.postRepo.find();
  }

  async getOne(id: string) {
    const post = await this.postRepo.findOne(id);

    if (!post) throw new NotFoundException("Post does't exist");

    return post;
  }

  async createOne(createDto: CreatePostDto) {
    const post = this.postRepo.create(createDto as any);
    return await this.postRepo.save(post);
  }

  async updateOne(id: string, updateDto: UpdatePostDto) {
    const post = await this.postRepo.findOne(id);

    if (!post) throw new NotFoundException("Post does't exist");

    const updatePost = Object.assign(post, updateDto);
    return await this.postRepo.save(updatePost);
  }

  async deleteOne(id: string) {
    const post = await this.postRepo.findOne(id);

    if (!post) throw new NotFoundException("Post does't exist");

    return await this.postRepo.delete(id);
  }
}
