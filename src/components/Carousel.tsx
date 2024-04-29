import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    speed: 200,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnFocus: true,
    pauseOnHover: true,
    dots: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="relative">
          <div className="absolute top-5 left-5">
            <h2 className="bg-white text-center p-1">제목</h2>
            <h3 className="bg-white text-center p-1 mt-2">작성자</h3>
          </div>
          <div className="absolute bottom-3 left-5">
            <span>내용</span>
          </div>
          <img src="https://cdn.pixabay.com/photo/2021/11/08/11/59/students-6779002_960_720.jpg" alt="" />
        </div>
        <div>
          <h3>2</h3>
          <img src="https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557399_1280.jpg" alt="" />
        </div>
        <div>
          <h3>3</h3>
          <img src="https://cdn.pixabay.com/photo/2023/07/11/08/50/fireworks-8119898_1280.jpg" alt="" />
        </div>
        <div>
          <h3>4</h3>
          <img src="https://cdn.pixabay.com/photo/2018/08/22/15/35/beer-3623913_1280.jpg" alt="" />
        </div>
        <div>
          <h3>5</h3>
          <img src="https://cdn.pixabay.com/photo/2016/11/22/19/25/man-1850181_1280.jpg" alt="" />
        </div>
        <div>
          <h3>6</h3>
          <img src="https://cdn.pixabay.com/photo/2021/11/26/02/39/dog-6824999_1280.jpg" alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
