import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/boards");
}
