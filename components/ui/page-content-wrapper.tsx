import React from "react";

export default function PageContentWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-20 pb-8 md:pt-28 md:pb-12 md:px-6">
      {children}
    </div>
  );
}
