import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {IUser} from "../types/index";
import {AuthService} from '../services/auth.service';
import {toast} from 'sonner';

interface AuthState {
    user: Partial<IUser> | null
    accessToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    signUpError: string | null
}

interface AuthStore extends AuthState {
    login: (email: string, password: string) => Promise<boolean>;
    googleAuthLogin: (token: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    refreshUser: () => Promise<void>;
    fetchUser: () => Promise<void>;
    logout: () => Promise<{ error: string | null, status: boolean }>;
    clearState: () => Promise<void>;
    refreshToken: () => Promise<string>;
    setState: (state: Partial<AuthState>) => void;
    setHasHydrated: (hydrated: AuthStore) => Promise<void>;
    updateProfilePicture: (profilePicture: string) => void;
    setUser: (user: Partial<IUser>) => void;
}

const AuthStore = create<AuthStore>();

export const useAuthStore = AuthStore(
    devtools(
        persist(
            function authStore(set, getState) {
                return {
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                    isLoading: true,
                    error: null,
                    signUpError: null,

                    login: async (email, password): Promise<boolean> => {
                        set({isLoading: true, error: null});
                        const {data, error} = await AuthService.login({email, password});

                        if (error) {
                            set({error: error, isLoading: false});
                            toast.error('error');
                            console.log('error occuered',error);
                            
                            return false;
                        }
                        toast.success('Logged in successfully.')
                        const {user, accessToken} = data;

                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return true
                    },

                    googleAuthLogin: async (token: string) => {
                        set({isLoading: true, error: null});
                        const {data, error} = await AuthService.googleAuthLogin(token);

                        if (!data || error) {
                            set({error: error, isLoading: false});
                            return;
                        }

                        const {user, token: accessToken} = data;

                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    },

                    register: async (name: string, email: string, password: string): Promise<boolean> => {
                        set({isLoading: true, signUpError: null});
                        const {data, error} = await AuthService.register({name, email, password});

                        if (error) {
                            set({signUpError: error, isLoading: false});
                            return false
                        }
                        toast.success('OTP shared successfully')
                        const {user, token: accessToken} = data;

                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return true
                    },

                    logout: async () => {
                        set({isLoading: true, error: null});
                        const {error} = await AuthService.logout();
                        if (error) {
                            set({error: error, isLoading: false});
                            return {error: error, status: false};
                        }
                        await getState().clearState();
                        return {error: null, status: true};
                    },

                    refreshToken: async () => {
                        set({error: null});

                        if (!getState().isAuthenticated) {
                            return;
                        }

                        const {data, error} = await AuthService.refreshToken();

                        console.log('AuthStore: Token refreshed:', data, error);

                        if (error) {
                            console.log("Referesh token error", error)
                            set({error: error, isLoading: false});
                            await getState().logout();
                            return error;
                        }

                        const {token} = data;

                        set({accessToken: token, isLoading: false});
                        return token;
                    },

                    fetchUser: async () => {
                        const {data: user, error} = await AuthService.fetchUser();

                        if (error) {
                            set({error: error, isLoading: false, user: null, isAuthenticated: false});
                            return;
                        }

                        set({
                            user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        console.log('AuthStore: User set during fetchUser:', user);
                    },

                    setHasHydrated: async (state) => {
                        if (state.isAuthenticated && state.accessToken) {
                            try {
                                await getState().refreshToken();
                                await getState().fetchUser();
                            } catch (error) {
                                console.error('AuthStore: Failed to re-authenticate or fetch user:', error);
                                set({
                                    isLoading: false,
                                    user: null,
                                    accessToken: null,
                                    isAuthenticated: false,
                                    error: 'Failed to restore session.'
                                });
                            }
                            return;
                        }

                        console.log('AuthStore: No user found, clearing state...');
                        set({
                            isLoading: false,
                            user: null,
                            accessToken: null,
                            isAuthenticated: false,
                            error: null,
                        });
                    },

                    refreshUser: async () => {
                        const token = getState().accessToken;
                        if (!token) {
                            set({
                                isLoading: false,
                                user: null,
                                accessToken: null,
                                isAuthenticated: false,
                                error: 'Failed to refresh token: no token found'
                            });
                            return;
                        }

                        await getState().fetchUser();
                    },

                    setState: ({isLoading, isAuthenticated, user, accessToken}) => {
                        set({isLoading, isAuthenticated, user, accessToken});
                    },

                    updateProfilePicture: (profilePicture: string) => {
                        set((state) => ({
                            user: state.user
                                ? {...state.user, profilePicture}
                                : state.user,
                        }));
                    },

                    clearState: async () => {
                        set({
                            user: null,
                            accessToken: null,
                            isAuthenticated: false,
                            isLoading: false,
                            error: null,
                            signUpError: null,
                        });
                    },
                    setUser: (user: Partial<IUser>) => {
                        set({ user });
                    },
                };
            },
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    isAuthenticated: state.isAuthenticated,
                }),
                onRehydrateStorage: () => {
                    return (state, error) => {
                        if (error) {
                            console.error('AuthStore: Failed to rehydrate state:', error);
                            state?.clearState()
                            return;
                        }
                        state?.setHasHydrated(state);
                    };
                },
            },
        ),
        {name: 'auth-store', enabled: true},
    ),
);

export default useAuthStore;
