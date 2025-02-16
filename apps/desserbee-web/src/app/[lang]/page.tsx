import { NavigationLanguageGroup, NavigationPathname } from "@repo/entity/src/navigation";
import { redirect } from "next/navigation";

export default async function RootPage() {
  redirect(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
}
