import Banner from '@/widgets/banner/ui/Banner'
import AppShell from '@/widgets/layout/AppShell'
import Navbar from '@/widgets/navbar/ui/Navbar'

export default function WithBannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={<Navbar />} banner={<Banner />}>
      {children}
    </AppShell>
  )
}
