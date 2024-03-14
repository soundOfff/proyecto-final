import { useEffect, useState } from "react";
import { update } from "/actions/tasks";

export default function useTodo(checklistItems) {
  const [items, setItems] = useState(checklistItems || []);
  const [progress, setProgress] = useState(0);

  const createItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: "",
        finished: false,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id != id));
    return items;
  };

  const editItem = (id, description) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, description };
        }
        return item;
      })
    );
  };

  const toggleChecked = (id, value = false) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, finished: value };
        }
        return item;
      })
    );
  };

  const getFilteredItems = () => {
    return items
      .filter((item) => item.description != "")
      .map((item) => {
        return {
          description: item.description,
          finished: item.finished,
        };
      });
  };

  useEffect(() => {
    const finished = items.filter((item) => item.finished).length;
    setProgress((finished / items.length) * 100);
  }, [items]);

  return {
    items,
    getFilteredItems,
    setItems,
    createItem,
    removeItem,
    editItem,
    toggleChecked,
    progress,
  };
}
