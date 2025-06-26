
import {ApiProperty} from '@nestjs/swagger'


export class CategoryDto {
  id: string ;
name: string ;
slug: string ;
active: boolean ;
alive: boolean ;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
createdAt: bigint ;
createdBy: string ;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
updatedAt: bigint ;
updatedBy: string ;
}
