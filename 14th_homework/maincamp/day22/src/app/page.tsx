"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>초기 화면</h1>
      <Link href="/boards/new" >게시글 등록</Link>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import reportWebVitals from "./reportWebVitals";
// // import { createBrowserRouter, RouterProvider } from "react-router";
// import "./index.css";
// import Page from "./boards/new/page";
// import Detail from "./boards/detail/page";

// reportWebVitals();
