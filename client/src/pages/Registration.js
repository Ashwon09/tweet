import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services/AuthService";
import { getCookie } from "../utils/cookie";

function Registration() {
  const navigate = useNavigate();
  const initialvalues = {
    username: "",
    password: "",
    fullName: "",
  };
  useEffect(() => {
    const user = getCookie("logged-in");
    if (user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    password: Yup.string().min(4).required(),
    username: Yup.string().min(3).max(20).required(),
  });

  const onSubmit = async (data) => {
    const res = await registerUserService(data);
    if (res.status === 201) {
      navigate("/login");
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialvalues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Fullname: </label>
          <Field
            id="inputCreatePost"
            name="fullName"
            placeholder="(Ex. John Stones)"
          />
          <ErrorMessage name="username" component="span" />
          <label>Username: </label>
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <ErrorMessage name="username" component="span" />
          <label>Password: </label>
          <Field
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="********"
          />
          <ErrorMessage name="username" component="span" />

          <button type="submit"> Register User</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
