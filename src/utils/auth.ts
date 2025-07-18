/**
 * Extracts JWT token from the Authorization header
 * @param request - The incoming request
 * @returns The JWT token if present, otherwise undefined
 */
export const extractJwtToken = (request: Request): string | undefined => {
  const authHeader = request.headers.get('Authorization');
  return authHeader || undefined;
};

/**
 * Gets the JWT token from the current browser request if available
 * This can be used in client-side code to get the token from the current session
 * @returns The JWT token if present, otherwise undefined
 */
export const getCurrentJwtToken = (): string | undefined => {
  // For browser environments where document is available
  if (typeof document !== 'undefined') {
    // This is a simplified example - in a real app you might get this from
    // localStorage, sessionStorage, or a cookie depending on your auth strategy
    const token = localStorage.getItem('jwt_token');
    return token || undefined;
  }
  return undefined;
};

/**
 * Stores the JWT token for later use
 * @param token - The JWT token to store
 */
export const storeJwtToken = (token: string): void => {
  if (typeof document !== 'undefined') {
    localStorage.setItem('jwt_token', token);
  }
};

/**
 * Clears the stored JWT token
 */
export const clearJwtToken = (): void => {
  if (typeof document !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};