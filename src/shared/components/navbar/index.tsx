import { GiHamburgerMenu } from "react-icons/gi";
import { BsBell, BsChevronDown } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { Drawer } from "antd";
import { NavLink } from "react-router-dom";

import useLogic from "./index.logic";
import InputField from "../../../views/home/components/input_field";

function Index() {
  const { showDrawer, placement, onClose, open } = useLogic();

  return (
    <>
      <div className="w-full p-4 md:p-8 shadow-lg">
        <div className="mobile md:hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="capitalize text-shortener-grey-300 font-bold font-bebas-neue  text-xl">
              <p>
                <span className="uppercase">Issue Maestro</span>
              </p>
            </div>

            <div onClick={showDrawer}>
              <GiHamburgerMenu className="w-[24px] h-[24px] text-shortener-grey-300 cursor-pointer" />
            </div>
          </div>
          <div className="w-full">{/* <InputField /> */}</div>
        </div>
        <div className="desktop hidden md:flex items-center">
          <div className="flex justify-between items-center w-1/5">
            <div className="capitalize text-shortener-grey-300 font-bold text-lg font-bebas-neue text-2xl">
              <p>
                <span className="uppercase">Issue Maestro</span>
              </p>
            </div>
          </div>
          <div className="ml-auto w-2/5 flex justify-end items-center gap-x-8">
            <div className="mb-4 hover:bg-shortener-grey-100 ">
              <NavLink
                to="/"
                className={({ isActive }: { isActive: boolean }) => {
                  return `uppercase font-bold mb-8 ${
                    isActive
                      ? "text-blue-500 [&>div]:border-blue-500"
                      : "[&>div]:border-shortener-grey-200"
                  }`;
                }}
                // onClick={onClose}
              >
                <div className="w-full !border-0 !border-b border p-2 cursor-pointer">
                  sprint
                </div>
              </NavLink>
            </div>

            <div className="mb-4 hover:bg-shortener-grey-100">
              <NavLink
                to="tasks"
                className={({ isActive }: { isActive: boolean }) => {
                  return `uppercase font-bold mb-8 ${
                    isActive
                      ? "text-blue-500 [&>div]:border-blue-500"
                      : "[&>div]:border-shortener-grey-200"
                  }`;
                }}
                // onClick={onClose}
              >
                <div className="w-full !border-0 !border-b border-shortener-grey-200 border p-2 cursor-pointer">
                  tasks
                </div>
              </NavLink>
            </div>
            {/* <InputField /> */}
          </div>

          <div className="w-1/5 flex justify-end items-center">
            <div className="relative mx-4">
              <BsBell className="w-[24px] h-[24px]" />
              <div className="absolute top-0 -right-1 p-1 rounded-full bg-red-600 w-[4px] h-[4px]" />
            </div>

            <div className="w-[48px] h-[48px] rounded-full flex justify-center items-center mx-8 cursor-pointer">
              <FaRegUser className="w-[32px] h-[32px]" />
              <BsChevronDown className="mx-2" />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        // title="Drawer with extra actions"
        placement={placement}
        width={"100vw"}
        onClose={onClose}
        open={open}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        <div className="mb-4 hover:bg-shortener-grey-100">
          <NavLink to="/" className="uppercase font-bold" onClick={onClose}>
            <div className="w-full border-0 border-b border-shortener-grey-200 border p-2 cursor-pointer">
              sprints
            </div>
          </NavLink>
        </div>
        <div className="mb-4 hover:bg-shortener-grey-100">
          <NavLink
            to="tasks"
            className="uppercase font-bold mb-8"
            onClick={onClose}
          >
            <div className="w-full border-0 border-b border-shortener-grey-200 border p-2 cursor-pointer">
              tasks
            </div>
          </NavLink>
        </div>

        {/* <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Drawer>
    </>
  );
}

export default Index;
