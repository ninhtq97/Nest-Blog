import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['slug'] as const),
) {}

export { UpdatePostDto };
