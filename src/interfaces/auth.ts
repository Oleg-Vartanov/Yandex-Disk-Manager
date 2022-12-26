export interface AuthModule {
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

export interface User {
  country: Readonly<string>;
  display_name: Readonly<string>;
  login: Readonly<string>;
  uid: Readonly<string | number>;
}

export interface DiskInfo {
  is_paid: Readonly<boolean>;
  max_file_size: Readonly<string | number>;
  paid_max_file_size: Readonly<string | number>;
  revision: Readonly<string | number>;
  system_folders: Readonly<object>;
  total_space: Readonly<string | number>;
  trash_size: Readonly<string | number>;
  unlimited_autoupload_enabled: Readonly<boolean>;
  used_space: Readonly<string | number>;
  user: User;
}

export interface oAuthToken {
  access_token: string | number;
  expires_at: string | number;
  refresh_token: string | number;
  token_type: string | number;
}
