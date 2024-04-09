/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const form = {
  formId: "new-file",
  formField: {
    file: {
      name: "file",
      label: "Archivo",
      errorMsg: "Debe cargar un archivo",
    },
    fileableType: {
      name: "fileable_type",
      label: "Relacionado con",
      errorMsg: "Debe seleccionar una entidad para relacionar con el archivo",
    },
    fileableId: {
      name: "fileable_id",
      label: "Nombre",
      errorMsg: "Debe seleccionar una entidad para relacionar con el archivo",
    },
  },
};

export default form;
