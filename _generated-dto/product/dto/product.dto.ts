
import {ApiProperty} from '@nestjs/swagger'


export class ProductDto {
  id: string ;
name: string ;
slug: string ;
description: string  | null;
@ApiProperty({
  type: `number`,
  format: `float`,
})
price: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
stock: number ;
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
