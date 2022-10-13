import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { IoClose as Close } from "react-icons/io5";
import { BsCheckLg as Check } from "react-icons/bs";
import { updateLink } from "../../../../store";

interface IProps {
  id: string;
  title?: string;
  url: string;
  onHide: () => void;
}

function Index({ id, url, title, onHide }: IProps) {
  const dispatch: any = useDispatch();

  const handleUpdateLink = useCallback(
    ({ id, title, url }: { id: string; title?: string; url: string }) => {
      dispatch(updateLink({ id, title, url }));
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      title,
      url,
    },
    onSubmit: async (values) => {
      try {
        await handleUpdateLink({ ...values, id });
        onHide();
      } catch (error:any) {
        alert(error.message);
      }
    },
  });
  return (
    <form
      className="w-full flex flex-col md:flex-row justify-start items-center gap-x-4"
      onSubmit={formik.handleSubmit}
    >
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="w-5/6 md:w-2/3 px-4 py-2 mb-2 md:mb-0 bg-shortener-grey"
        placeholder="Enter title"
      />

      <input
        id="url"
        name="url"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.url}
        className="w-5/6 md:w-2/3 px-4 py-2 mb-2 md:mb-0 bg-shortener-grey"
        placeholder="Enter URL"
      />

      <div className="flex justify-end items-center w-5/6 md:w-1/6 gap-x-4 text-shortener-grey-200">
        <button onClick={onHide} type="button">
          <Close className="text-shortener-grey-200 w-[24px] h-[24px]" />
        </button>
        <button type="submit">
          <Check className="text-shortener-grey-200 " />
        </button>
      </div>
    </form>
  );
}

export default Index;
