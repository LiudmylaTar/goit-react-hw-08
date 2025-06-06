import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm({ initialValues, onSubmit }) {
  const fieldId = useId();

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 7)}`;
  };
  const validContactForm = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Number is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        return onSubmit(values, actions);
      }}
      validationSchema={validContactForm}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className={css.form}>
          <label htmlFor={`${fieldId}-name`}>Name</label>
          <Field
            type="text"
            name="name"
            id={`${fieldId}-name`}
            className={css.input}
          />
          <ErrorMessage name="name" component="div" className={css.error} />

          <label htmlFor={`${fieldId}-number`}>Number</label>
          <Field
            type="tel"
            name="number"
            id={`${fieldId}-number`}
            value={values.number}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setFieldValue("number", formatted);
            }}
            className={css.input}
          />
          <ErrorMessage name="number" component="div" className={css.error} />

          <button type="submit" className={css.button}>
            {initialValues?.id ? "Update contact" : "Add contact"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
