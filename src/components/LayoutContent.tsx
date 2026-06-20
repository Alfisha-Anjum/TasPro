"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <>
      {/* HEADER */}
      {isHomePage ? (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      ) : (
        <div className="hidden md:block">
          <Suspense fallback={null}>
            <Header />
          </Suspense>
        </div>
      )}

      <div className="mx-auto px-4 md:px-8 lg:px-0 py-6">{children}</div>

      {/* FOOTER */}
      {isHomePage ? (
        <Footer />
      ) : (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}
    </>
  );
}
