import { Outlet } from "react-router-dom";
import { Header2 } from "../Header";
import Divider from "../Divider";
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
        <Header2 />
        <Divider />
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