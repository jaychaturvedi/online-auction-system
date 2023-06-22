import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../config/api";
import debounce from "../../utils/debounce";
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { useStore } from "../../store/useStore";
import TextField from "@mui/material/TextField";
import Dropdown from "../Global/Dropdown";
import { routeEnum } from "../../utils/enum";

const AddItemSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  startingPrice: Yup.number().positive().min(1).required("Required"),
  time: Yup.number().positive().integer().min(1).required("Required"),
  timeFrameType: Yup.string()
    .oneOf(
      ["minutes", "hours", "days"],
      "timeFrame must be one of the following: minutes, hours, days"
    )
    .required("Required"),
});

export default function AddItem() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Create New Item</h1>
      <Formik
        initialValues={{
          name: "",
          startingPrice: null,
          sellerId: null,
          time: null,
          timeFrameType: "",
        }}
        validationSchema={AddItemSchema}
        onSubmit={async (values, { resetForm }) => {
          const response = await api.item.createItem({
            name: values.name,
            startingPrice: values.startingPrice,
            sellerId: state.user.id,
            time: values.time,
            timeFrameType: values.timeFrameType as any,
          });
          if (response.status) {
            navigate(routeEnum.home);
          }
        }}
      >
        {({ values, isSubmitting, handleChange, errors }) => (
          <Form className="registration-form">
            <TextField
              id="outlined-basic-name"
              label="Name"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name?.length > 0}
              helperText={errors.name}
            />
            <TextField
              id="outlined-basic-starting-price"
              label="Starting Price"
              variant="outlined"
              name="startingPrice"
              type="number"
              value={values.startingPrice}
              onChange={handleChange}
              error={(errors.startingPrice as string)?.length > 0}
              helperText={errors.startingPrice as string}
            />
            <Dropdown
              fullWidth
              id="outlined-basic-time-frame"
              label="Unit Of Expiry Time"
              variant="outlined"
              name="timeFrameType"
              type="number"
              value={values.timeFrameType}
              onChange={handleChange}
              error={(errors.timeFrameType as string)?.length > 0}
              helperText={errors.timeFrameType as string}
              options={["minutes", "days", "hours"].map((item) => ({
                label: item,
                value: item,
              }))}
            />
            <TextField
              fullWidth
              id="outlined-basic-time"
              label="Expiry Time"
              variant="outlined"
              name="time"
              type="number"
              value={values.time}
              onChange={handleChange}
              error={(errors.time as string)?.length > 0}
              helperText={errors.time as string}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
