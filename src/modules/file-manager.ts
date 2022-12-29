import { ref, readonly, Ref } from 'vue';
import API from '../services/api';
import {
  UserInterface,
  DiskInfoInterface,
  FileManagerModuleInterface,
} from '../interfaces/file-manager-interfaces';
import { useError } from './error';
import { useAuth } from './auth';

const { authState } = useAuth();
const { setTopError } = useError();

const rootPath = 'disk:/';

// State attributes START.
const user: Ref<UserInterface> = ref({
  country: '',
  display_name: '',
  login: '',
  uid: '',
});

const diskInfo: Ref<DiskInfoInterface> = ref({
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

const currentDir = ref({ _embedded: { items: {} } }); // TODO: change a default currentDir + data_type.
// State attributes END.

export const useFileManager: () => FileManagerModuleInterface = () => {
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

  const navigate = (path = rootPath) => {
    API.getRecourse(authState.oAuthToken.access_token, path).then(
      (response) => {
        console.log(response.data);
        currentDir.value = response.data;
      },
      (error) => {
        setTopError({ isError: true });
      }
    );
  };
  // Methods END.

  return {
    fileManagerState: readonly({
      diskInfo: diskInfo,
      user: user,
      currentDir: currentDir,
    }),
    setDiskInfo,
    navigate,
  };
};
