/**
 * Centralized API Service for LCA Application
 * Connects to Spring Boot Backend at http://localhost:8080 (or VITE_API_URL)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Helper to build full request URL
 */
const getUrl = (endpoint) => {
    // If backend is on same domain or proxied
    if (!API_BASE_URL) return endpoint;
    return `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`;
};

/**
 * Common response handler for Spring Boot backend
 */
async function handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        let errorMessage = 'An unexpected error occurred.';

        if (typeof data === 'object' && data !== null) {
            // Handle Spring Boot validation errors or custom error response
            if (data.message) {
                errorMessage = data.message;
            } else if (data.error) {
                errorMessage = data.error;
            } else if (data.errors && Array.isArray(data.errors)) {
                errorMessage = data.errors.map(err => err.defaultMessage || err).join(', ');
            }
        } else if (typeof data === 'string' && data.trim()) {
            errorMessage = data;
        }

        if (response.status === 401 || response.status === 403) {
            errorMessage = errorMessage === 'An unexpected error occurred.'
                ? 'Invalid email or password.'
                : errorMessage;
        } else if (response.status === 400 && errorMessage.toLowerCase().includes('password')) {
            errorMessage = 'Password must be at least 8 characters long.';
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

export const authApi = {
    /**
     * User Login API
     * Backend Endpoint: POST /api/auth/login
     * Request payload: { email: string, password: string }
     * Response payload: { token: string, message: string }
     */
    login: async (credentials) => {
        const payload = {
            email: credentials.email?.trim(),
            password: credentials.password,
        };

        try {
            const response = await fetch(getUrl('/api/auth/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            return await handleResponse(response);
        } catch (err) {
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                throw new Error('Unable to connect to backend server at ' + API_BASE_URL + '. Please ensure the Spring Boot server is running on port 8080.');
            }
            throw err;
        }
    },

    /**
     * User Registration API
     * Backend Endpoint: POST /api/auth/register
     * Request payload: { name: string, email: string, password: string }
     * Response payload: { message: string }
     */
    register: async (userData) => {
        const payload = {
            name: userData.name?.trim(),
            email: userData.email?.trim(),
            password: userData.password,
        };

        try {
            const response = await fetch(getUrl('/api/auth/register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            return await handleResponse(response);
        } catch (err) {
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                throw new Error('Unable to connect to backend server at ' + API_BASE_URL + '. Please ensure the Spring Boot server is running on port 8080.');
            }
            throw err;
        }
    },

    /**
     * Helper for authenticated requests
     */
    getAuthHeader: (token) => {
        const authToken = token || localStorage.getItem('lca_jwt_token');
        return authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
    },
};

export default authApi;
