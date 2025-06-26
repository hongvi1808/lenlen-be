
import {Prisma} from '@prisma/client'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreatePaymentDto {
  id: string;
@ApiProperty({
  type: `number`,
  format: `double`,
})
amount: Prisma.Decimal;
transactionId?: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
paidAt?: bigint;
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
