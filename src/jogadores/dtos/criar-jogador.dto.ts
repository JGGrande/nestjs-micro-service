import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from "class-validator";

export class CriarJogadorDTO {

  @IsNotEmpty()
  @IsPhoneNumber("BR")
  readonly telefone: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(255)
  readonly nome: string;

}