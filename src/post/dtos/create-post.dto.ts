import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';
import { EnumToString } from 'src/helpers/enumToString';
import { PostCategory } from '../enums';

class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  excerpt: string;

  @IsString()
  content: string;

  @IsEnum(PostCategory, {
    message: `Option invalid.The correct options are "${EnumToString(
      PostCategory,
    )}"`,
  })
  category: PostCategory;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  status: boolean;
}

export { CreatePostDto };
