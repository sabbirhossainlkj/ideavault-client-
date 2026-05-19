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
import { toast } from "react-hot-toast";

export function UpdateMyIdea({ idea }) {
  const { _id, userId, title, shortDescription, category } = idea;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ideaData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `http://localhost:5000/idea/${_id}?userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(ideaData),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Idea updated successfully ");
      } else {
        toast.error(data.message || "Failed to update idea");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
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
              <Modal.Heading>Update My Idea</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                      <TextField defaultValue={title} name="title" isRequired>
                        <Label>Title</Label>

                        <Input
                          placeholder="AI Study"
                          className="rounded-2xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    <TextField
                      defaultValue={shortDescription}
                      name="shortDescription"
                      isRequired
                    >
                      <Label>Short Description</Label>

                      <Input
                        placeholder="AI-powered platform"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    <div>
                      <Select
                        defaultValue={category}
                        name="category"
                        isRequired
                        className="w-full"
                        placeholder="Select category"
                      >
                        <Label>Category</Label>

                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="AI" textValue="AI">
                              AI
                              <ListBox.ItemIndicator />
                            </ListBox.Item>

                            <ListBox.Item id="Health" textValue="Health">
                              Health
                              <ListBox.ItemIndicator />
                            </ListBox.Item>

                            <ListBox.Item id="Education" textValue="Education">
                              Education
                              <ListBox.ItemIndicator />
                            </ListBox.Item>

                            <ListBox.Item id="Tech" textValue="Tech">
                              Tech
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
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