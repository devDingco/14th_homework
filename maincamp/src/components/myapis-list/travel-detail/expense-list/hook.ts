"use client";

import { supabase } from "@/commons/libraries/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useTravelDetailExpense({ travel_id }) {
  const [expenses, setExpenses] = useState<TravelExpense[]>([]);
  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from("travel_expense")
      .select("*")
      .eq("travel_id", travel_id)
      .is("delete_at", null) // 소프트 삭제 제외
      .order("date", { ascending: true })
      .order("created_at", { ascending: true });

    if (!error) {
      setExpenses(data ?? []);
    }
  };
  return { expenses, setExpenses, fetchExpenses };
}
