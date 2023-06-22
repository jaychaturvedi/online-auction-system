import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../config/api";
import debounce from "../../utils/debounce";
import { setToken } from "../../utils/localstorage";
import "react-tabs/style/react-tabs.css";
import { useStore } from "../../store/useStore";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const response = await api.auth.loginUser({
            email: values.email,
            password: values.password,
          });
          if (response.status) {
            resetForm();
            setToken(response.body.token);
            dispatch({ type: "STORE_USER", payload: response.body });
            dispatch({ type: "AUTHENTICATE", payload: response.status });
            navigate("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
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
