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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// NextJS Material Dashboard 2 PRO components
import MDInput from "/components/MDInput";
function MDDatePicker({ input = {}, options = { allowInput: true }, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      options={options}
      render={({ defaultValue }, ref) => (
        <MDInput
          {...input}
          variant="standard"
          InputLabelProps={{ shrink: true }}
          defaultValue={defaultValue}
          inputRef={ref}
        />
      )}
    />
  );
}

// Typechecking props for the MDDatePicker
MDDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default MDDatePicker;
