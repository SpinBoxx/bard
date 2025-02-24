import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({ children, ...props }: Props) => {
  return (
    <div className="max-w-6xl space-y-4 mx-auto px-[min(4em,7%)] ">
      {children}
    </div>
  );
};
