import { useEffect, useState } from 'react';
import Banner from '../components/home/Banner';
import Carousel from '../components/home/Carousel';
import InfoCarousel from '../components/home/InfoCarousel';
import axios from 'axios';

export interface EventItem {
  id: number;
  like: number;
  title: string;
  img: string;
  content: string;
}

export interface InfoItem {
  id: number;
  img: string;
}

export default function Home() {
  const [festival, setFestival] = useState<any>([]);
  const URL = import.meta.env.VITE_SERVER_URL;

  const dummyItem: EventItem[] = [
    {
      id: 1,
      like: 10,
      title: '여의도 자전거',
      img: 'https://cdn.pixabay.com/photo/2015/11/18/15/44/france-1049333_1280.jpg',
      content: '같이 자전거 타실뿐',
    },
    {
      id: 2,
      like: 10,
      title: '한강 산책',
      img: 'https://cdn.pixabay.com/photo/2015/05/02/08/59/han-river-749662_1280.jpg',
      content: '같이 야경보며 산책해요',
    },
    {
      id: 3,
      like: 10,
      title: '경복궁 사진촬영',
      img: 'https://cdn.pixabay.com/photo/2015/12/16/03/45/korea-1095361_1280.jpg',
      content: '서로 사진 찍어주며 놀아요',
    },
    {
      id: 4,
      like: 10,
      title: '벚꽃 구경',
      img: 'https://cdn.pixabay.com/photo/2020/04/05/09/22/cherry-blossoms-5005234_1280.jpg',
      content: '피크닉 가실뿐',
    },
    {
      id: 5,
      like: 10,
      title: '공시생 면접 준비',
      img: 'https://cdn.pixabay.com/photo/2021/02/02/02/34/cafe-5972490_1280.jpg',
      content: '공무원 면접 준비 같이할뿐 (합격자만)',
    },
    {
      id: 6,
      like: 20,
      title: '우리 뽀삐랑 산책할 사람',
      img: 'https://cdn.pixabay.com/photo/2019/02/06/15/18/puppy-3979350_1280.jpg',
      content: '소형견 견주님이라면 더 환영해요',
    },
  ];

  const dummyItem2: EventItem[] = [
    {
      id: 1,
      like: 10,
      title: '칵테일 체험 이벤트',
      img: 'https://cdn.pixabay.com/photo/2018/04/17/11/03/cocktail-3327242_1280.jpg',
      content: '길동이네 펍에서 칵테일 체험 이벤트 !',
    },
    {
      id: 2,
      like: 20,
      title: '맛있는 파스타 미팅',
      img: 'https://cdn.pixabay.com/photo/2022/10/15/01/00/wine-7522280_1280.jpg',
      content: '파스타 전문집 파묘에서 즉석 소개팅 이벤트 개최해요',
    },
    {
      id: 3,
      like: 10,
      title: '수제 머핀 만들기',
      img: 'https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg',
      content: '하늘제과에서 직접 머핀을 커스텀해서 구매해요',
    },
    {
      id: 4,
      like: 10,
      title: '봄패션 코디왕을 찾아라',
      img: 'https://cdn.pixabay.com/photo/2017/02/26/02/37/girl-2099359_1280.jpg',
      content: '무신사에서 패션왕을 뽑아요 (이벤트 상품 증정)',
    },
    {
      id: 5,
      like: 10,
      title: '봄맞이 자전거 이벤트',
      img: 'https://cdn.pixabay.com/photo/2015/05/28/22/29/bicycle-788733_1280.jpg',
      content: '기존의 구자전거 처리하고, 새 자전거 싸게 장만하자',
    },
    {
      id: 6,
      like: 10,
      title: '스타벅스 커스텀 장인을 찾다',
      img: 'https://cdn.pixabay.com/photo/2017/05/26/15/28/womens-2346309_1280.jpg',
      content: '나만의 커스텀 대회에서 우승하고 상품받자 !',
    },
  ];

  const getFestival = async () => {
    try {
      await axios.get(`${URL}/api/festival`).then((res) => setFestival(res.data.content));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFestival();
  }, []);

  return (
    <main className="dark:bg-gray-800 dark:text-white">
      <section className="xs:hidden">
        <Banner />
      </section>

      <section>
        <Carousel title={'가장 인기있는 이벤트'} data={dummyItem2} />
        <Carousel title={'가장 인기있는 모임'} data={dummyItem} />
      </section>
      <InfoCarousel data={festival} />
    </main>
  );
}
