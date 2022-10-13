import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
// import { iteratorSymbol } from "immer/dist/internal";
// import type { DatePickerProps } from "antd";
// import { DatePicker, Space } from "antd";
import { parseISO, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSprints,
  updateSprint,
  getSprintsStatus,
} from "../../../../store";

interface Item {
  key: string;
  id?: string;
  title: string;
  start_date: any;
  end_date: any;
  is_active?: boolean;
  tasks?: any[];
}

const originData: Item[] = [];
for (let i = 0; i < 1; i++) {
  originData.push({
    key: i.toString(),
    title: `Sprint ${Number(i) + 1}`,
    start_date: `${new Date()}`,
    end_date: `${new Date()}`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

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

const Sprint: React.FC = () => {
  const dispatch = useDispatch();
  const sprints = useSelector(getAllSprints);
  const currentStatus = useSelector(getSprintsStatus);

  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [status, setStatus] = useState(null);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(
      sprints
        .filter((item: Item) => {
          if (item.end_date && item.start_date && item.title) {
            return item;
          }
        })
        .map((item: Item) => ({
          ...item,
          key: item.id,
        }))
    );
    setStatus(currentStatus);
  }, [sprints, currentStatus]);
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ title: "", start_date: "", end_date: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      //   console.log("row: ", row);

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
          updateSprint({
            ...item,
            ...row,
          })
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
      title: "Start Date",
      dataIndex: "start_date",
      width: "15%",
      render: (text: string) => (
        <div>{format(parseISO(text), "dd/MM/yyyy")}</div>
      ),
      //   editable: true,
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      width: "15%",
      render: (text: string) => (
        <div>{format(parseISO(text), "dd/MM/yyyy")}</div>
      ),
      //   editable: true,
    },
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
        inputType: "text",
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

export default Sprint;
