import { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/**
 * Marketing chrome lives here, not in the root layout — the agent portal
 * (`/agent/*`) must not inherit the Navbar/Footer and their links.
 */
export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
