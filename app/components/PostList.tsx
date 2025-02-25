"use client";

import { useQuery } from "@tanstack/react-query";
import { Post } from "../interface/post";
import PostItem from "./PostItem";

export default function PostList({ searchQuery }: { searchQuery: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <span className="loading loading-dots loading-md"></span>;
  if (isError) return <div>Error fetching posts</div>;

  const filteredPosts = data.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid gap-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post: Post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="text-center text-gray-400">No matching posts found</p>
      )}
    </div>
  );
}
