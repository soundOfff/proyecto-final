import { useEffect, useState } from "react";

export default function useDeleteRow(destroyCallback) {
  const [deleteId, setDeleteId] = useState(0);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  useEffect(() => {
    const destroy = async () => {
      await destroyCallback(deleteId);
    };
    if (deleteConfirmed) {
      destroy();
      setErrorSB(true);
    }
  }, [deleteId, deleteConfirmed, destroyCallback]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteConfirmation(true);
  };

  return {
    deleteId,
    openDeleteConfirmation,
    deleteConfirmed,
    errorSB,
    handleDelete,
    setDeleteConfirmed,
    setOpenDeleteConfirmation,
    setErrorSB,
  };
}
