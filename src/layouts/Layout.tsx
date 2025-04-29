import { ReactNode } from "react";

import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import Footer from "../components/Footer.tsx";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen min-w-fit">
      <Header />
      <Hero />
      <div className="container flex-grow px-4 sm:px-6 lg:px-8 py-10 mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
