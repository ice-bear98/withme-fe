import { create } from 'zustand';

interface Post {
  createdDttm: string;
  memberId: number;
  nickName: string;
  profileImg: string;
  gatheringId: number;
  title: string;
  likeCount: number;
  category: string;
  gatheringType: string;
  recruitmentStartDt: string;
  recruitmentEndDt: string;
  day: string;
  time: string;
  mainImg: string;
  subImg1: string;
  subImg2: string;
  subImg3: string;
  content: string;
  fee: number;
  maximumParticipant: number;
  participantSelectionMethod: string;
  participantsType: string;
  status: string;
  lat: string;
  lng: string;
  address: string;
  detailedAddress: string;
}

interface PostState {
  post: Post;
  setPost: (post: Post) => void;
}

const usePostStore = create<PostState>((set) => ({
  post: {
    createdDttm: '',
    memberId: 0,
    nickName: '',
    profileImg: '',
    gatheringId: 0,
    title: '',
    likeCount: 0,
    category: '',
    gatheringType: '',
    recruitmentStartDt: '',
    recruitmentEndDt: '',
    day: '',
    time: '',
    mainImg: '',
    subImg1: '',
    subImg2: '',
    subImg3: '',
    content: '',
    fee: 0,
    maximumParticipant: 0,
    participantSelectionMethod: '',
    participantsType: '',
    status: '',
    lat: '',
    lng: '',
    address: '',
    detailedAddress: '',
  },
  setPost: (post: Post) => set({ post }),
}));

export default usePostStore;
