"use client";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { Pencil } from "lucide-react";

export function UpdateComment({ coment }) {
  const { _id, userId, comment } = coment;
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ideaData = Object.fromEntries(formData.entries());

    const res = await fetch(
      `http://localhost:5000/comment/${_id}?userId=${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: ideaData.comment,
        }),
      },
    );

    const data = await res.json();
    console.log(data);
  };

  return (
    <Modal>
      <Button className="z-20 flex items-center gap-2 hover:bg-yellow-600 text-white px-3 py-2 rounded-xl shadow-md">
        <Pencil size={16} /> Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Envelope className="size-5" />
              <Modal.Heading>Update My comment</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="p-10 space-y-8" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
