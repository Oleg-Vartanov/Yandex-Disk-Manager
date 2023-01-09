import { Folder } from '../classes/file-manager/folder';
import { File } from '../classes/file-manager/file';
import { AudioFile } from '../classes/file-manager/audioFile';

export interface OAuthTokenResponseInterface {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface UserResponseInterface {
  uid: string;
  display_name: string;
  login: string;
  country: string;
}

export interface GeneralInfoResponseInterface {
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

export interface ItemResponseInterface {
  // Item
  comment_ids: object;
  created: string;
  exif: object;
  modified: string;
  name: string;
  path: string;
  resource_id: string;
  revision: number;
  type: string;
}

export interface FolderResponseInterface extends ItemResponseInterface {
  _embedded: Embedded;
}

export interface FileResponseInterface extends ItemResponseInterface {
  file: string;
  md5: string;
  media_type: string;
  mime_type: string;
  sha256: string;
  size: number;
}

export interface Embedded {
  items: (Folder | File | AudioFile)[];
  limit: number;
  offset: number;
  path: string;
  sort: string;
  total: number;
}
