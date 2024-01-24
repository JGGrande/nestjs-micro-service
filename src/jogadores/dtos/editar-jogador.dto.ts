import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsUrl, MaxLength } from "class-validator";

export class EditarJogadorDTO {
  id: string;

  @IsOptional()
  @IsPhoneNumber("BR")
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  ranking?: string | null;

  @IsOptional()
  @IsNumber()
  posicaoRanking?: number | null;

  @IsOptional()
  @IsUrl()
  urlFotoJogador?: string | null;
}