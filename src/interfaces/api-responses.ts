export interface oAuthTokenResponseInterface {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface userResponseInterface {
  uid: string;
  display_name: string;
  login: string;
  country: string;
}

export interface yandexDiskGeneralInfoResponseInterface {
  is_paid: boolean;
  max_file_size: number;
  paid_max_file_size: number;
  revision: number;
  system_folders: object;
  total_space: number;
  trash_size: number;
  unlimited_autoupload_enabled: boolean;
  used_space: number;
}

export interface yandexResourceItemResponseInterface {
  comment_ids: object;
  created: string;
  exif: object;
  modified: string;
  name: string;
  path: string;
  resource_id: string;
  revision: number;
  type: string;
  _embedded: {
    items: [];
    limit: number;
    offset: number;
    path: string;
    sort: string;
    total: number;
  };
}
