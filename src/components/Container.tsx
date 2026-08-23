import { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        className
          ? `mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`
          : "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8"
      }
    >
      {children}
    </div>
  );
}

