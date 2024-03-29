import * as React from "react";

export const Button = () => {
  return (
    <div className="rounded-md ">
      <a href="https://development-guidelines.vercel.app/">
        <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-black no-underline hover:bg-gray-300 md:px-10 md:py-3 md:text-lg md:leading-6">
          Read the development guidelines
          <span className="from-brandred to-brandblue ml-2 bg-gradient-to-r bg-clip-text text-transparent">
            →
          </span>
        </div>
      </a>
    </div>
  );
};
