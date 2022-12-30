import { useAuth } from '../modules/auth';
const { authState, logout } = useAuth();

export function tokenExpGuard(to: object, from: object, next: any) {
  if (authState.oAuthToken.expiresAt < Date.now()) {
    logout();
  }
  next();
}

export function authGuard(to: object, from: object, next: any) {
  if (authState.isLoggedIn) {
    next();
  } else {
    next({ name: 'login' });
  }
}

export function loginGuard(to: object, from: object, next: any) {
  if (authState.isLoggedIn) {
    next({ name: 'main' });
  } else {
    next();
  }
}
