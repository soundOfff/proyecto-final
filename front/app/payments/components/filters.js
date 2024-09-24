"use client";

import { FormControl, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

import { useMaterialUIController } from "/context";

import Modal from "/components/Modal";
import ModalContentForm from "/components/ModalContent/Payment/form";

export default function Filters({ paymentMethods, partners }) {
  const [search, setSearch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  function handleSearch(e) {
    const search = e.target.value;
    if (search.length > 1) {
      setTimeout(() => {
        setSearch(search);
      }, 300);
    } else {
      setSearch(null);
    }
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [router, pathname, searchParams, search]);

  return (
    <Grid container spacing={3} width="100%">
      <Grid item xs={12} sm={6}>
        <FormControl
          sx={{
            width: { lg: "50%", xs: "100%" },
            height: "50px",
            mb: 3,
            display: "flex",
            justifyItems: "end",
          }}
        >
          <MDInput label="Buscar" onChange={handleSearch} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} display="flex" justifyContent="end">
        <MDButton
          variant="gradient"
          onClick={() => setIsModalOpen(true)}
          color={darkMode ? "light" : "dark"}
          style={{ width: "auto", height: "40px" }}
        >
          Agregar nuevo cobro
        </MDButton>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            px={0}
            py={0}
            width="40%"
            height="auto"
            sx={{ overflow: "scroll" }}
          >
            <ModalContentForm
              paymentMethods={paymentMethods}
              partners={partners}
            />
          </Modal>
        )}
      </Grid>
    </Grid>
  );
}
