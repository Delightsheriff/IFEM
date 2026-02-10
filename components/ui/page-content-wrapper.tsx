import React from "react";

export default function PageContentWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto w-full px-4 py-6 md:py-12 md:px-6">
      {children}
    </section>
  );
}
