import { useEffect, useState } from 'react';
import Banner from '../components/home/Banner';
import Carousel from '../components/home/Carousel';
import InfoCarousel from '../components/home/InfoCarousel';
import axios from 'axios';

export interface EventItem {
  id: number;
  likeCount: number;
  title: string;
  mainImg: string;
  content: string;
  category: string;
  address: string;
}

export interface InfoItem {
  id: number;
  img: string;
}

export default function Home() {
  const [festival, setFestival] = useState<any>([]);
  const [hotEvent, setHotEvent] = useState<any>([]);
  const [hotMeet, setHotMeet] = useState<any>([]);
  const URL = import.meta.env.VITE_SERVER_URL;

  const getFestival = async () => {
    try {
      await axios.get(`${URL}/api/festival`).then((res) => setFestival(res.data.content));
    } catch (error) {
      console.error(error);
    }
  };

  const getHotPost = async () => {
    const meetParams = {
      size: 6,
      sort: 'likeCount,desc',
      option: 'all',
      range: 'meeting',
    };
    const eventParams = {
      size: 6,
      sort: 'likeCount,desc',
      option: 'all',
      range: 'event',
    };
    try {
      const [meetResponse, eventResponse] = await Promise.all([
        axios.get(`${URL}/api/search/gathering/title`, { params: meetParams }),
        axios.get(`${URL}/api/search/gathering/title`, { params: eventParams }),
      ]);
      setHotMeet(meetResponse.data.content);
      setHotEvent(eventResponse.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFestival();
    getHotPost();
  }, []);

  console.log(hotEvent);
  console.log(hotMeet);

  return (
    <main className="dark:bg-gray-800 dark:text-white">
      <section className="xs:hidden">
        <Banner />
      </section>

      <section>
        {hotEvent?.length > 0 && <Carousel title={'가장 인기있는 이벤트'} data={hotEvent} />}
        {hotMeet?.length > 0 && <Carousel title={'가장 인기있는 모임'} data={hotMeet} />}
      </section>
      <InfoCarousel data={festival} />
    </main>
  );
}
