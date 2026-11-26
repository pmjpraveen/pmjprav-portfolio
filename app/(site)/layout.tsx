import type { ReactNode } from "react";
import { HomeSidebar } from "../components/home/HomeSidebar";
import { ScrollReset } from "../components/home/ScrollReset";

/** Every main page shares the left column; only the right column changes. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[calc(1000px+2*var(--page-gutter))] flex-1 gap-y-16 px-[var(--page-gutter)] lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:gap-x-12">
      <ScrollReset />
      <HomeSidebar />
      <main className="pb-24 lg:pt-[7.5rem]">{children}</main>
    </div>
  );
}
