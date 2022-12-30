import { OAuthTokenResponseInterface } from '../../interfaces/api-responses';

export class OAuthToken {
  public accessToken = '';
  public expiresAt = 0;
  public refreshToken = '';
  public tokenType = '';

  public setPropsFromResponse(data: OAuthTokenResponseInterface) {
    this.accessToken = data.access_token ?? this.accessToken;
    this.expiresAt = data.expires_in + Date.now();
    this.refreshToken = data.refresh_token ?? this.refreshToken;
    this.tokenType = data.token_type ?? this.tokenType;
  }

  public reset() {
    this.accessToken = '';
    this.expiresAt = 0;
    this.refreshToken = '';
    this.tokenType = '';
  }
}
