import React from "react";
import { useSelector } from "react-redux";
import Link from "../link";
import { getAllLinks } from "../../../../store";

function Index() {
  const links = useSelector(getAllLinks);
  return (
    <div className="w-full md:w-4/5 pb-8 max-h-full overflow-y-auto px-4">
      {links.map(({ attributes }:any) => (
        <Link key={attributes.id} {...attributes}/>
      ))}
    </div>
  );
}

export default Index;
