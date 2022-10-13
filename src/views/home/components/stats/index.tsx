import React from "react";
import { useSelector } from "react-redux";
import { RiLinksFill } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { TbHandClick } from "react-icons/tb";
import {
  getTotalClicks,
  getVisitorCount,
  getLinksCount,
} from "../../../../store";

function Index() {
  const count = useSelector(getLinksCount);
  const clicks = useSelector(getTotalClicks);
  const visitors = useSelector(getVisitorCount);

  return (
    <div className="w-full md:w-3/4 border-b border-shortener-grey-200 pb-8">
      <div className="w-full text-shortener-grey-300 font-bold flex justify-between items-center pb-4">
        <p className="font-bebas-neue uppercase text-xl md:text-3xl">stats</p>
        <p className="capitalize text-shortener-blue-200 text-sm md:text-base cursor-pointer">
          see all
        </p>
      </div>

      <div className="w-full flex justify-between items-center capitalize text-shortener-grey-200">
        <div className="flex justify-center items-start gap-x-2">
          <div>
            <RiLinksFill className="mt-1" />
          </div>
          <div className="info">
            <p className="text-xl md:text-2xl font-bebas-neue text-black">
              {count || "0"}
            </p>
            <p className="text-sm">links</p>
          </div>
        </div>
        <div className="flex justify-center items-start gap-x-2">
          <div>
            <IoEyeOutline className="mt-1" />
          </div>
          <div className="info">
            <p className="text-xl md:text-2xl font-bebas-neue text-black">
              {visitors || "0"}
            </p>
            <p className="text-sm">views</p>
          </div>
        </div>
        <div className="flex justify-center items-start gap-x-2">
          <div>
            <TbHandClick className="mt-1" />
          </div>
          <div className="info">
            <p className="text-xl md:text-2xl  font-bebas-neue text-black">
              {clicks || "0"}
            </p>
            <p className="text-sm">clicks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
