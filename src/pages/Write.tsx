import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { CiPen, CiImageOn, CiCircleInfo } from 'react-icons/ci';

interface IForm {
  title: string;
  kind: string;
  like: number;
  date: string[];
  personnel: number;
  address: string;
  location: string;
  writer: string;
  pay: number;
  method: string;
  target: string;
  end: string;
  title_img: string;
  sub_img: string[];
  content: string;
}

export default function Write() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IForm>({ mode: 'onChange' });

  return (
    <main className="py-10 font-['TAEBAEKmilkyway']">
      <form>
        <div className="flex justify-around border border-brand_1 mb-5">
          <label className="py-3 font-['LINESeedKR-Bd']" htmlFor="title">
            제목
          </label>
          <input
            className="w-2/4 placeholder:text-center p-3 outline-none"
            type="text"
            {...register('title', {
              required: true,
              minLength: { value: 10, message: '제목은 최소 10글자 이상 작성해주세요.' },
              maxLength: { value: 40, message: '40글자 이내로 작성해주세요.' },
            })}
            placeholder="제목을 입력하세요"
            name="title"
          />
          <div className="flex space-x-5 items-center">
            <label className="font-['LINESeedKR-Bd']" htmlFor="kind">
              분류를 골라주세요
            </label>
            <select className="outline-none bg-brand_3 p-1 rounded-xl" name="kind" id="kind">
              <option value="meeting">모임</option>
              <option value="event">이벤트</option>
            </select>
          </div>
        </div>

        <h3 className="flex mt-5 items-center space-x-2">
          <CiCircleInfo />
          <span>대표로 노출되는 썸네일 이미지와 설정을 입력해주세요.</span>
        </h3>

        <div className="flex justify-between space-x-5 mt-5">
          <div className="border-2 w-1/2 h-96 ">
            <input type="file" />
          </div>

          <div className="flex-col content-center space-y-3 border-2 w-1/2 h-96 ">
            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="date_st" className="mr-2 font-['LINESeedKR-Bd']">
                모집 시작일
              </label>
              <input type="date" name="date_st" id="date_st" />
              <label htmlFor="date_ed" className="mr-2 font-['LINESeedKR-Bd']">
                모집 마감일
              </label>
              <input type="date" name="date_ed" id="date_ed" />
            </div>

            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="address" className="font-['LINESeedKR-Bd'] mr-2">
                장소
              </label>
              <input
                className="placeholder:text-center outline-none"
                type="text"
                name="address"
                id="address"
                readOnly
                placeholder="주소를 확인하세요"
              />
              <button className="bg-brand_4 px-2 rounded-xl">주소 검색하기</button>
            </div>

            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="time" className="font-['LINESeedKR-Bd'] mr-2">
                모임 및 이벤트 집합 시간
              </label>
              <input className="text-center outline-none" type="time" name="time" id="time" />
            </div>

            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="personnel" className="font-['LINESeedKR-Bd'] mr-2">
                모집 인원
              </label>
              <input
                className="text-center"
                type="number"
                name="personnel"
                id="personnel"
                placeholder="인원수를 지정해주세요"
              />
              <span>명</span>
            </div>

            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="pay" className="font-['LINESeedKR-Bd'] mr-2">
                참가 비용
              </label>
              <input className="text-center" type="number" placeholder="금액을 적어주세요" />
              <span>원</span>
            </div>

            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="target" className="font-['LINESeedKR-Bd'] mr-2">
                참가 제한
              </label>
              <select name="target" id="target">
                <option value="restrinctions">제한없음</option>
                <option value="adult">성인</option>
                <option value="minor">미성년자</option>
              </select>
            </div>

            <div className="flex justify-center items-center p-2 border-2">
              <label htmlFor="method" className="font-['LINESeedKR-Bd'] mr-2">
                참가 방법
              </label>
              <select name="method" id="method">
                <option value="first_come">선착순</option>
                <option value="orgainzer_selection">선별 모집</option>
              </select>
            </div>
          </div>
        </div>

        <h3 className="flex mt-5 items-center space-x-2">
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

        <h3 className="flex mt-5 items-center space-x-2">
          <CiPen />
          <span>주최하는 모임 및 이벤트 내용에 대해 설명해주세요.</span>
        </h3>
        <div className="border-2 mt-5 p-3 border-brand_3">
          <textarea
            className="w-full outline-none min-h-40"
            name="content"
            id="content"
            placeholder="내용을 입력해주세요."
          />
        </div>

        <h3 className="flex mt-5 items-center space-x-2">
          <FiMapPin />
          <span>주소 검색으로 등록된 맵입니다.</span>
        </h3>
        <div className="border-2 mt-5 p-3 h-40 border-brand_3">
          <p>지도맵을 이곳에 띄워야한다.</p>
        </div>

        <button className="w-full mt-5 text-center p-3 bg-brand_2 font-['LINESeedKR-Bd'] text-white text-xl hover:bg-brand_1">
          게시하기
        </button>
      </form>
    </main>
  );
}
