import React, { useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createLink, fetchLinks } from "../../../../store";


createLink

const shortenerSchema = Yup.object().shape({
  url: Yup.string().url().required("required"),
  // phone_number: Yup.string().required("Required"),
  // address: Yup.string().required("required"),
  // state: Yup.string().required("required"),
  // city: Yup.string().required("required"),
  // password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  // shortcode: Yup.string().matches(/\A[^\W][0-9a-zA-Z\-_]{4,}+\z/i, "invaild shortcode"),
  title: Yup.string()
    .min(3, "Title is Too Short!")
    .max(50, "Title is Too Long!"),
});

function Index() {

  const dispatch:any = useDispatch()


  const handleCreateLink = useCallback(
    ({title, url, shortcode}: any) => {
      dispatch(createLink({title, url, shortcode}))
    },
    [],
  )

  const handleFetchLinks = useCallback(
    () => {
      dispatch(fetchLinks())
    },
    [],
  )
  
  const { errors, touched, ...formik } = useFormik({
    initialValues: {
      url: "",
      title: "",
      shortcode: "",
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      await handleCreateLink({...values})
      
      // formik.handleReset()
    },
    validationSchema: shortenerSchema,
  });
  return (
    <form
      className={`w-full ${
        formik.values.url.length > 0 ? "md:w-5/6 md:mr-4" : "md:w-2/3"
      } flex flex-col md:flex-row justify-center md:justify-end items-center md:items-start gap-x-4`}
      onSubmit={formik.handleSubmit}
    >
      {/* <button type="submit">Submit</button> */}
      <div className="w-full md:w-2/3">
        <input
          id="url"
          name="url"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.url}
          placeholder="Paste URL"
          className="p-2 md:p-4 bg-shortener-grey rounded-lg w-full"
        />
        {errors.url && touched.url && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.url}</div>
        )}
      </div>

      {formik.values.url.length > 0 && (
        <div className="w-full md:w-2/3">
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            placeholder="Type Title"
            className="p-2 md:p-4 bg-shortener-grey rounded-lg w-full mt-3 md:mt-0 md:mb-0"
          />

          {errors.title && touched.title && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.title}
            </div>
          )}
        </div>
      )}
      {formik.values.url.length > 0 && (
        <div className="w-full md:w-2/3">
          <input
            id="shortcode"
            name="shortcode"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.shortcode}
            placeholder="Enter customs shortcode"
            className="p-2 md:p-4 bg-shortener-grey rounded-lg w-full mt-3 mb-4 md:mt-0 md:mb-0"
          />
        </div>
      )}
      <button type="submit" className="mt-2 ml-2 md:ml-4" title="enter" disabled={formik.isSubmitting}>
        <BsPlusLg className="w-[24px] h-[24px] text-shortener-grey-200 " />
      </button>
    </form>
  );
}

export default Index;
