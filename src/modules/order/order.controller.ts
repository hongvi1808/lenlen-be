import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SessionUser } from 'src/configs/decorators/session-user.decorator';
import { SessionUserModel } from 'src/common/models/session-user.model';
import { FilterParams } from 'src/common/models/filter-params.model';
import { OrderStatus } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@SessionUser() user: SessionUserModel, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user, createOrderDto);
  }

  @Get()
  findAll(@Query() filter: FilterParams) {
    return this.orderService.findList(filter);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
  @Get('/orderItems/:orderId')
  findOrderItemsByOrder(@Param('orderId') orderId: string) {
    return this.orderService.findOrderItemsByOrder(orderId);
  }

  @Put('/cancel/:id')
  cancel(@Param('id') id: string, @SessionUser() user: SessionUserModel) {
    return this.orderService.updateStatus(id, user, OrderStatus.Cancelled);
  }
}
