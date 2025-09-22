import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import { Space8px } from "../Space";
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
        <Header />
        <Navbar />
        <Space8px />
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