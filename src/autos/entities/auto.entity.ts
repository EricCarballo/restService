import { Prop, SchemaFactory } from '@nestjs/mongoose';
import{ Document } from 'mongoose'
import{ Schema } from '@nestjs/mongoose'

@Schema()
export class Auto extends Document {

    @Prop({ 
        unique: true, 
        index: true 
    })
    marca: string;

    @Prop({ 
        unique: true, 
        index: true 
    })
    modelo: string;

    @Prop({ 
        unique: true, 
        index: true 
    })
    tipoAuto: string;

    @Prop({ 
        unique: true, 
        index: true 
    })
    anio: number;

}

export const AutoSchema = SchemaFactory.createForClass( Auto );