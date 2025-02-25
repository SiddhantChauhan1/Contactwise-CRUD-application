"use client";

import { Post } from "../interface/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteButton from "./DeleteButton";
import EditModal from "./EditModal";

export default function PostItem({ post }: { post: Post }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      if (previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], (old) =>
          old?.filter((p) => p.id !== id)
        );
      }

      return { previousPosts };
    },
    onError: (err, id, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
  });

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.body}</p>
        <div className="card-actions justify-end mt-4">
          <EditModal post={post} />
          <DeleteButton
            onConfirm={async () => {
              await deleteMutation.mutateAsync(post.id);
            }}
            isLoading={deleteMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}