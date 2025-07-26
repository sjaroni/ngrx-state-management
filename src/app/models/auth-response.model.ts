export interface AuthResponse {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}
