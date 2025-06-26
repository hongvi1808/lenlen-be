
import {ApiProperty} from '@nestjs/swagger'




export class UpdateProductDto {
  name?: string;
slug?: string;
description?: string;
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
