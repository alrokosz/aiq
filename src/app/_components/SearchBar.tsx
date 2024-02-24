"use client";

import { useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const [searchVale, setSearchVale] = useState("");
  return (
    <div className=" flex grow items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchVale("");
        }}
        className=" w-full"
      >
        <label className="sr-only" htmlFor="header-search-bar">
          Search the site
        </label>
        <input
          onChange={(e) => setSearchVale(e.target.value)}
          value={searchVale}
          id="header-search-bar"
          type="text"
          placeholder="Search"
          className="block h-12 w-full rounded-full border-2 border-purple-300 px-4 text-purple-600 placeholder-purple-400 caret-purple-600 outline-none ring-purple-600 focus:border-purple-600 focus:ring-4"
        />
      </form>
    </div>
  );
}
