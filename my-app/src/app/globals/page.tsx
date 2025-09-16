import React from "react";
import Head from "next/head";

const LayoutStructure = () => {
  return (
    <>
      <Head>
        <title>레이아웃 구조</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
          }
          
          body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #f5f5f5;
          }
          
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          
          .header {
            background: #3498db;
            color: white;
            padding: 20px;
            text-align: center;
            font-weight: bold;
            font-size: 1.5rem;
          }
          
          .banner {
            background: #2ecc71;
            color: white;
            padding: 30px;
            text-align: center;
            font-size: 1.2rem;
          }
          
          .nav {
            background: #e74c3c;
            color: white;
            padding: 15px;
            text-align: center;
          }
          
          .main-content {
            display: flex;
            flex: 1;
          }
          
          .sidebar {
            background: #9b59b6;
            color: white;
            padding: 20px;
            width: 200px;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .body-area {
            background: #f1c40f;
            color: #333;
            padding: 20px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }
          
          .footer {
            background: #34495e;
            color: white;
            padding: 20px;
            text-align: center;
          }
        `}</style>
      </Head>

      <div className="container">
        <header className="header">페티영역 (Header)</header>
        <div className="banner">배너영역 (Banner)</div>
        <nav className="nav">네비게이션 영역 (Navigation)</nav>

        <main className="main-content">
          <aside className="sidebar">사이드바 영역 (Sidebar)</aside>
          <section className="body-area">바디 영역 (Body)</section>
        </main>

        <footer className="footer">푸터영역 (Footer)</footer>
      </div>
    </>
  );
};

export default LayoutStructure;
