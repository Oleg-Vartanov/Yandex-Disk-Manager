import { UserResponseInterface } from '../../interfaces/api-responses';

export class User {
  public uid = '';
  public displayName = '';
  public userName = '';
  public language = '';

  public setPropsFromResponse(user: UserResponseInterface) {
    this.uid = user.uid;
    this.displayName = user.display_name;
    this.userName = user.login;
    this.language = user.country;
  }
}
