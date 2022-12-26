import { Ref } from 'vue';

export interface FileManager {
  fileManagerState: Readonly<{
    diskInfo: Ref<DiskInfo>;
    user: Ref<User>;
  }>;
  setDiskInfo: () => void;
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
