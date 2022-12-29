import { ErrorEnum } from '../../enum/error-enum';

export class Error {
  public isError = false;
  public type = ErrorEnum.DEFAULT_TYPE;
  public message = ErrorEnum.DEFAULT_MESSAGE;

  public show(params: object = {}) {
    this.isError = true;
    this.type = params.type ?? this.type;
    this.message = params.message ?? this.message;
  }

  public hide() {
    this.isError = false;
  }

  public reset() {
    this.isError = false;
    this.type = ErrorEnum.DEFAULT_TYPE;
    this.message = ErrorEnum.DEFAULT_MESSAGE;
  }
}
