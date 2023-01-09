import { ref, readonly, Ref, UnwrapRef } from 'vue';
import { YandexDiskUser } from '../classes/file-manager/yandex-disk-user';
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
const user: Ref<UnwrapRef<YandexDiskUser>> = ref(new YandexDiskUser());

const generalInfo: Ref<GeneralInfo> = ref(new GeneralInfo());

const currentDir: Ref<UnwrapRef<Folder>> = ref(new Folder());
const isLoading: Ref<UnwrapRef<boolean>> = ref(false);
// State attributes END.

export const useFileManager: () => FileManagerModuleInterface = () => {
  const setGeneralInfo = () => {
    API.getDiskInfo(authState.oAuthToken.accessToken)
      .then((response) => {
        generalInfo.value.setPropsFromResponse(response.data);
        user.value.setPropsFromResponse(response.data.user);
      })
      .catch((error) => {
        errorState.topError.show();
      });
  };

  const setCurrentDir = (path: string = FileManagerEnum.ROOT_PATH) => {
    const limit = FileManagerEnum.DEFAULT_RESOURCE_LIMIT;
    const offset = FileManagerEnum.DEFAULT_RESOURCE_OFFSET;

    isLoading.value = true;
    API.getRecourse(authState.oAuthToken.accessToken, path, limit, offset)
      .then((response) => {
        // Init new folder and fill with first items.
        currentDir.value = new Folder(response.data);
        isLoading.value = false;

        // Load more items recursively (if there are any).
        loadMoreItems(
          path,
          limit + FileManagerEnum.DEFAULT_RESOURCE_LIMIT,
          offset + FileManagerEnum.DEFAULT_RESOURCE_LIMIT
        );
      })
      .catch(() => {
        errorState.topError.show();
        isLoading.value = false;
      });
  };

  const loadMoreItems = (
    path: string = FileManagerEnum.ROOT_PATH,
    limit: number,
    offset: number
  ) => {
    if (
      currentDir.value.embedded.total > currentDir.value.embedded.items.length
    ) {
      isLoading.value = true;
      API.getRecourse(authState.oAuthToken.accessToken, path, limit, offset)
        .then((response) => {
          // Append current folder items if it wasn't changed.
          if (currentDir.value.hasResourceId(response.data.resource_id)) {
            currentDir.value.appendEmbeddedItems(response.data._embedded);
            isLoading.value = false;

            // Load more items recursively (if there are any).
            loadMoreItems(
              path,
              limit + FileManagerEnum.DEFAULT_RESOURCE_LIMIT,
              offset + FileManagerEnum.DEFAULT_RESOURCE_LIMIT
            );
          }
        })
        .catch((error) => {
          errorState.topError.show();
          isLoading.value = false;
        });
    }
  };

  const navigateDirUp = () => {
    const currentPath = currentDir.value.path;
    setCurrentDir(currentPath.substring(0, currentPath.lastIndexOf('/') + 1)); // Removes last folder from URL.
  };

  return {
    fileManagerState: readonly({
      isLoading: isLoading,
      generalInfo: generalInfo,
      user: user,
      currentDir: currentDir,
    }),
    setGeneralInfo,
    setCurrentDir,
    navigateDirUp,
  };
};
