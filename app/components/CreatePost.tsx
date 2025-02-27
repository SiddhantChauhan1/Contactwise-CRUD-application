"use client";

import { useState } from "react";
import PostForm from "./PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../interface/post";
import { createPortal } from "react-dom";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newPost: { title: string; body: string }) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json()),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      if (previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], (old) => [
          {
            ...newPost,
            id: Date.now(),
            userId: 1,
          } as Post,
          ...(old || []),
        ]);
      }

      return { previousPosts };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old?.map((p) => (p.id === Date.now() ? { ...p, id: data.id } : p))
      );
      setIsOpen(false);
      setShowToast(true);
      
      setTimeout(() => setShowToast(false), 3000);
    },
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
  });

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Create Post
      </button>
      
      {showToast &&
        createPortal(
          <div className="toast toast-top toast-end z-[9999]">
            <div className="alert alert-success">
              <span>Post created successfully!</span>
            </div>
          </div>,
          document.body
        )}
      
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Create New Post</h3>
              <PostForm
                onSubmit={(values) => createMutation.mutate(values)}
                isLoading={createMutation.isPending}
              />
              <div className="modal-action flex justify-end mt-4">
                <button
                  className="btn btn-outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}