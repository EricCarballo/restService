import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { Auto } from './entities/auto.entity';
import { CreateAutoDto } from './dto/create-Auto.dto';
import { UpdateAutoDto } from './dto/update-carro.dto';

@Injectable()
export class AutosService {

  constructor(
    @InjectModel(Auto.name)
    private readonly carroModel: Model<Auto>
  ) { }

  async create(createCarroDto: CreateAutoDto) {
    createCarroDto.marca = createCarroDto.marca.toLocaleLowerCase();

    try {
      const carro = await this.carroModel.create(createCarroDto);
      return carro

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Carro existente en la db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo crear el carro - checar consola de comandos`);
    }

  }

  async findAll() {
    const carros = await this.carroModel.find();
    return carros;
  }

  async findOne(term: string) {

    let carro: Auto;

    // Si se busca por marca
    if (!carro) {
      carro = await this.carroModel.findOne({ marca: term })
    }

    // Si se busca por modelo
    if (!carro) {
      carro = await this.carroModel.findOne({ modelo: term })
    }

    // Si se busca por tipo de auto
    if (!carro) {
      carro = await this.carroModel.findOne({ tipoAuto: term })
    }

    // Si se busca por tipo de id
    if (!carro && isValidObjectId(term)) {
      carro = await this.carroModel.findById(term);
    }

    if (!carro) throw new NotFoundException('Carro No Encontrado!')

    return carro;

  }

  async update( term: string, updateCarroDto: UpdateAutoDto ) {

    const carro = await this.findOne(term);
    
    if (updateCarroDto.marca) {
      updateCarroDto.marca = updateCarroDto.marca.toLocaleLowerCase();
    }

    try {
      await carro.updateOne(updateCarroDto);
      return { ...carro.toJSON(), ...updateCarroDto };

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Carro existente en la db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo crear el carro - checar consola de comandos`);
    }

  }

  async remove(id: string) {

    const { deletedCount } = await this.carroModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`Carro con el id ${id} no fue encontrado para borrarlo!`)

    return 'Carro borrado correctamente'

  }

}
