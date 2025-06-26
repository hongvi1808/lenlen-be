
import {Prisma,PaymentMethod,PaymentStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class PaymentDto {
  id: string ;
@ApiProperty({
  enum: PaymentMethod,
})
method: PaymentMethod ;
@ApiProperty({
  type: `number`,
  format: `double`,
})
amount: Prisma.Decimal ;
@ApiProperty({
  enum: PaymentStatus,
})
status: PaymentStatus ;
transactionId: string  | null;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
paidAt: bigint  | null;
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
