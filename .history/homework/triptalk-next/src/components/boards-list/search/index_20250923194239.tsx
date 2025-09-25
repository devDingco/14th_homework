/**
 *  검색 컴포넌트 (Search Component)
 *
 * 📝 주요 개념:
 * 1. Props 전달: 부모에서 자식으로 함수와 데이터 전달
 * 2. Debounce: 연속 입력 방지 기법
 * 3. 상태 끌어올리기: 자식의 상태를 부모로 전달
 * 4. GraphQL refetch: 조건 변경 후 데이터 다시 가져오기
 */
'use client';

//  import 구문 (어떤 라이브러리에서 어떤 기능을 가져오는지)
import { useRouter } from 'next/navigation'; // Next.js 페이지 이동
import { ChangeEvent } from 'react'; // React 이벤트 타입
import _ from 'lodash'; // 유틸리티 라이브러리 (debounce 사용)
import { DatePicker } from 'antd'; // Ant Design UI 컴포넌트
import type { DatePickerProps } from 'antd'; // TypeScript 타입

//  interface 정의 (TypeScript 타입 정의)
interface SearchProps {
  refetch: any; // GraphQL 쿼리 다시 실행 함수
  onKeywordChange: (keyword: string) => void; // 검색어를 부모로 전달하는 함수
}

//  함수형 컴포넌트 구조
export default function Search({ refetch, onKeywordChange }: SearchProps) {
  //  useRouter 훅 사용법
  const router = useRouter();

  //  lodash debounce 사용법 (중요!)
  // debounce = 연속된 입력을 방지하는 기법
  // 500ms 동안 추가 입력이 없으면 함수 실행
  const getDebounce = _.debounce((value) => {
    //  GraphQL refetch 사용법
    refetch({
      search: value, // 검색어로 필터링
      page: 1, // 검색 시 첫 페이지로 이동
    });
    //  상태 끌어올리기 (중요!)
    // 자식 컴포넌트의 데이터를 부모로 전달
    onKeywordChange(value);
  }, 500);

  // 이벤트 핸들러 함수
  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    //  debounce 함수 호출
    getDebounce(event.target.value);
  };

  //  페이지 이동 함수
  const onClickEdit = () => {
    router.push('/boards/new'); // 새 게시글 작성 페이지로 이동
  };

  //  Ant Design DatePicker 이벤트 핸들러
  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString); // 선택된 날짜 콘솔 출력
  };

  // JSX 리턴 및 이벤트 바인딩
  return (
    <div>
      {/*  Ant Design DatePicker 컴포넌트 사용법 */}
      <DatePicker
        onChange={onDateChange} // 날짜 선택 시 실행될 함수
        placeholder="날짜 선택" // input에 나타날 기본 텍스트
      />

      {/*  검색어 입력 input - debounce 적용 */}
      <input
        type="text" // HTML input 타입 지정
        onChange={onChangeKeyword} // 입력값 변경 시 실행될 함수 (중요!)
        placeholder="제목을 검색해 주세요." // 기본 텍스트
      />

      {/* 버튼 클릭 이벤트 - 페이지 이동 */}
      <button onClick={onClickEdit}>
        {' '}
        {/* 클릭 시 실행될 함수 */}
        트립토크 등록
      </button>
    </div>
  );
}
