"use client";
import "./headComponent.css";
import "../../../global.css";
import { useRef, useState } from "react";
import Icon from "@utils/iconColor";
export default function HeadComponent() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);


  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    const yyyy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}. ${mm}. ${dd}.`;
  };

  const openPicker = () => {
    if (!startDate) {
      startInputRef.current?.showPicker?.();
      return;
    }
    endInputRef.current?.showPicker?.();
  };

  const handleStartChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setEndDate("");
    setTimeout(() => endInputRef.current?.showPicker?.(), 0);
  };
  return (
    <div className="head_component_container">
      <div className="searchbar-with-calender-container">
        <div className="searchbar-container">
        <Icon outline search default className="search_icon"/>
          <input className="r_16_24" type="text" placeholder="검색어를 입력해주세요." />
        </div>
        <div className="calender-container">
          <Icon outline calendar default className="calendar_icon" />
          <button type="button" className={`date-range-display r_16_24 ${startDate && endDate ? "has-value" : ""}`} onClick={openPicker}>
            {startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : "YYYY. MM. DD - YYYY. MM. DD"}
          </button>
          <input
            ref={startInputRef}
            className="hidden-date-input"
            type="date"
            value={startDate}
            onChange={handleStartChange}
            max={endDate || undefined}
          />
          <input
            ref={endInputRef}
            className="hidden-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />
        </div>
        
          <button type="button" className="search-button sb_18_24">검색</button>
      </div>
        

          <button type="button" className="post-button sb_18_24">
            <Icon outline write white className="write_icon" />
            트립토크 등록
          </button>
    </div>
  );
}