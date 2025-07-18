import { storeJwtToken } from './auth';

/**
 * Middleware to extract JWT token from incoming requests
 * This can be used in server-side code or in a service worker
 * @param request - The incoming request
 */
export const extractAndStoreJwtToken = (request: Request): void => {
  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    storeJwtToken(authHeader);
  }
};

/**
 * Intercepts fetch requests to extract JWT tokens from responses
 * Call this function early in your application to set up the interceptor
 */
export const setupAuthInterceptor = (): void => {
  if (typeof window !== 'undefined') {
    // Store the original fetch function
    const originalFetch = window.fetch;

    // Override the fetch function
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
      // Call the original fetch function
      const response = await originalFetch(input, init);
      
      // Check if the response has an Authorization header
      const authHeader = response.headers.get('Authorization');
      if (authHeader) {
        storeJwtToken(authHeader);
      }
      
      return response;
    };
  }
};