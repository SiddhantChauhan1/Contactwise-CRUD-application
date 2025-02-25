"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Post } from "../interface/post";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

export default function PostForm({
  initialValues,
  onSubmit,
  isLoading,
}: {
  initialValues?: Partial<Post>;
  onSubmit: (values: z.infer<typeof schema>) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          {...register("title")}
          className="input input-bordered"
          placeholder="Post title"
        />
        {errors.title && (
          <span className="text-error">{errors.title.message}</span>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Body</span>
        </label>
        <textarea
          {...register("body")}
          className="textarea textarea-bordered h-24"
          placeholder="Post content"
        />
        {errors.body && (
          <span className="text-error">{errors.body.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
      >
        {isLoading ? <span className="loading loading-dots loading-sm"></span> : "Submit"}
      </button>
    </form>
  );
}