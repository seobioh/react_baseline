import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import "./Layout.css";

interface LayoutProps {
  isBody?: boolean;
  isPadding?: boolean;
}

function Layout({ isPadding = true , isBody = true }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout-container">
        <Header />
        {isBody ? (
          <Body 
            style={{
              ...(!isPadding ? { padding: 0 } : {}),
            }}
          >
            <Outlet />
          </Body>
        ) : (
          <Outlet />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;