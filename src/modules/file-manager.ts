import { ref, readonly, Ref, UnwrapRef } from 'vue';
import { User } from '../classes/file-manager/user-class';
import { GeneralInfo } from '../classes/file-manager/general-info';
import { FileManagerModuleInterface } from '../interfaces/file-manager-interface';
import { FileManagerEnum } from '../enum/file-manager-enum';
import { useError } from './error';
import { useAuth } from './auth';
import API from '../services/api';
import { Folder } from '../classes/file-manager/folder';

const { authState } = useAuth();
const { errorState } = useError();

// State attributes START.
const user: Ref<UnwrapRef<User>> = ref(new User());

const generalInfo: Ref<GeneralInfo> = ref(new GeneralInfo());

const currentDir: Ref<UnwrapRef<Folder>> = ref(new Folder());
// State attributes END.

export const useFileManager: () => FileManagerModuleInterface = () => {
  const setGeneralInfo = () => {
    API.getDiskInfo(authState.oAuthToken.accessToken).then(
      (response) => {
        generalInfo.value.setPropsFromResponse(response.data);
        user.value.setPropsFromResponse(response.data.user);
      },
      (error) => {
        errorState.topError.show();
      }
    );
  };

  const setCurrentDir = (path: string = FileManagerEnum.ROOT_PATH) => {
    API.getRecourse(authState.oAuthToken.accessToken, path).then(
      (response) => {
        currentDir.value = new Folder(response.data);
        console.log(response.data);
        console.log(currentDir.value);
      },
      (error) => {
        errorState.topError.show();
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
