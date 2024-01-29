import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

export class ValidacaoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!value){
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
    }

    const paramsIds = [
      "id",
      "jogadorId"
    ]

    if(paramsIds.includes(metadata.data) && !isValidObjectId(value)){
      throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser um id valido`)
    }


    return value
  }
}