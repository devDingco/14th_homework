"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import _ from "lodash";
export default function SearchBar(props) {
  // const [keyword, setKeyword] = useState("");
  const getDebounce = _.debounce((value) => {
    props.refetch({
      search: value,
      page: 1,
    });
    props.setKeyword(value);
  }, 500);
  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="제목을 검색해 주세요"
      onChange={onChangeSearch}
    />
  );
}
