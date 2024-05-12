import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { RiChatSmile2Fill } from 'react-icons/ri';
import { GiForestCamp } from 'react-icons/gi';
import { FaPeoplePulling } from 'react-icons/fa6';
import { FaCameraRetro } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { IoMdBeer } from 'react-icons/io';

import { Link } from 'react-router-dom';

export default function Banner() {
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <Slider {...settings}>
      <div className="w-full h-[600px] overflow-hidden relative font-['seolleimcool-SemiBold']">
        <div className="absolute top-10 left-5 hidden s:block text-white">
          <h3 className="text-center text-brand_1 text-xl">윗미는 여러 모임과 이벤트를 체험해요</h3>
          <p className="text-center mt-1 text-brand_3">좋아하는 캠핑을 같은 사람들과 함께 즐긴다거나</p>
        </div>
        <p></p>
        <div className="absolute text-brand_3 top-10 left-10 text-2xl s:hidden">
          <h3 className="flex w-[610px] items-center justify-center s:hidden">
            <strong className="text-brand_1">윗미</strong>는 여러 다양한 모임과 이벤트 활동을 할 수 있어요
            <RiChatSmile2Fill className="ml-2" />
          </h3>
          <p className="text-xl text-brand_4 mt-3 ml-7 flex items-center">
            <GiForestCamp className="mr-2 text-2xl" />
            자연을 좋아하는 사람들과 <b className="text-3xl mx-2">함께</b> 캠핑을 떠나던가
          </p>
        </div>
        <div className="absolute bottom-10 right-20 s:right-10">
          <Link to={'/join'}>
            <b className="text-white bg-black py-3 px-6 rounded-full cursor-pointer text-lg hover:bg-brand_1 hover:text-black">
              윗미에 함께 참여하기
            </b>
          </Link>
        </div>
        <img
          className="object-cover h-screen"
          src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="banner_img"
        />
      </div>
      <div className="w-full h-[600px] relative font-['seolleimcool-SemiBold']">
        <div className="absolute top-10 left-5 hidden s:block text-white">
          <h3 className="text-center text-brand_1 text-xl">혼자라 못했던 활동을 시작해요</h3>
          <p className="text-center mt-1 text-brand_3">서로의 사진을 찍어줄 친구를 구한다던가</p>
        </div>
        <div className="absolute text-center top-10 left-10 text-2xl s:hidden">
          <h3 className="flex items-center justify-center text-brand_3">
            <strong className="text-2xl mr-2 text-brand_1">혼자라서</strong>못했던 취미를 함께해요
            <FaPeoplePulling className="ml-2" />
          </h3>
          <p className="text-2xl mt-3 ml-7 flex items-center text-brand_4">
            서로의 사진을 <FaCameraRetro className="mx-2 text-2xl" /> 찍어줄 <b className="text-3xl ml-2">친구</b>를
            만나 신나거나
          </p>
        </div>
        <div className="absolute bottom-10 right-20 s:right-10">
          <Link to={'/join'}>
            <b className="text-white bg-black py-3 px-6 rounded-full cursor-pointer text-lg hover:bg-brand_1 hover:text-black">
              윗미에 함께 참여하기
            </b>
          </Link>
        </div>
        <img
          className="object-cover h-screen"
          src="https://cdn.pixabay.com/photo/2021/03/26/15/40/friendship-6126262_1280.jpg"
          alt="banner_img"
        />
      </div>
      <div className="w-full h-[600px] relative font-['seolleimcool-SemiBold']">
        <div className="absolute top-10 left-5 hidden s:block text-white">
          <h3 className="text-center text-brand_1 text-xl">다양한 이벤트를 알게되고 참여해요</h3>
          <p className="text-center mt-1 text-brand_3">내가 몰랐던 근처의 이벤트 진행 소식을 듣게되거나</p>
        </div>
        <div className="absolute text-center top-10 left-10 text-2xl s:hidden">
          <h3 className="flex w-[390px] items-center justify-center text-brand_3">
            내가<strong className="text-2xl mx-2 text-brand_1">몰랐던</strong>이벤트에 참여해요
            <FaLocationArrow className="ml-2" />
          </h3>
          <p className="text-xl mt-3 flex items-center text-brand_4">
            <IoMdBeer className="mr-2 text-2xl" />
            알고보니<b className="text-2xl mx-2">근처의</b>
            가게 이벤트를 알게되던가 이벤트를 알게된다던가
          </p>
        </div>
        <div className="absolute bottom-10 right-20 s:right-10">
          <Link to={'/join'}>
            <b className="text-white bg-black py-3 px-6 rounded-full cursor-pointer text-lg hover:bg-brand_1 hover:text-black">
              윗미에 함께 참여하기
            </b>
          </Link>
        </div>
        <img
          className="object-cover h-screen"
          src="https://cdn.pixabay.com/photo/2014/10/17/22/18/alcohol-492871_1280.jpg"
          alt="banner_img"
        />
      </div>
    </Slider>
  );
}
