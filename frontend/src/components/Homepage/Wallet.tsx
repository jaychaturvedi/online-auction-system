import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../config/api";
import "react-tabs/style/react-tabs.css";
import { useStore } from "../../store/useStore";
import { useNavigate } from "react-router-dom";

const WalletScchema = Yup.object().shape({
  balance: Yup.number().min(1).required("Required"),
});

export default function Wallet() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Wallet</h1>
      <Formik
        initialValues={{ balance: 0 }}
        validationSchema={WalletScchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const response = await api.users.updateUserBalance({
            balance: values.balance,
          });

          if (response.status) {
            resetForm();
            dispatch({
              type: "UPDATE_BALANCE",
              payload: response.body.balance,
            });
            navigate("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="wallet-form">
            <div>
              <label htmlFor="balance">Add Money</label>
              <Field type="number" name="balance" />
              <ErrorMessage name="balance" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
