import { ref, readonly, Ref } from 'vue';
import API from '../services/api';
import {
  User,
  DiskInfo,
  FileManager,
} from '../interfaces/file-manager-interfaces';
import { useError } from './error';
import { useAuth } from './auth';

const { authState } = useAuth();
const { setTopError } = useError();

// State attributes START.
const user: Ref<User> = ref({
  country: '',
  display_name: '',
  login: '',
  uid: '',
});

const diskInfo: Ref<DiskInfo> = ref({
  is_paid: false,
  max_file_size: '',
  paid_max_file_size: '',
  revision: '',
  system_folders: {},
  total_space: '',
  trash_size: '',
  unlimited_autoupload_enabled: false,
  used_space: '',
  user: user.value,
});
// State attributes END.

export const useFileManager: () => FileManager = () => {
  // Methods START.
  const setDiskInfo = () => {
    API.getDiskInfo(authState.oAuthToken.access_token).then(
      (response) => {
        console.log(response.data);
        diskInfo.value = response.data;
        user.value = response.data.user;
      },
      (error) => {
        setTopError({ isError: true });
        console.log(error);
      }
    );
  };
  // Methods END.

  return {
    fileManagerState: readonly({
      diskInfo: diskInfo,
      user: user,
    }),
    setDiskInfo,
  };
};
