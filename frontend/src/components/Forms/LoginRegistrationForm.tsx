import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../config/api";
import debounce from "../../utils/debounce";
import { setToken } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const LoginForm = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={debounce(async (values, { setSubmitting, resetForm }) => {
        const response = await api.auth.loginUser({
          email: values.email,
          password: values.password,
        });
        if (response.status) {
          resetForm();
          setToken(response.body.token);
        }
      })}
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
const RegisterForm = () => (
  <div>
    <h1>Register</h1>
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={RegisterSchema}
      onSubmit={debounce(async (values, { resetForm }) => {
        const response = await api.users.registerUser({
          email: values.email,
          name: values.name,
          password: values.password,
        });
        if (response.status) {
          resetForm();
        }
      })}
    >
      {({ isSubmitting }) => (
        <Form className="registration-form">
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);
export default function LoginRegistrationForm(props: {
  currentTab: "login" | "signup";
}) {
  const tabEnum = {
    login: 0,
    signup: 1,
  };
  const [tabIndex, setTabIndex] = useState(tabEnum[props.currentTab]);

  return (
    <div style={{ margin: "20px 50px" }}>
      <Tabs
        selectedIndex={tabEnum[props.currentTab]}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabPanel>
          <LoginForm />
        </TabPanel>
        <TabPanel>
          <RegisterForm />
        </TabPanel>
      </Tabs>
    </div>
  );
}
