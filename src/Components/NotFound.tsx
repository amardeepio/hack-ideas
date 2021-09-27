import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const PageNotFound: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="layout text-center">
        <div className="display-1">4O4</div>
        <div>Page Not Found</div>
      </div>
      <Footer />
    </div>
  );
};
