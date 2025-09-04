import { profile_g } from '@/assets/icons/icons';
import asdasdsa from '@/assets/images/triptalk/Tranquil_Shores_Serenity_in_Sand_and_Sea.jpg';
import Image from 'next/image';

export default function HotBoard() {
  return (
    <div className='inline-flex items-center justify-start gap-4 self-stretch'>
      <div
        data-size='s'
        className='flex h-32 items-start justify-start gap-2 rounded-xl'
      >
        <div
          data-property-1='a'
          data-size='s'
          className='relative h-32 w-24 rounded'
        >
          <Image
            className='absolute left-0 top-0 h-32 w-24 rounded'
            height={128}
            width={96}
            src={asdasdsa}
            alt='triptalk'
          />
        </div>
        <div className='inline-flex w-44 flex-col items-end justify-between self-stretch'>
          <div className='flex flex-col items-start justify-start gap-2 self-stretch'>
            <div className="justify-start self-stretch font-['Pretendard_Variable'] text-sm font-semibold leading-tight text-gray-900">
              트립토크 게시글 제목이 들어갑니다.
            </div>
            <div
              data-arrow='false'
              data-show-name='true'
              data-size='m'
              className='inline-flex items-center justify-start gap-1'
            >
              <div data-property-1='g' className='relative h-6 w-6'>
                <Image
                  width={6}
                  height={6}
                  className='absolute left-0 top-0 h-6 w-6 rounded-full'
                  src={profile_g}
                  alt='profile'
                />
              </div>
              <div className="justify-start font-['Pretendard_Variable'] text-sm font-light leading-tight text-gray-700">
                홍길동
              </div>
            </div>
          </div>
          <div className='inline-flex items-center justify-between self-stretch'>
            <div className='flex items-center justify-start gap-1'>
              <div className='relative h-6 w-6 overflow-hidden'>
                <div className='bg-red absolute left-[2.50px] top-[3.15px] h-4 w-5' />
              </div>
              <div className="text-red justify-start font-['Pretendard_Variable'] text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="justify-start font-['Pretendard_Variable'] text-sm font-normal leading-tight text-gray-600">
              2024.11.11
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
