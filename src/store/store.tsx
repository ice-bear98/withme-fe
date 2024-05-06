import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  member_id: number;
  email: string;
  birthDate: string;
  nickname: string;
  gender: string;
  phone_number: null;
  profile_img: null;
  signup_Path: string;
  signup_Dttm: string;
  membership: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user: User) => {
        console.log('유저 데이터:', user);
        set({ user, isLoggedIn: true });
      },
      logout: () => {
        localStorage.removeItem('userStorage');
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'userStorage',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
