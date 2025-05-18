export function saveToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function saveProfile(profile: object) {
  localStorage.setItem('user_profile', JSON.stringify(profile));
}

export function getProfile(): any | null {
  const raw = localStorage.getItem('user_profile');
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_profile');
}