import { DeepReadonly, Ref, UnwrapRef, UnwrapNestedRefs } from 'vue';
import { YandexDiskUser } from '../classes/file-manager/yandex-disk-user';
import { GeneralInfo } from '../classes/file-manager/general-info';
import { Folder } from '../classes/file-manager/folder';

export interface FileManagerModuleInterface {
  fileManagerState: DeepReadonly<
    UnwrapNestedRefs<{
      currentDir: Ref<UnwrapRef<Folder>>;
      generalInfo: Ref<GeneralInfo>;
      user: Ref<UnwrapRef<YandexDiskUser>>;
    }>
  >;
  setCurrentDir: (path?: string) => void;
  navigateDirUp: () => void;
  setGeneralInfo: () => void;
}
