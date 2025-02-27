"use client";

import { useState } from "react";
import { Post } from "../interface/post";
import PostForm from "./PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";

export default function EditModal({ post }: { post: Post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updatedPost: Post) => {
      // Check if the post is from JSONPlaceholder
      if (post.id <= 100) {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(updatedPost),
        }).then((res) => res.json());
      } else {
        // Else: Local post => just return updated data
        return updatedPost;
      }
    },
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      if (previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], (old) =>
          old?.map((p) => (p.id === post.id ? { ...p, ...updatedPost } : p))
        );
      }

      return { previousPosts };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old?.map((p) => (p.id === post.id ? { ...p, ...data } : p))
      );

      setIsOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
  });

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Edit
      </button>

      {showToast &&
        createPortal(
          <div className="toast toast-bottom toast-end z-[9999] mb-4 mr-4">
            <div className="alert alert-success">
              <span>Post updated successfully!</span>
            </div>
          </div>,
          document.body
        )}

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Post</h3>
              <PostForm
                initialValues={post}
                onSubmit={(values) => {
                  const updatedPost: Post = {
                    id: post.id,
                    userId: post.userId,
                    title: values.title,
                    body: values.body,
                  };
                  updateMutation.mutate(updatedPost);
                }}
                isLoading={updateMutation.isPending}
              />
              <div className="modal-action">
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