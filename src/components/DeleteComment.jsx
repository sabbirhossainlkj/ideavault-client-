"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export function DeleteComment({ coment, onDelete }) {
  const { _id, userId, userName } = coment;

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${_id}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Comment deleted successfully 🗑️");

        if (onDelete) {
          onDelete(_id);
        }
      } else {
        toast.error(data.message || "Failed to delete comment ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger-soft"
        className="flex items-center gap-2 px-4 py-2  rounded-xl transition-all duration-300 shadow-md"
      >
        <Trash2 size={18} />
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Comment?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{userName}</strong>{" "}
                comment. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
