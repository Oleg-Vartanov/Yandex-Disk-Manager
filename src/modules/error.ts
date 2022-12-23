import { reactive, readonly } from 'vue';

export interface TopError {
  isError: boolean;
  type: string;
  message: string;
}

interface ErrorModule {
  errorState: Readonly<{
    topError: Readonly<TopError>;
  }>;
  setTopError: (newError: object) => void;
}

const defaultError = {
  isError: false,
  type: 'danger', // ['success', 'info', 'warning', 'danger']
  message: 'A server error. Please try later.',
};

const topError = reactive(defaultError);

export const useError: () => ErrorModule = () => {
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
