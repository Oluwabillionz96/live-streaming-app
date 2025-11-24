import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const SideBar = ({
  handleCloseSideBar,
}: {
  handleCloseSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full md:w-[20%]   bg-black/70 md:bg-transparent fixed top-0 md:top-[16%] lg:top-[14%] bottom-0 h-screen"
      onClick={() => handleCloseSideBar(false)}
    >
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
        }}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-1/2 h-full py-4 flex flex-col gap-4 px-4 bg-white md:border-r  md:w-full"
      >
        <Link href={"/"}>
          <Button className="w-full hover:cursor-pointer">Home</Button>
        </Link>
        <Link href={"/stream"}>
          <Button className="w-full hover:cursor-pointer">Stream</Button>
        </Link>
      </motion.div>
    </motion.aside>
  );
};

export default SideBar;
