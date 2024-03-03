import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { CreatePost } from "app/app/_components/create-post";
import { getServerAuthSession } from "app/server/auth";
import { api } from "app/trpc/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIQ",
  description: "really really really smart notes",
};

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  // const file = await api.post.uploadFile.query({
  //   file: new File(["hello"], "hello.txt"),
  // });

  return (
    <main className=" min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Home page or whatever</h1>
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  console.log({ session });
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
