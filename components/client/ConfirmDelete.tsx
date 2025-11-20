/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { deleteDepartment } from "@/app/(dashboard)/admin/actions/delete";

type Props = {
  title?: string;
  message?: string;
  busyText?: string;
  id: string;
  module: string;
};

export default function ConfirmDelete({
  title = "Delete item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  busyText = "Deleting...",
  id,
  module,
}: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      switch (module) {
        case "department":
          await deleteDepartment(id);
          break;
        // case "doctor":
        //   await deleteDoctor(id);
        //   break;
        default:
          break;
      }
      toast.success("Deleted successfully");
      setOpen(false);
    } catch (error: any) {
      if (error.code === "P2025") {
        toast.error("The item is not found or has been deleted");
      } else {
        toast.error(
          "Deleting failed, check your internet connection and retry!"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 🔴 Trigger (icon + text instead of button) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center text-center hover:cursor-pointer gap-1 text-red-600 hover:text-red-800"
      >
        <Trash2 size={16} />
        Delete
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={submitting}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-70"
              >
                {submitting ? busyText : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}