import { useEffect, useState } from "react";
import { Button, Input, Select, Modal } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useDispatch, useSelector } from "react-redux";
import { IconBarTask, Tasks } from "../../components";

import { createTask, getTasksStatus, getAllSprints } from "../../../../store";

function Index() {
  const dispatch = useDispatch();
  const status = useSelector(getTasksStatus);
  const [open, setOpen] = useState(false);
  const [sprintData, setSprintData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState("");
  const [taskInfo, setTaskInfo] = useState<any>({
    title: "",
    description: "",
    is_completed: false,
    sprint_id: null,
  });
  const sprints = useSelector(getAllSprints);

  const onChange = (e) => {
    setTaskInfo((taskInfo) => ({ ...taskInfo, [e.target.id]: e.target.value }));
  };

  const handleSelectOnChange = (value) => {
    setTaskInfo((taskInfo) => ({ ...taskInfo, sprint_id: value }));
  };
  const { Option } = Select;

  // const onChangeDateRanger: RangePickerProps["onChange"] = (
  //   dates,
  //   dateStrings
  // ) => {
  //   if (dates) {
  //     setTaskInfo((taskInfo: any) => ({
  //       ...taskInfo,
  //       start_date: parse(dateStrings[0], "dd/MM/yyyy", new Date()),
  //       end_date: parse(dateStrings[0], "dd/MM/yyyy", new Date()),
  //     }));
  //   } else {
  //   }
  // };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    dispatch(createTask(taskInfo));
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   console.log("taskInfo: ", taskInfo);
  // }, [taskInfo]);

  useEffect(() => {
    setConfirmLoading(status);
  }, [status]);

  useEffect(() => {
    setTaskInfo((taskInfo: any) => ({
      ...taskInfo,
      // start_date: moment(),
      // end_date: moment().endOf("week"),
    }));
  }, []);

  useEffect(() => {
    setSprintData(sprints);
  }, [sprints]);

  return (
    <>
      <div className="w-full h-screen max-h-[100vh] bg-shortener-grey-400">
        {/* <Navbar /> */}
        <div className="w-full h-full h-[80vh] max-h-[80vh] px-4 flex flex-col justify-start items-center">
          {/*  <Stats /> */}
          <IconBarTask showModal={showModal} />
          <div className="md:w-3/4 my-4 w-full">
            <Tasks />
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
            add task
          </Button>,
        ]}
      >
        <div className="mb-4">
          <Input
            placeholder="Task Title"
            value={taskInfo.title}
            onChange={onChange}
            maxLength={50}
            id="title"
          />
        </div>

        <div className="mb-4">
          <Input
            placeholder="Task Decription"
            value={taskInfo.description}
            onChange={onChange}
            maxLength={300}
            id="description"
          />
        </div>

        <div className="mb-4">
          <Select
            size={"large"}
            // defaultValue="a1"
            onChange={handleSelectOnChange}
            placeholder="Select a Sprint"
            style={{ width: 200 }}
          >
            {/* {children} */}
            {sprintData.length &&
              sprintData.map((item) => {
                if (item.id && item.title) {
                  return <Option key={item.id}>{item.title}</Option>;
                }
              })}
          </Select>
        </div>
        {/* <div className="mb-4">
          <RangePicker
            style={{ width: "100%" }}
            defaultValue={[taskInfo.start_date, taskInfo.end_date]}
            format={dateFormat}
            onChange={onChangeDateRanger}
          />
        </div> */}
      </Modal>
    </>
  );
}

export default Index;
