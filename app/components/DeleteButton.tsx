"use client";

import { useState } from "react";

export default function DeleteButton({
  onConfirm,
  isLoading,
}: {
  onConfirm: () => void;
  isLoading: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        className="btn btn-error"
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </button>

      <dialog open={showConfirm} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this post?</p>
          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-dots loading-sm"></span> : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}