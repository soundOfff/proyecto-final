import FormComponent from "./components/form";
import Modal from "/components/Modal";

export default function SlackShare({ open, onClose, modelId, modelType }) {
  return (
    <Modal height="min-content" open={open} onClose={onClose}>
      <FormComponent
        handleClose={onClose}
        modelId={modelId}
        modelType={modelType}
      />
    </Modal>
  );
}
