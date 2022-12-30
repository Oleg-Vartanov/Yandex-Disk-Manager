import {
  DeepReadonly,
  Ref,
  ComputedRef,
  UnwrapRef,
  UnwrapNestedRefs,
} from 'vue';
import { OAuthToken } from '../classes/auth/oauth-token';

export interface AuthModuleInterface {
  login: () => void;
  loginCallback: (newOAuthCode: string) => void;
  logout: () => void;
  authState: DeepReadonly<
    UnwrapNestedRefs<{
      oAuthToken: Ref<UnwrapRef<OAuthToken>>;
      isLoggedIn: ComputedRef<boolean>;
    }>
  >;
}
