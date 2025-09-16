import AppShell from '@/widgets/layout/AppShell'
import Navbar from '@/widgets/navbar/ui/Navbar'

export default function WithoutBannerLayout({ children }: { children: React.ReactNode }) {
  return <AppShell header={<Navbar />}>{children}</AppShell>
}
