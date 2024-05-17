import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductDto {
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name não pode ser vazio' })
  name: string;

  @IsNotEmpty({ message: 'O campo price não pode ser vazio' })
  @IsNumber({}, { message: 'O campo price deve ser um número' })
  price: number;

  @IsString({ message: 'O campo description deve ser uma string' })
  @IsNotEmpty({ message: 'O campo description não pode ser vazio' })
  description: string;

  @IsNumber({}, { message: 'O campo stock deve ser um número' })
  @IsNotEmpty({ message: 'O campo stock não pode ser vazio' })
  stock: number;

  @IsString({ message: 'O campo imageUrl deve ser uma string' })
  @IsNotEmpty({ message: 'O campo imageUrl não pode ser vazio' })
  imageUrl: string;
}
