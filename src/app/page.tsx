import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { CreatePost } from "app/app/_components/create-post";
import { getServerAuthSession } from "app/server/auth";
import { api } from "app/trpc/server";
import SearchBar from "./_components/SearchBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIQ",
  description: "really really really smart notes",
};

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className=" min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="bg sticky top-0 flex h-4 w-full items-center gap-8 bg-[#2e026d] px-4 py-12">
        <div className="sticky top-0 mr-auto flex h-4 flex-none items-center gap-7 ">
          <h1 className="text-4xl font-bold">AIQ</h1>
          <p>Tools</p>
          <p>Your Library</p>
        </div>
        <SearchBar className="flex-3" />
        <div className="flex flex-none gap-4">
          <div className="hidden content-center items-center rounded-md border-2 border-inherit p-2 lg:flex">
            <p>Generate</p>
          </div>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
