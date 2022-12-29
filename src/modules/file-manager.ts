import { ref, readonly, Ref, UnwrapRef } from 'vue';
import { User } from '../classes/file-manager/user-class';
import { YandexDiskGeneralInfo } from '../classes/file-manager/yandex-disk-general-info-class';
import { YandexResourceItem } from '../classes/file-manager/yandex-resource-item';
import { FileManagerModuleInterface } from '../interfaces/file-manager-interface';
import { FileManagerEnum } from '../enum/file-manager-enum';
import { useError } from './error';
import { useAuth } from './auth';
import API from '../services/api';

const { authState } = useAuth();
const { errorState } = useError();

// State attributes START.
const user: Ref<UnwrapRef<User>> = ref(new User());
const generalInfo: Ref<YandexDiskGeneralInfo> = ref(
  new YandexDiskGeneralInfo()
);
const currentDir: Ref<UnwrapRef<YandexResourceItem>> = ref(
  new YandexResourceItem()
);
// State attributes END.

export const useFileManager: () => FileManagerModuleInterface = () => {
  const setGeneralInfo = () => {
    API.getDiskInfo(authState.oAuthToken.access_token).then(
      (response) => {
        generalInfo.value.setPropsFromResponse(response.data);
        user.value.setPropsFromResponse(response.data.user);
      },
      (error) => {
        errorState.topError.value.show();
      }
    );
  };

  const setCurrentDir = (path: string = FileManagerEnum.ROOT_PATH) => {
    API.getRecourse(authState.oAuthToken.access_token, path).then(
      (response) => {
        currentDir.value.setPropsFromResponse(response.data);
      },
      (error) => {
        errorState.topError.value.show();
      }
    );
  };

  return {
    fileManagerState: readonly({
      generalInfo: generalInfo,
      user: user,
      currentDir: currentDir,
    }),
    setGeneralInfo,
    setCurrentDir,
  };
};
