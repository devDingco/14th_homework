import "./global.css";
import "./components/header/header.css";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/404-salgu.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="b_28_36" style={{ color: "black" }}>
        404 - 안돼 돌아가
      </h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
