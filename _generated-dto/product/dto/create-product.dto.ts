
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateProductDto {
  id: string;
name: string;
slug: string;
description?: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
createdAt: bigint;
createdBy: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
updatedAt: bigint;
updatedBy: string;
}
