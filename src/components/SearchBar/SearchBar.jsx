import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [setIsFocused] = useState(false);

  const initialValues = {
    query: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form className={s.formWrapper}>
        <Field
          className={s.formInput}
          type="text"
          name="query"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className={s.button} type="submit">
          <BsSearch className={s.iconFocused} />
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
