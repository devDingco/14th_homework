'use client';

import { useState } from 'react';
import './DateRangeInput.css';

interface DateRangeInputProps {
  startDate?: string;
  endDate?: string;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DateRangeInput({
  startDate = '',
  endDate = '',
  onDateRangeChange,
  placeholder = 'YYYY.MM.DD - YYYY.MM.DD',
  className = '',
}: DateRangeInputProps) {
  const [internalStartDate, setInternalStartDate] = useState(startDate);
  const [internalEndDate, setInternalEndDate] = useState(endDate);

  // 외부에서 전달된 값이 있으면 그것을 사용, 없으면 내부 상태 사용
  const currentStartDate = startDate || internalStartDate;
  const currentEndDate = endDate || internalEndDate;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    // 날짜가 실제로 선택되지 않았으면 무시
    if (!selectedDate) return;

    if (!currentStartDate || (currentStartDate && currentEndDate)) {
      // 시작일 선택 (처음이거나 이미 완료된 상태에서 새로 시작)
      const newStartDate = selectedDate;
      const newEndDate = '';

      setInternalStartDate(newStartDate);
      setInternalEndDate(newEndDate);
      onDateRangeChange?.(newStartDate, newEndDate);

      // 시작일 선택 후 달력을 다시 열기
      setTimeout(() => {
        const input = e.target;
        input.value = '';
        input.blur();
        setTimeout(() => {
          handleDateInputClick();
        }, 50);
      }, 100);
    } else {
      // 종료일 선택 (시작일이 있고 종료일이 없는 상태)
      const startDateObj = new Date(currentStartDate);
      const selectedDateObj = new Date(selectedDate);

      if (selectedDateObj >= startDateObj) {
        const newEndDate = selectedDate;
        setInternalEndDate(newEndDate);
        onDateRangeChange?.(currentStartDate, newEndDate);
      } else {
        // 종료일이 시작일보다 이전이면, 새로운 시작일로 설정
        const newStartDate = selectedDate;
        const newEndDate = '';

        setInternalStartDate(newStartDate);
        setInternalEndDate(newEndDate);
        onDateRangeChange?.(newStartDate, newEndDate);

        // 다음 날짜 선택을 위해 달력 다시 열기
        setTimeout(() => {
          const input = e.target;
          input.value = '';
          input.blur();
          setTimeout(() => {
            handleDateInputClick();
          }, 50);
        }, 100);
      }
    }
  };

  const handleDateInputClick = () => {
    // 달력 강제로 열기
    const input = document.querySelector('.date_range_input') as HTMLInputElement;
    if (input) {
      input.focus();
      input.click();
      // showPicker가 지원되는 브라우저에서는 사용
      if ('showPicker' in input) {
        try {
          (input as any).showPicker();
        } catch (e) {
          // showPicker 실패 시 무시
        }
      }
    }
  };

  const resetDateSelection = () => {
    setInternalStartDate('');
    setInternalEndDate('');
    onDateRangeChange?.('', '');
  };

  // 표시할 placeholder 텍스트 결정
  const getPlaceholderText = () => {
    if (!currentStartDate) {
      return placeholder;
    } else if (!currentEndDate) {
      return `${currentStartDate} - YYYY.MM.DD`;
    } else {
      return `${currentStartDate} - ${currentEndDate}`;
    }
  };

  return (
    <div className={`date_range_selector ${className}`} onClick={handleDateInputClick}>
      <input
        type="date"
        className="date_range_input"
        value=""
        onChange={handleDateChange}
        title={getPlaceholderText()}
      />
      <div className="date_range_display">{getPlaceholderText()}</div>
      {(currentStartDate || currentEndDate) && (
        <button
          className="date_range_reset"
          onClick={(e) => {
            e.stopPropagation(); // 부모 클릭 이벤트 방지
            resetDateSelection();
          }}
          title="날짜 선택 초기화"
        >
          ✕
        </button>
      )}
    </div>
  );
}
