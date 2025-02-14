import type { WithChildren } from "@repo/ui/index";
import { recipeKorea } from "@/app/fonts";
import { cn } from "@repo/ui/lib/utils";
import BackButton from "./_components/BackButton";

export default async function SignLayout({ children }: WithChildren) {
  return (
    <div className="min-h-screen bg-white px-4">
      <header className="flex items-center text-center h-14">
        <BackButton />
        <h1 className={cn(recipeKorea.className, "text-lg mt-2 font-medium")}>디저비</h1>
      </header>
      {children}
    </div>
  );
}
