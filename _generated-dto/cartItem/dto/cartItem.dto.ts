
import {ApiProperty} from '@nestjs/swagger'


export class CartItemDto {
  id: string ;
customerId: string  | null;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number ;
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
