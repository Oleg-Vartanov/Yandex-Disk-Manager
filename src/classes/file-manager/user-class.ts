export class User {
  public uid = '';
  public displayName = '';
  public userName: object = {};
  public language = '';

  public setPropsFromResponse(user: object) {
    this.uid = user.uid ?? this.uid;
    this.displayName = user.display_name ?? this.displayName;
    this.userName = user.login ?? this.userName;
    this.language = user.country ?? this.language;
  }

  // public resetAllProperties(params: object = {}) {
  //   params = { ...this.defaultParams, ...params };
  //   this.uid = params.uid;
  //   this.displayName = params.displayName;
  //   this.userName = params.userName;
  //   this.language = params.language;
  // }
}
