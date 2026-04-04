"use client";

import { Modal } from "@/components/ui/modal";
import { EventCreateForm } from "@/components/events/EventCreateForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreateEventModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create event"
      description="Add the basics now. You’ll refine details on the next screen. Check “Publish” to go live immediately."
    >
      <EventCreateForm onCancel={onClose} />
    </Modal>
  );
}
