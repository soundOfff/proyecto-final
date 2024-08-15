import { useEffect, useState } from "react";

export default function useDeleteRow(destroyCallback, destroyCallbackMultiple) {
  const [deleteId, setDeleteId] = useState(0);
  const [deleteIds, setDeleteIds] = useState([]);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "Eliminado con éxito",
    content: "Se ha eliminado correctamente",
  });

  useEffect(() => {
    const destroy = async () => {
      try {
        await destroyCallback(deleteId);
        setErrorSB(true);
        resetValues();
      } catch (error) {
        setErrorSB(true);
        setErrorMsg({
          title: "Error al eliminar",
          content: error.message.split("Message: ")[1],
        });
      }
    };
    if (deleteConfirmed && destroyCallback && deleteId > 0) {
      destroy();
      setDeleteConfirmed(false);
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
      setDeleteConfirmed(false);
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
    deleteIds,
    openDeleteConfirmation,
    deleteConfirmed,
    errorSB,
    errorMsg,
    handleDelete,
    handleDeleteMultiple,
    setDeleteConfirmed,
    setOpenDeleteConfirmation,
    setErrorSB,
    setErrorMsg,
    setDeleteIds,
  };
}
