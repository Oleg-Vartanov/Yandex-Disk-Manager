import { DeepReadonly, Ref, UnwrapRef, UnwrapNestedRefs } from 'vue';
import { User } from '../classes/file-manager/user-class';
import { GeneralInfo } from '../classes/file-manager/general-info';
import { Folder } from '../classes/file-manager/folder';

export interface FileManagerModuleInterface {
  fileManagerState: DeepReadonly<
    UnwrapNestedRefs<{
      currentDir: Ref<UnwrapRef<Folder>>;
      generalInfo: Ref<GeneralInfo>;
      user: Ref<UnwrapRef<User>>;
    }>
  >;
  setCurrentDir: (path?: string) => void;
  setGeneralInfo: () => void;
}
