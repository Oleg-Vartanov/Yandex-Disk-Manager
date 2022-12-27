export interface AuthModuleInterface {
  authState: Readonly<{
    authState: Readonly<{
      oAuthToken: {
        access_token: string;
        refresh_token: string;
        expires_at: string;
        token_type: string;
      };
    }>;
    isLoggedIn: Readonly<boolean>;
  }>;
  setOAuthCode: (newCode: string) => void;
  setOAuthToken: (newOAuthToken: object) => void;
  login: () => Promise<unknown>;
  logout: () => void;
}

export interface oAuthTokenInterface {
  access_token: string | number;
  expires_at: string | number;
  refresh_token: string | number;
  token_type: string | number;
}
