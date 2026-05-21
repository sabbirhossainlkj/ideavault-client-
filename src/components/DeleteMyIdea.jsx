"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function DeleteMyIdea({ idea }) {
  const { _id, userId, title } = idea;
  const router = useRouter();

  const handleDeleteIdea = async () => {
     const { data: tokenData } = await authClient.token();
        console.log(tokenData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${_id}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          }
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Idea deleted successfully 🗑️");

        router.push("/add-idea");
        router.refresh();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger-soft"
        className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
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
              <AlertDialog.Heading>
                Delete idea permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{title}</strong> and all of
                its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={handleDeleteIdea}
                slot="close"
                variant="danger"
              >
                Delete idea
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}