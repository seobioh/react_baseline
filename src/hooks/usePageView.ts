import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

function usePageView() {
  const location = useLocation();

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "pageview",
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}

export { usePageView };