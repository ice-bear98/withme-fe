import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EventItem } from '../../pages/Home';
import { useNavigate } from 'react-router-dom';
import { ImFire } from 'react-icons/im';
import { RiVipCrownFill } from 'react-icons/ri';

interface CarouselProps {
  title: string;
  data: EventItem[];
}

const Carousel: React.FC<CarouselProps> = ({ title, data }) => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnFocus: true,
    pauseOnHover: true,
    dots: true,
    responsive: [
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/postDetail/${id}`);
  };

  // like가 가장 높은 아이템 찾기
  const maxLikeItem = data.reduce((prev, current) => (prev.likeCount > current.likeCount ? prev : current));

  return (
    <div className="slider-container mb-10 font-['TAEBAEKmilkyway']">
      <h1 className="flex items-center p-5 text-xl font-['LINESeedKR-Bd'] text-brand_1">
        <RiVipCrownFill className="mr-2" />
        {title}
      </h1>
      <Slider {...settings}>
        {data.map((it) => (
          <div
            key={it.id}
            onClick={() => handleNavigate(it.id)}
            className="relative px-2 cursor-pointer hover:scale-105"
          >
            <div className="absolute top-5 left-5">
              <h2 className="bg-brand_4 dark:text-white dark:bg-slate-600 text-center py-1 px-2 rounded-md text-lg font-['LINESeedKR-Bd']">
                {it.title}
              </h2>
            </div>
            {/* like가 높은 아이템에만 표시 */}
            {it.likeCount === maxLikeItem.likeCount && (
              <div className="absolute top-6 right-5">
                <span className="flex items-center text-sm bg-orange-400 py-1 px-2 rounded-2xl text-white">
                  <ImFire />
                  <p className="ml-1">인기</p>
                </span>
              </div>
            )}
            <div className="absolute right-5 bottom-24 font-['LINESeedKR-Bd'] text-base bg-brand_1 px-2 text-white rounded-xl text-center">
              {it.category}
            </div>
            <img className="h-72 w-full object-cover rounded-t-2xl" src={it.mainImg} alt="" />

            <div className="text-center border border-t-0 rounded-b-2xl mb-5">
              <p
                className={`bg-brand_4 dark:bg-brand_1 dark:text-black p-1 text-center
        ${it.content.length > 21 ? 'truncate overflow-ellipsis' : ''}`}
              >
                {it.content}
              </p>
              <p className="p-1">{it.address}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
