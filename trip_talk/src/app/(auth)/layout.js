import "./layout.css";

export default function LoginLayout({ children }) {
    return (
        <div className="login_container">
            <div className="login_form_wrapper">
                {children}
            </div>
            <div className="login_banner_wrapper"></div>
        </div>
    );
}