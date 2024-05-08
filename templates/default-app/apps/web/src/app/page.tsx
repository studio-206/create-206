import { Button } from "@/components/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio 206 Template",
};

export default function Home() {
  return (
    <div className="bg-zinc-900 flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-auto flex-col items-center justify-center px-4 pb-8 pt-16 sm:pt-24 lg:p-8">
        <img src="/studio206.svg" className="h-10 w-auto" />
        <h1 className="my-12 text-center text-6xl font-medium uppercase tracking-wide text-white sm:text-7xl lg:text-8xl">
          Build beautiful
          <span className="block px-2 text-brandblue">digital products</span>
        </h1>
        <div className="mt-4 max-w-xl sm:flex sm:justify-center">
          <Button />
        </div>
      </main>
    </div>
  );
}
