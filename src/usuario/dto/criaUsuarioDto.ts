import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmailEhUnico } from '../validation/email-unique.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome não pode ser vazio. ' })
  nome: string;

  @ApiProperty()
  @IsEmail(undefined, { message: 'O Email não pode ser vazio.' })
  @EmailEhUnico({ message: 'Email deve ser único' })
  email: string;

  @ApiProperty()
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracters.' })
  @MaxLength(20, {
    message: ' A senha precisa ter pelo no máximo 20 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  @ApiProperty()
  @IsString()
  password: string;
}
