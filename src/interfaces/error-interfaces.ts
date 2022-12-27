export interface TopErrorInterface {
  isError: boolean;
  type: string;
  message: string;
}

export interface ErrorModuleInterface {
  errorState: Readonly<{
    topError: Readonly<TopErrorInterface>;
  }>;
  setTopError: (newError: object) => void;
}
