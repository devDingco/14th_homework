import Banner from "./banner";
export default function HomeLayout({ children }) {
  return <div>
      <Banner />
      {children}
    </div>
}