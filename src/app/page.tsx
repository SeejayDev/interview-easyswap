import { Suspense } from "react";
import HomeSwapForm from "./HomeSwapForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-100 text-black font-sans">
      <main className="w-full max-w-lg py-16 px-4">
        <h1 className="text-center font-semibold text-3xl">
          Swap between Currencies
        </h1>

        <Suspense>
          <HomeSwapForm />
        </Suspense>
      </main>
    </div>
  );
}
