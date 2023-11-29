import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { creatPostService } from "../services/PostService";

function CreatePost() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    }
  }, []);
  const initialvalues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  const onSubmit = async (data) => {
    const res = await creatPostService(data);
    if (res.status === 200) {
      navigate("/");
    }
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialvalues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <ErrorMessage name="title" component="span" />
          <label>Post: </label>
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <ErrorMessage name="postText" component="span" />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
