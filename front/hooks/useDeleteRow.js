import { useEffect, useState } from "react";

export default function useDeleteRow(destroyCallback, destroyCallbackMultiple) {
  const [deleteId, setDeleteId] = useState(0);
  const [deleteIds, setDeleteIds] = useState([]);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  useEffect(() => {
    const destroy = async () => {
      await destroyCallback(deleteId);
      setErrorSB(true);
      resetValues();
    };
    if (deleteConfirmed && destroyCallback && deleteId > 0) {
      destroy();
    }
  }, [deleteId, deleteConfirmed, destroyCallback]);

  useEffect(() => {
    const destroy = async () => {
      await destroyCallbackMultiple(deleteIds);
      setErrorSB(true);
      resetValues();
    };
    if (deleteConfirmed && destroyCallbackMultiple && deleteIds.length > 0) {
      destroy(deleteIds);
    }
  }, [deleteIds, deleteConfirmed, destroyCallbackMultiple]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteMultiple = () => {
    setOpenDeleteConfirmation(true);
  };

  const resetValues = () => {
    setDeleteId(0);
    setDeleteIds([]);
    setDeleteConfirmed(false);
    setOpenDeleteConfirmation(false);
  };

  return {
    deleteId,
    openDeleteConfirmation,
    deleteConfirmed,
    errorSB,
    handleDelete,
    handleDeleteMultiple,
    setDeleteConfirmed,
    setOpenDeleteConfirmation,
    setErrorSB,
    setDeleteIds,
  };
}
