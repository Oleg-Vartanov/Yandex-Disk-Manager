import { DeepReadonly, Ref, UnwrapRef, UnwrapNestedRefs } from 'vue';
import { User } from '../classes/file-manager/user-class';
import { YandexDiskGeneralInfo } from '../classes/file-manager/yandex-disk-general-info-class';
import { YandexResourceItem } from '../classes/file-manager/yandex-resource-item';

export interface FileManagerModuleInterface {
  fileManagerState: DeepReadonly<
    UnwrapNestedRefs<{
      currentDir: Ref<UnwrapRef<YandexResourceItem>>;
      generalInfo: Ref<YandexDiskGeneralInfo>;
      user: Ref<UnwrapRef<User>>;
    }>
  >;
  setCurrentDir: (path?: string) => void;
  setGeneralInfo: () => void;
}
