import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import { Space8px } from "../Space";
import Divider from "../Divider";
import Body from "../Body";
import Footer from "../Footer";
import "./Layout.css";

interface LayoutProps {
  isPadding?: boolean;
  backgroundColor?: string;
}

function Layout({ isPadding = true , backgroundColor = '' }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout-container">
        <Header />
        <Navbar />
        <Space8px />
        <Divider />
        <Body 
          backgroundColor={backgroundColor && backgroundColor !== 'null' ? backgroundColor : undefined}
          style={{
            ...(!isPadding ? { padding: 0 } : {})
          }}
        >
          <Outlet />
        </Body>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;