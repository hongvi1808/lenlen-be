
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateProductCategoryDto {
  id: string;
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
