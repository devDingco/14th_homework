"use client";

import { supabase } from "@/commons/libraries/supabase";
import Button from "@/components/ui/button/Button";
import useTravelList from "./hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TravelList() {
  const router = useRouter();
  const [travels, setTravels] = useState<any[]>([]);

  const fetchTravels = async () => {
    const { data, error } = await supabase.from("travel_list").select("*");
    if (error) return;
    setTravels(data ?? []);
  };

  fetchTravels();

  const onClickTravel = (event: React.MouseEvent<HTMLDivElement>) => {
    const travelId = event.currentTarget.id;
    router.push(`/myapis/${travelId}`);
  };

  return (
    <>
      {travels?.map((el, index) => {
        return (
          <div
            id={el.travel_id}
            key={el.travel_id}
            style={{ width: "600px", margin: "16px", border: "1px solid gray" }}
            onClick={onClickTravel}
          >
            <div>{el.destination}</div>
            <div>{el.title}</div>
            <div>{el.startDate}</div>
            <div>{el.endDate}</div>
          </div>
        );
      })}
    </>
  );
}
