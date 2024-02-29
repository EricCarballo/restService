import { IsInt, IsString, MinLength } from "class-validator";

export class CreateAutoDto {

    @IsString()
    @MinLength(3)
    marca: string;

    @IsString()
    @MinLength(3)
    modelo: string;
    
    @IsString()
    @MinLength(3)
    tipoAuto: string;

    @IsInt()
    anio: string;

}
