import type { WithChildren } from "@repo/ui/index";

export default async function OAuthCallbackLayout({ children }: WithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center h-14 px-4 bg-white">
        <h1 className="text-lg font-medium">디저비</h1>
      </header>
      {children}
    </div>
  );
}