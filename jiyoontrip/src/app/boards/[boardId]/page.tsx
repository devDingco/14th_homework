"use client";

import CommentWriteComponent from "@/app/components/boards-detail/conmment-write";
import DetailPageComponent from "@/app/components/boards-detail/detail";

// import { ChangeEvent, useState } from "react";

export default function DetailPage() {
  return (
    <>
      <DetailPageComponent />
      <CommentWriteComponent />
    </>
  );
}
