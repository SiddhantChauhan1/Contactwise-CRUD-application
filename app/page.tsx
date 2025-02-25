"use client";

import { useState } from "react";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="container mx-auto p-4">
      <div className="sticky top-0 z-10 py-4 bg-black/90 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Posts</h1>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <label className="btn btn-circle swap swap-rotate">
              <input 
                type="checkbox" 
                checked={menuOpen} 
                onChange={() => setMenuOpen(!menuOpen)} 
              />
              {/* Hamburger Icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* Close Icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>

          {/* Desktop Search and Button */}
          <div className="hidden md:flex items-center gap-4">
            <label className="input input-bordered flex items-center gap-2 px-3 py-2 rounded-lg outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow outline-none bg-transparent placeholder-gray-500"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>

            <CreatePost />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 p-4 bg-gray-800 rounded-lg flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2 px-3 py-2 rounded-lg outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow outline-none bg-transparent placeholder-gray-500"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>

            <CreatePost />
          </div>
        )}
      </div>

      <div className="mt-4">
        <PostList searchQuery={searchQuery} />
      </div>
    </main>
  );
}
