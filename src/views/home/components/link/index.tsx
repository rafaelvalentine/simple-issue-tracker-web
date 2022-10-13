import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiCopy, FiEdit } from "react-icons/fi";
import { MdNetworkCheck } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { deleteLink } from "../../../../store";
import LinkUpdate from "../link_update";

interface IProps {
  id: string;
  title: string;
  default_shorten_url: string;
  shortcode?: string;
  access_count: number;
  url: string;
}

function Index({ id, title, default_shorten_url, access_count, url }: IProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const dispatch: any = useDispatch();

  const handleDeleteLink = useCallback(
    (id: string) => {
      dispatch(deleteLink({ id }));
    },
    [dispatch]
  );

  useEffect(() => {
    setTimeout(() => {
      if (showCopied) setShowCopied(false);
    }, 1500);
  }, [showCopied]);

  useEffect(() => {
    console.log("default_shortened_url: ", default_shorten_url);
  }, []);

  return (
    <>
      <div className="w-full py-8 md:py-10 px-4 bg-white shadow-md flex justify-start items-center gap-x-4 mb-4">
        <div>
          <BsThreeDotsVertical className="text-shortener-grey-200 h-[48px]" />
        </div>

        <div className="w-2/6 md:w-3/5">
          <a href={default_shorten_url}>
            <p className=" w-full truncate text-black text-xl md:text-3xl">
              {" "}
              {title ||
                url ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda iure iusto rerum soluta animi corporis harum obcaecati, cupiditate ex placeat, velit cumque vero, architecto molestias! Nisi, recusandae. Ea, praesentium animi?"}
            </p>
            <p className=" w-full truncate text-sm text-shortener-blue">
              {" "}
              {default_shorten_url ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda iure iusto rerum soluta animi corporis harum obcaecati, cupiditate ex placeat, velit cumque vero, architecto molestias! Nisi, recusandae. Ea, praesentium animi?"}{" "}
            </p>
          </a>
        </div>

        <div className="ml-auto text-shortener-grey-200 flex items-center gap-x-4 md:gap-x-10 cursor-pointer">
          <div className="flex items-center gap-x-2 " title="clicks">
            <span>{access_count || "0"}</span>
            <MdNetworkCheck className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </div>
          <div className="flex justify-start items-center gap-x-2 md:gap-x-8">
            <div className="relative" title="copy">
              <CopyToClipboard
                text={default_shorten_url}
                onCopy={() => setShowCopied(true)}
              >
                <FiCopy className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
              </CopyToClipboard>
              {showCopied && (
                <div className="capitalize absolute top-7 -left-6 md:-left-5 bg-green-400 rounded-lg py-1 px-2 cursor-auto">
                  {" "}
                  <p className="text-white">copied!</p>
                </div>
              )}
            </div>
            <div title="edit" onClick={() => setShowEditDialog(true)}>
              <FiEdit className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
            </div>
            <div onClick={() => handleDeleteLink(id)} title="delete">
              <BiTrash className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
            </div>
          </div>
        </div>
      </div>
      {showEditDialog && (
        <div className="w-full bg-white mb-4 py-2 px-2">
          <LinkUpdate
            id={id}
            title={title}
            url={url}
            onHide={() => setShowEditDialog(false)}
          />
        </div>
      )}
    </>
  );
}

export default Index;
