"use client";

import TravelList from "@/components/myapis-list/travel-list";
import TravelWrite from "@/components/myapis-list/travel-write";
import Button from "@/components/ui/button/Button";
import { useState } from "react";

export default function MyapisPage() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button variant="FormBtn" type="button" onClick={() => setVisible(true)}>
        여행등록하기
      </Button>
      {visible && <TravelWrite setVisible={setVisible}></TravelWrite>}
      <TravelList></TravelList>
    </>
  );
}
