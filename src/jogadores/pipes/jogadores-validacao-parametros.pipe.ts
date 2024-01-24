import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

export class JogadoresValidacoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!value){
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
    }

    if(metadata.data === "id" && !isValidObjectId(value)){
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser um id valido`)
    }

    return value
  }
}