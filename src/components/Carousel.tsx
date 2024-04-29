import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EventItem } from '../pages/Home';
import { useNavigate } from 'react-router-dom';
import { ImFire } from 'react-icons/im';

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
  };

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/postDetail/${id}`);
  };

  // like가 가장 높은 아이템 찾기
  const maxLikeItem = data.reduce((prev, current) => (prev.like > current.like ? prev : current));

  return (
    <div className="slider-container mb-10 font-['TAEBAEKmilkyway']">
      <h1 className="p-5">{title}</h1>
      <Slider {...settings}>
        {data.map((it) => (
          <div key={it.id} className="relative border border-white border-x-2 dark:border-black">
            <div className="absolute top-5 left-5">
              <h2 className="bg-brand_3 dark:text-black text-center py-1 px-2 rounded-md text-base">{it.title}</h2>
            </div>
            {/* like가 가장 높은 아이템에만 표시 */}
            {it.id === maxLikeItem.id && (
              <div className="absolute top-5 right-5">
                <span className="flex items-center bg-red-500 py-1 px-2 rounded-2xl text-white">
                  <ImFire />
                  <p className="ml-1">HOT</p>
                </span>
              </div>
            )}
            <div className="absolute bottom-14 right-5">
              <button
                className="bg-brand_1 text-white py-1 px-2 rounded-lg font-['LINESeedKR-Bd']"
                onClick={() => handleNavigate(it.id)}
              >
                상세보기
              </button>
            </div>
            <img className="h-72 w-full object-cover" src={it.img} alt="" />
            <p className="text-center bg-brand_4 dark:bg-brand_1 dark:text-black p-2">{it.content}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
