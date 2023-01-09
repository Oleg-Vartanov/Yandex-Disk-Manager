import { YandexDiskUserResponseInterface } from '../../interfaces/api-responses';

export class YandexDiskUser {
  public uid = '';
  public displayName = '';
  public userName = '';
  public language = '';

  public setPropsFromResponse(user: YandexDiskUserResponseInterface) {
    this.uid = user.uid;
    this.displayName = user.display_name;
    this.userName = user.login;
    this.language = user.country;
  }
}
