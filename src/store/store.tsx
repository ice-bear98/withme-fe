import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  member_id: number;
  email: string;
  pw: string;
  date: string;
  nick_name: string;
  gender: string;
  phone_number: string;
  profile_img: string;
  role: string;
  signup_path: string;
  signup_dttm: string;
  text_authentication_dttm: string;
  text_authentication_number: string;
  membership: string;
  created_dttm: string;
  modified_dttm: string;
  deleted_dttm: string | null;
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
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'userStorage',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
