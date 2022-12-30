import { DeepReadonly, Ref, UnwrapNestedRefs, UnwrapRef } from 'vue';
import { Error } from '../classes/error/error';

export interface ErrorModuleInterface {
  errorState: DeepReadonly<
    UnwrapNestedRefs<{
      topError: Ref<UnwrapRef<Error>>;
    }>
  >;
}

export interface ErrorParamsInterface {
  type?: string;
  message?: string;
}
