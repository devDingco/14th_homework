"use client";
import "./searchBar.css";
import "../../global.css";
import { useRef, useState } from "react";
import Icon from "@utils/iconColor";
export default function SearchBarMenu({ title, filtersEnabled = false, defaultFilter = "available", postButtonLabel = "트립토크 등록" }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
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
      {title && (
        <div className="searchbar-header">
          <h1 className="b_28_36">{title}</h1>
          {filtersEnabled && (
            <div className="filter_pills">
              <button
                type="button"
                className={`filter_pill sb_14_20 ${activeFilter === "available" ? "active" : ""}`}
                onClick={() => setActiveFilter("available")}
              >
                예약 가능 숙소
              </button>
              <button
                type="button"
                className={`filter_pill sb_14_20 ${activeFilter === "soldout" ? "active" : ""}`}
                onClick={() => setActiveFilter("soldout")}
              >
                예약 마감 숙소
              </button>
            </div>
          )}
        </div>
      )}

      <div className="searchbar-with-calender-container">
   
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

        <div className="searchbar-container">
        <Icon outline search default className="search_icon"/>
          <input className="r_16_24" type="text" placeholder="검색어를 입력해주세요." />
        </div>
          <button type="button" className="search-button sb_18_24">검색</button>
        <button type="button" className="post-button sb_18_24">
            <Icon outline write white className="write_icon" />
            {postButtonLabel}
          </button>
      </div>

    </div>
  );
}