import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
  
  // 값을 읽을 수는 있지만 변경할 수는 없게 만드는 readonly옵션
  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]
  
  //value = 파라미터로 넣어준 값  
    transform(value: any) {

      value = value.toUpperCase();

      if(!this.isStatusValid(value)) {
        throw new BadRequestException(`${value} isn't in the status options`)
      }

      return value;
    }

    private isStatusValid(status: any) {
      const index = this.StatusOptions.indexOf(status);
      return index !== -1
    }
}