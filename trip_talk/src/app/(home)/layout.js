import Banner from '@/components/banner/banner';

export default function HomeLayout({ children }) {
  return (
    <div>
      <Banner />
      {children}
    </div>
  );
}
