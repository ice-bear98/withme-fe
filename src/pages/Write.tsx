import React, { useEffect, useRef, useState } from 'react';
import KakaoMap from '../components/KakaoMap';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { FaMagic } from 'react-icons/fa';
import { CiPen, CiImageOn, CiCircleInfo } from 'react-icons/ci';
interface IForm {
  title: string;
  kind: string;
  like: number;
  date_st: string;
  date_end: string;
  time: string;
  category: string;
  personnel: number;
  address: string;
  address_detail: string;
  location: string;
  writer: string;
  pay: number;
  method: string;
  target: string;
  title_img: string;
  sub_img: string[];
  content: string;
}

export default function Write() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: '',
      kind: 'meeting',
      like: 0,
      date_st: '',
      date_end: '',
      time: '',
      personnel: 0,
      address: '',
      address_detail: '',
      location: '',
      writer: '',
      pay: 0,
      method: 'first_come',
      target: 'no_restrinctions',
      title_img: '',
      sub_img: [],
      content: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [daumAddress, setDaumAddress] = useState<string>('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  /** 다음 주소찾기 API */
  const onClickAddr = () => {
    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: async function (data: any) {
          console.log(data);
          setDaumAddress(data.address);

          try {
            const coords = await getAddressCoords(data.address);
            setCoords(coords);
          } catch (error) {
            console.error('Error fetching coordinates:', error);
          }
        },
      });
      postcode.open({
        autoClose: true,
      });
    });
  };

  // 주소 검색후 위도 경도 찾기
  const getAddressCoords = (address: string): Promise<{ lat: number; lng: number }> => {
    const geoCoder = new kakao.maps.services.Geocoder();
    return new Promise((resolve, reject) => {
      geoCoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const lat = result[0].y;
          const lng = result[0].x;
          resolve({ lat, lng });
        } else {
          reject(status);
        }
        console.log(coords);
      });
    });
  };

  return (
    <main className="py-10 font-['TAEBAEKmilkyway'] shadow-xl p-5 mb-5 mt-5 rounded-2xl dark:bg-gray-600">
      <h1 className="flex justify-center mb-10 font-['LINESeedKR-Bd'] text-2xl">
        <div className="flex justify-center items-center bg-brand_3 px-5 py-2 rounded-2xl">
          <FaMagic className="mr-3" />
          이벤트 및 모임 주최하기
        </div>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 최상단바 (제목, 카테고리 분류) */}
        <div className="flex justify-around border border-brand_1 mb-5 dark:bg-brand_2">
          <label className="py-3 font-['LINESeedKR-Bd']" htmlFor="title">
            제목
          </label>
          <input
            className="w-2/4 placeholder:text-center p-3 outline-none text-center"
            type="text"
            {...register('title', {
              required: true,
              minLength: { value: 10, message: '제목은 최소 10글자 이상 작성해주세요.' },
              maxLength: { value: 40, message: '40글자 이내로 작성해주세요.' },
            })}
            placeholder="제목을 입력하세요"
            name="title"
          />
          <label className="py-3 font-['LINESeedKR-Bd']" htmlFor="category">
            카테고리
          </label>
          <input
            className="placeholder:text-center p-3 outline-none text-center"
            type="text"
            {...register('category', {
              required: true,
              minLength: { value: 2, message: '카테고리를 적어주세요 예) 독서, 산책, 운동' },
              maxLength: { value: 8, message: '카테고리는 8글자 이내로 작성해주세요.' },
            })}
            placeholder="카테고리를 적어주세요"
            name="category"
          />
          <div className="flex space-x-5 items-center">
            <label className="font-['LINESeedKR-Bd']" htmlFor="kind">
              분류를 골라주세요
            </label>
            <select
              className="outline-none bg-brand_3 p-1 rounded-xl"
              id="kind"
              {...register('kind', {
                required: true,
              })}
            >
              <option value="meeting">모임</option>
              <option value="event">이벤트</option>
            </select>
          </div>
        </div>

        {errors.title && <p className="text-red-500 mb-5">{errors.title.message}</p>}
        {errors.category && <p className="text-red-500 mb-5">{errors.category.message}</p>}

        {/* 상단바 (썸네일, 설정작성) */}
        <h3 className="flex mt-5 items-center space-x-2 dark:text-white">
          <CiCircleInfo />
          <span>대표로 노출되는 썸네일 이미지와 설정을 입력해주세요.</span>
        </h3>

        <div className="flex justify-between space-x-5 mt-5">
          <div className="border-2 w-1/2 h-96 ">
            <input
              type="file"
              // {...register('title_img', {
              //   required: true,
              // })}
            />
          </div>

          <div className="flex-col content-center space-y-3 w-1/2 h-96">
            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="date_st" className="mr-2 font-['LINESeedKR-Bd']">
                모집 시작일
              </label>
              <input
                className="text-center px-1"
                type="date"
                id="date_st"
                {...register('date_st', {
                  required: true,
                })}
              />
              <label htmlFor="date_ed" className="ml-2 mr-2 font-['LINESeedKR-Bd']">
                모집 마감일
              </label>
              <input
                className="text-center px-1"
                type="date"
                id="date_ed"
                {...register('date_end', {
                  required: true,
                })}
              />
            </div>

            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="address" className="font-['LINESeedKR-Bd'] mr-2">
                장소
              </label>
              <input
                className="placeholder:text-center outline-none w-2/4 text-center"
                value={daumAddress}
                type="text"
                id="address"
                readOnly
                {...register('address', {
                  required: true,
                })}
                placeholder="주소를 확인하세요"
              />
              <button onClick={onClickAddr} className="bg-brand_4 px-2 ml-2 rounded-xl hover:bg-brand_3">
                주소 검색하기
              </button>
            </div>

            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="time" className="font-['LINESeedKR-Bd'] mr-2">
                모임 및 이벤트 집합 시간
              </label>
              <input
                className="text-center outline-none px-1"
                type="time"
                id="time"
                {...register('time', {
                  required: true,
                })}
              />
            </div>

            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="personnel" className="font-['LINESeedKR-Bd'] mr-2">
                모집 인원
              </label>
              <input
                className="text-center"
                type="number"
                id="personnel"
                placeholder="인원수를 지정해주세요"
                {...register('personnel', {
                  required: true,
                })}
              />
              <span className="ml-2">명</span>
            </div>

            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="pay" className="font-['LINESeedKR-Bd'] mr-2">
                참가 비용
              </label>
              <input
                className="text-center"
                type="number"
                placeholder="금액을 적어주세요"
                id="pay"
                {...register('pay', {
                  required: true,
                })}
              />
              <span className="ml-2">원</span>
            </div>

            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="target" className="font-['LINESeedKR-Bd'] mr-2">
                참가 제한
              </label>
              <select
                id="target"
                {...register('target', {
                  required: true,
                })}
              >
                <option value="no_restrinctions">제한없음</option>
                <option value="adult">성인</option>
                <option value="minor">미성년자</option>
              </select>
            </div>

            <div className="flex justify-center items-center p-2 border-2 dark:bg-gray-300 dark:border-none">
              <label htmlFor="method" className="font-['LINESeedKR-Bd'] mr-2">
                참가 방법
              </label>
              <select
                id="method"
                {...register('method', {
                  required: true,
                })}
              >
                <option value="first_come">선착순</option>
                <option value="orgainzer_selection">선별 모집</option>
              </select>
            </div>
          </div>
        </div>

        {/* 중단바 (이미지 3장) */}
        <h3 className="flex mt-5 items-center space-x-2 dark:text-white">
          <CiImageOn />
          <span>관련 이미지를 등록하여 흥미를 높이세요. ( 필수사항 X )</span>
        </h3>
        <div className="flex space-x-5 mt-5">
          <div className="border-2 w-1/3 h-96">
            <input type="file" />
          </div>
          <div className="border-2 w-1/3 h-96">
            <input type="file" />
          </div>
          <div className="border-2 w-1/3 h-96">
            <input type="file" />
          </div>
        </div>

        {/* 하단바 (내용 작성) */}
        <h3 className="flex mt-5 items-center space-x-2 dark:text-white">
          <CiPen />
          <span>주최하는 모임 및 이벤트 내용에 대해 설명해주세요.</span>
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </h3>
        <div className="border-2 mt-5 p-3 dark:bg-white dark:border-none">
          <textarea
            className="w-full outline-none min-h-40"
            id="content"
            placeholder="내용을 입력해주세요."
            {...register('content', {
              required: true,
              minLength: { value: 20, message: '최소 20글자 이상 설명해주세요.' },
            })}
          />
        </div>

        {/* 하단바 (지도맵) */}
        <h3 className="flex mt-5 items-center space-x-2 dark:text-white">
          <FiMapPin />
          <span>주소 검색으로 등록된 맵입니다.</span>
        </h3>

        {daumAddress && <KakaoMap coords={coords} />}

        <div className="flex-col bg-brand_4 items-center justify-center space-y-3 mt-5 p-5  rounded-3xl">
          <h3 className="text-center">주소 : {daumAddress}</h3>
          <div className="flex justify-center">
            <input
              type="text"
              className="w-3/4 rounded-2xl border-2 text-center p-2"
              placeholder="찾아오기 쉽게 상세주소를 더 작성해주세요."
              {...register('address_detail', {
                required: true,
              })}
            />
          </div>
        </div>

        {/* 최하단바 (등록버튼) */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full mt-10 rounded-full text-center p-3 bg-brand_2 font-['LINESeedKR-Bd'] text-white text-xl hover:bg-brand_1"
        >
          게시하기
        </button>
      </form>
    </main>
  );
}
