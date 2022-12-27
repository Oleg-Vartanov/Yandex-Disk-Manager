import { reactive, readonly } from 'vue';
import {
  ErrorModuleInterface,
  TopErrorInterface,
} from '../interfaces/error-interfaces';

const defaultError: TopErrorInterface = {
  isError: false,
  type: 'danger', // ['success', 'info', 'warning', 'danger']
  message: 'A server error. Please try later.',
};

const topError = reactive(defaultError);

export const useError: () => ErrorModuleInterface = () => {
  const setTopError = (newError: object = {}) => {
    topError.isError = newError.isError ?? defaultError.isError;
    topError.type = newError.type ?? defaultError.type;
    topError.message = newError.message ?? defaultError.message;
  };

  return {
    errorState: readonly({
      topError: topError,
    }),
    setTopError,
  };
};
