import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { InfoItem } from '../pages/Home';
import { AiFillAliwangwang } from 'react-icons/ai';

interface CarouselProps {
  data: InfoItem[];
}

const InfoCarousel: React.FC<CarouselProps> = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container mb-10 font-['TAEBAEKmilkyway']">
      <h2 className="flex items-center p-5 text-xl font-['LINESeedKR-Bd']">
        <AiFillAliwangwang className="mr-2" />
        최신의 지역 축제를 확인하세요
      </h2>
      <Slider {...settings}>
        {data.map((it) => (
          <div key={it.id} className="h-[560px] border-x-2 dark:border-black bg-gray-200">
            <img src={it.img} alt="" className="rounded-xl" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfoCarousel;
