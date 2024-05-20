import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiFillAliwangwang } from 'react-icons/ai';

interface CarouselProps {
  data: InfoItem[];
}

interface InfoItem {
  img: string;
  link: string;
  title: string;
}

const InfoCarousel: React.FC<CarouselProps> = ({ data }) => {
  console.log('축제 정보 :', data);

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
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container mb-10 font-['TAEBAEKmilkyway']">
      <h2 className="flex items-center p-5 text-xl font-['LINESeedKR-Bd'] text-brand_1">
        <AiFillAliwangwang className="mr-2" />
        최신의 지역 축제를 확인하세요
      </h2>
      <Slider {...settings}>
        {data.map((it, idx) => (
          <a href={it.link} target="_blank" key={idx} className="relative block">
            <div className="flex justify-center  absolute bg-black text-white w-full p-5 rounded-2xl h-full z-50 opacity-0 hover:opacity-80">
              <b className="text-center my-auto">{it.title}</b>
            </div>
            <div className="px-2 bg-inherit cursor-pointer">
              <img src={it.img} alt="축제 이미지" className="rounded-xl object-cover h-[560px] w-full" />
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default InfoCarousel;
