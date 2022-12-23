import { useAuth } from '../modules/auth';
const { authState, logout } = useAuth();

export function tokenExpGuard(to, from, next) {
  const expires_at = authState.oAuthToken.expires_at;
  if (expires_at !== '' && expires_at < Date.now() / 1000) {
    logout();
  }
  next();
}

export function authGuard(to, from, next) {
  if (authState.isLoggedIn) {
    next();
  } else {
    next({ name: 'login' });
  }
}

export function loginGuard(to, from, next) {
  if (authState.isLoggedIn) {
    next({ name: 'main' });
  } else {
    next();
  }
}
