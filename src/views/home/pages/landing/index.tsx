import React, { useEffect, useState } from "react";
import { Button, Input, Modal, DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { useDispatch, useSelector } from "react-redux";
import { IconBarSprint, Sprints } from "../../components";
import moment from "moment";
import { parse } from "date-fns";

import { createSprint, getSprintsStatus } from "../../../../store";

const { RangePicker } = DatePicker;

function Index() {
  const dispatch = useDispatch();
  const status = useSelector(getSprintsStatus);
  const dateFormat = "DD/MM/YYYY";
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState("");
  const [sprintInfo, setSprintInfo] = useState<any>({
    title: "",
    start_date: moment(),
    end_date: moment().endOf("week"),
  });

  const onChange = (e) => {
    setSprintInfo((sprintInfo) => ({ ...sprintInfo, title: e.target.value }));
  };

  const onChangeDateRanger: RangePickerProps["onChange"] = (
    dates,
    dateStrings
  ) => {
    if (dates) {
      setSprintInfo((sprintInfo: any) => ({
        ...sprintInfo,
        start_date: parse(dateStrings[0], "dd/MM/yyyy", new Date()),
        end_date: parse(dateStrings[0], "dd/MM/yyyy", new Date()),
      }));
    } else {
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    dispatch(createSprint(sprintInfo));
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setConfirmLoading(status);
  }, [status]);

  useEffect(() => {
    setSprintInfo((sprintInfo: any) => ({
      ...sprintInfo,
      start_date: moment(),
      end_date: moment().endOf("week"),
    }));
  }, []);

  return (
    <>
      <div className="w-full h-screen max-h-[100vh] bg-shortener-grey-400">
        {/* <Navbar /> */}
        <div className="w-full h-full h-[80vh] max-h-[80vh] px-4 flex flex-col justify-start items-center">
          {/*  <Stats /> */}
          <IconBarSprint showModal={showModal} />
          <div className="md:w-3/4 my-4 w-full">
            <Sprints />
          </div>
          {/* <ListLinks /> */}
        </div>
      </div>
      <Modal
        title="Create new Sprint"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading === "loading"}
        onCancel={handleCancel}
        footer={[
          <Button
            key="link"
            className="bg-blue-500 capitalize"
            type="primary"
            loading={confirmLoading === "loading"}
            onClick={handleOk}
          >
            add sprint
          </Button>,
        ]}
      >
        <div className="mb-4">
          <Input
            placeholder="Sprint Title"
            value={sprintInfo.title}
            onChange={onChange}
            maxLength={30}
          />
        </div>
        <div className="mb-4">
          <RangePicker
            style={{ width: "100%" }}
            defaultValue={[sprintInfo.start_date, sprintInfo.end_date]}
            format={dateFormat}
            onChange={onChangeDateRanger}
          />
        </div>
      </Modal>
    </>
  );
}

export default Index;
