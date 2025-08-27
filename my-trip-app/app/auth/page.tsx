"use client";

import { useState } from "react";
import SignIn from "./(signin)/index";
import SignUp from "./(signup)/index";
import Image from "next/image";


export default function Auth() {
  const [mode, setMode] = useState("signin");

  return (
    <div style={styles.layout}>
      <div style={styles.left_panel}>
        {mode === "signup" ? (
          <SignUp embedded onClickSignin={() => setMode("signin")} />
        ) : (
          <SignIn embedded onClickSignup={() => setMode("signup")} />
        )}
      </div>
      <Image
        src="/images/desktop/login.png"
        alt="auth_right_visual"
        width={1520}
        height={1080}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}



const styles = {
  layout: {
    width: "192rem",
    height: "108rem",
    display: "grid",
    gridTemplateColumns: "40rem 1fr",
    margin: "0 auto",
    overflow: "hidden",
  },

  left_panel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
};

