
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCategoryDto {
  name?: string;
slug?: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
createdAt?: bigint;
createdBy?: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
updatedAt?: bigint;
updatedBy?: string;
}
