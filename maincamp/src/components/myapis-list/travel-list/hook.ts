import { supabase } from "@/commons/libraries/supabase";
import { useState } from "react";

export default function useTravelList() {
  const [travels, setTravels] = useState<any[]>([]);

  const fetchTravels = async () => {
    const { data, error } = await supabase.from("travel_list").select("*");
    if (error) return;
    setTravels(data ?? []);
  };

  return { travels };
}
