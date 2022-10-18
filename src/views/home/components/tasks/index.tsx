import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Checkbox,
} from "antd";
// import { iteratorSymbol } from "immer/dist/internal";
// import type { DatePickerProps } from "antd";
// import { DatePicker, Space } from "antd";
import { parseISO, format } from "date-fns";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTasks,
  updateTask,
  getTasksStatus,
  getAllSprints,
} from "../../../../store";

interface Item {
  key: string;
  id?: string;
  title: string;
  description: string;
  is_completed: boolean;
  is_active?: boolean;
  sprint?: any;
}

const SprintDropdown = ({
  record,
  dataIndex,
  value = {},
  onChange,
}: {
  record: Item;
  dataIndex: string;
  value?: {
    sprint?: string;
    sprintId?: string;
  };
  onChange?: (value: any) => void;
}) => {
  const sprints = useSelector(getAllSprints);
  const [sprint, setSprint] = useState(record.sprint.title);
  const [sprintId, setSprintId] = useState("");

  const resultSprints = useMemo(() => {
    return sprints.filter((s: Item) => {
      const reg = new RegExp(`${sprint}`, "g");
      if (reg.test(s.title)) return s;
    });
  }, [sprint]);

  const triggerChange = (changedValue: {
    sprint?: string;
    sprintId?: string;
  }) => {
    onChange?.({ ...changedValue });
  };

  useEffect(() => {
    triggerChange({ sprintId });
  }, [sprintId]);

  return (
    <div className="relative">
      {/* <Form.Item name={dataIndex} noStyle> */}
      <Input
        value={value.sprint || sprint}
        onChange={(e) => setSprint(e.target.value)}
      />
      {/* </Form.Item> */}

      {resultSprints && resultSprints.length > 0 && (
        <div className="absolute top-12 left-0">
          {resultSprints.map((sp: any) => (
            <p
              onClick={() => {
                setSprint(sp.title);
                setSprintId(sp.id);
              }}
            >
              {" "}
              {sp?.title}{" "}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const originData: Item[] = [];
// for (let i = 0; i < 1; i++) {
//   originData.push({
//     key: i.toString(),
//     title: `Sprint ${Number(i) + 1}`,
//     start_date: `${new Date()}`,
//     end_date: `${new Date()}`,
//   });
// }
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "checkbox";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;

  if (inputType === "number") {
    inputNode = <InputNumber />;
  }
  if (inputType === "checkbox") {
    inputNode = <Checkbox />;
  }

  if (dataIndex === "sprint") {
    inputNode = <SprintDropdown dataIndex={dataIndex} record={record} />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Task: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getAllTasks);
  const currentStatus = useSelector(getTasksStatus);

  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [status, setStatus] = useState(null);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(
      tasks
        .filter((item: Item) => {
          if (item.title) {
            return item;
          }
        })
        .map((item: Item) => ({
          ...item,
          key: item.id,
        }))
    );
    setStatus(currentStatus);
  }, [tasks, currentStatus]);
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      title: "",
      description: "",
      is_completed: "",
      ...record,
      sprint: record.sprint.title,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData: Item[] = [...data];
      const index = newData.findIndex((item: Item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        // newData.splice(index, 1, {
        //   ...item,
        //   ...row,
        // });

        // setData(newData);
        dispatch(
          updateTask({
            ...item,
            ...row,
            sprint_id: row?.sprint.sprintId,
          }) as any
        );
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "25%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "50%",
      // render: (text: string) => (
      //   <div>{format(parseISO(text), "dd/MM/yyyy")}</div>
      // ),
      editable: true,
    },
    {
      title: "Sprint",
      dataIndex: "sprint",
      width: "15%",
      // render: (text: string) => (
      //   <div>{format(parseISO(text), "dd/MM/yyyy")}</div>
      // ),
      editable: true,
      render: (_: any, { sprint }: Item) => <div>{sprint.title}</div>,
    },
    // {
    //   title: "completed",
    //   dataIndex: "is_completed",
    //   width: "15%",
    //   inputType: "checkbox",
    //   // render: (text: string) => (
    //   //   <div>{format(parseISO(text), "dd/MM/yyyy")}</div>
    //   // ),
    //   editable: true,
    //   render: (_, { is_completed }: Item) => (
    //     <Checkbox defaultChecked={is_completed} disabled />
    //     // <div>{is_completed.toString()}</div>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "is_completed" ? "checkbox" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          loading={status === "loading"}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default Task;
