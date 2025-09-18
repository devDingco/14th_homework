"use client";

import { usePrefetchProducts } from '../hooks/usePrefetch';

export default function PrefetchProvider({ children }: { children: React.ReactNode }) {
  usePrefetchProducts();
  return <>{children}</>;
}
