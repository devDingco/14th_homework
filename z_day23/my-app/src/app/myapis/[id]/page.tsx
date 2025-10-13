"use client";

import ContentDetail from "@/components/myapis-list/detail";

export default function ContentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ContentDetail id={params.id} />;
}
