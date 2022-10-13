import type { DrawerProps } from "antd/es/drawer";
import type { RadioChangeEvent } from "antd/es/radio";
import { useState } from "react";

type ReturnType = {
  open: boolean;
  placement?: string;
  showDrawer: () => void;
  onChange: (e: RadioChangeEvent) => void;
  onClose: () => void;
};

function useLogic(): ReturnType {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    placement,
    showDrawer,
    onChange,
    onClose,
  };
}

export default useLogic;
