import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  memberId: number;
  email: string;
  birthDate: string;
  nickName: string;
  gender: string;
  phoneNumber: null;
  profileImg: null;
  signupPath: string;
  signupDttm: string;
  membership: string;
  isCertification: boolean;
}

interface UserState {
  user: User | null;
  myParticipation: any;
  setMyParticipation: (data: any) => void;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      myParticipation: null,
      setUser: (user: User) => {
        const updatedUser = { ...user, isCertification: user.phoneNumber === null ? false : true };
        console.log('유저 데이터:', user);
        set({ user: updatedUser, isLoggedIn: true });
      },
      setMyParticipation: (data: any) => set({ myParticipation: data }),
      logout: () => {
        localStorage.removeItem('userStorage');
        set({ user: null, myParticipation: null, isLoggedIn: false });
      },
    }),
    {
      name: 'userStorage',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
