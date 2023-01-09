import { YandexIDUserResponseInterface } from '../../interfaces/api-responses';

export class YandexIDUser {
  public birthday = '';
  public clientId = '';
  public defaultAvatarId = '';
  public defaultEmail = '';
  public defaultPhone = {};
  public displayName = '';
  public emails: string[] = [];
  public firstName = '';
  public id = '';
  public isAvatarEmpty = true;
  public lastName = '';
  public login = '';
  public psuid = '';
  public realName = '';
  public sex = null;

  public setPropsFromResponse(user: YandexIDUserResponseInterface) {
    this.birthday = user.birthday ?? this.birthday;
    this.clientId = user.client_id ?? this.clientId;
    this.defaultAvatarId = user.default_avatar_id ?? this.defaultAvatarId;
    this.defaultEmail = user.default_email ?? this.defaultEmail;
    this.defaultPhone = user.default_phone ?? this.defaultPhone;
    this.displayName = user.display_name ?? this.displayName;
    this.emails = user.emails ?? this.emails;
    this.firstName = user.first_name ?? this.firstName;
    this.id = user.id ?? this.id;
    this.isAvatarEmpty = user.is_avatar_empty ?? this.isAvatarEmpty;
    this.lastName = user.last_name ?? this.lastName;
    this.login = user.login ?? this.login;
    this.psuid = user.psuid ?? this.psuid;
    this.realName = user.real_name ?? this.realName;
    this.sex = user.sex ?? this.sex;
  }

  public getDefaultAvatarIdLink() {
    return `https://avatars.yandex.net/get-yapic/${this.defaultAvatarId}/islands-200`;
  }
}
