export const tokenStorage = {
    get: () => (typeof window === 'undefined' ? null : localStorage.getItem('accessToken')),
    set: (token: string) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('accessToken', token);
        window.dispatchEvent(new CustomEvent('auth:changed', { detail: { isLoggedIn: true } }));
    },
    clear: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('accessToken');
        window.dispatchEvent(new CustomEvent('auth:changed', { detail: { isLoggedIn: false } }));
    },
};