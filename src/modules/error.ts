import { ref, readonly, Ref, UnwrapRef } from 'vue';
import { ErrorModuleInterface } from '../interfaces/error-interface';
import { Error } from '../classes/error/error';

const topError: Ref<UnwrapRef<Error>> = ref(new Error());

export const useError: () => ErrorModuleInterface = () => {
  return {
    errorState: readonly({
      topError: topError,
    }),
  };
};
