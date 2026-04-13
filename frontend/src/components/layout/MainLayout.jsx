import { useState } from "react";
import TopBar from "../common/TopBar";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function MainLayout({ children }) {
  const [topBarVisible, setTopBarVisible] = useState(true);

  return (
    <>
      <TopBar visible={topBarVisible} setVisible={setTopBarVisible} />
      <Navbar topBarVisible={topBarVisible} />
      <main>{children}</main>
      <Footer />
    </>
  );
}