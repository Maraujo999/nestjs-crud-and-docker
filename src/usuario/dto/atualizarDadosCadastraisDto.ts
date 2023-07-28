import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validation/email-unique.validator';

export class AtualizarDadosCadastraisDto {
  @IsNotEmpty({ message: 'O nome do usuário não pode ser vazio.' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O Email não pode ser vazio.' })
  @EmailEhUnico({ message: 'Email deve ser único' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres.' })
  @IsOptional()
  senha: string;
}
