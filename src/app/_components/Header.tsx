import Link from "next/link";
import SearchBar from "./SearchBar";
import { getServerAuthSession } from "app/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();
  return (
    <div className="sticky top-0 flex h-4 w-full items-center gap-8 bg-[#2e026d] px-4 py-12 text-white">
      <div className="sticky top-0 mr-auto flex h-4 flex-none items-center gap-7 ">
        <h1 className="text-4xl font-bold">AIQ</h1>
        <p>Tools</p>
        <p>Your Library</p>
      </div>
      <SearchBar className="flex-3" />
      <div className="flex flex-none gap-4">
        <Link
          href="/notes/upload"
          className="hidden content-center items-center rounded-md border-2 border-inherit p-2 lg:flex"
        >
          <p>Generate</p>
        </Link>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
