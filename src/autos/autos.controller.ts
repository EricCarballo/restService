import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutosService } from './autos.service';
import { CreateAutoDto } from './dto/create-Auto.dto';
import { UpdateAutoDto } from './dto/update-carro.dto';

@Controller('autos')
export class AutosController {
  constructor(private readonly autoService: AutosService) {}

  @Post()
  create(@Body() createautoDto: CreateAutoDto) {
    return this.autoService.create(createautoDto);
  }

  @Get()
  findAll() {
    return this.autoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autoService.findOne(id);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateautoDto: UpdateAutoDto) {
    return this.autoService.update( term, updateautoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autoService.remove(id);
  }
}
