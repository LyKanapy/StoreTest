import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

interface Props {
  actionName: string;
  onAction (): void; 
  component: React.ReactNode;
}

export default function AddEntityModal({ actionName, onAction, component }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button positive compact style={{ marginTop: 15 }} floated="right">
          {actionName}
        </Button>
      }
    >
      <Modal.Header>Add Product</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            {component}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            onAction();
          }}
          positive
        >
          {actionName}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
