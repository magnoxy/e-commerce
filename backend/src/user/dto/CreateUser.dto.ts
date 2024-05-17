import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo username não pode ser vazio' })
  username: string;

  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O campo email não pode ser vazio' })
  @IsEmail({}, { message: 'O campo email deve ser um email válido' })
  email: string;

  @IsNotEmpty({ message: 'O campo matricula não pode ser vazio' })
  @IsString()
  matricula: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha não pode ser vazio' })
  password: string;
}
