"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

export function UpdateComment({ coment }) {
  const { _id, userId, comment } = coment;
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const ideaData = Object.fromEntries(formData.entries());

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${_id}?userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            comment: ideaData.comment,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update comment");
      }

      console.log(data);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!");
    }
  }

  return (
    <Modal>
      <Button variant="secondary" className="z-20 flex items-center gap-2  px-3 py-2 rounded-xl shadow-md">
        <Pencil size={16} /> Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Envelope className="size-5" />
              <Modal.Heading>Update My Comment</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="p-10 space-y-8" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 gap-8">
                    <TextField defaultValue={comment} name="comment" isRequired>
                      <Label>User Comment</Label>

                      <Input placeholder="Comment" className="rounded-2xl" />

                      <FieldError />
                    </TextField>
                  </div>

                  <Modal.Footer>
                    <Button type="submit" variant="primary" slot="close">
                      Save
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
