import { Button } from "antd";

type PropsType = {
  showModal: () => void;
};

function Index({ showModal, ...props }: PropsType) {
  return (
    <div className="w-full md:w-3/4 py-10 md:px-6 flex justify-between items-center">
      <div className="flex justify-start items-center gap-x-2 text-shortener-grey-200">
        <div className="home w-[100px] h-[48px] flex justify-center items-center gap-x-2 rounded-lg font-bold text-black">
          <p className="capitalize text-2xl">Tasks</p>
        </div>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <div>
          <Button
            className="bg-blue-500 capitalize"
            shape="round"
            type="primary"
            size={"large"}
            onClick={showModal}
          >
            new task
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
