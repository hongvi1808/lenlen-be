
import {ApiProperty} from '@nestjs/swagger'


export class OrderItemDto {
  id: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number ;
name: string ;
@ApiProperty({
  type: `number`,
  format: `float`,
})
price: number ;
active: boolean ;
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
