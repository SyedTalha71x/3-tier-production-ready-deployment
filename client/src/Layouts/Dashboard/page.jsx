/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ReactNode, useState } from "react";
import { Toolbar, Box, styled } from "@mui/material";
import Navbar from "../../Partials/Navbar/page";
import Sidebar from "../../Partials/Sidebar/page";

const OuterContainer = styled(Box)({
  display: "flex",
  height: "101vh",
  flexDirection: "column",
});

const Main = styled(Box)({
  flex: 1,
  padding: "16px",
  overflowY: "auto", 
});

const Page = ({ children }) => {
  const [isTransparent, setIsTransparent] = useState(false);

  const handleSidenavTypeChange = (type) => {
    setIsTransparent(type === "transparent");
  };

  return (
    <OuterContainer>
      <div className="flex h-full overflow-hidden  lg:m-3 md:m-2 sm:m-0 m-0">
        <Sidebar isTransparent={isTransparent} handleSidenavTypeChange={handleSidenavTypeChange} />

        <div className="flex-1 flex flex-col ">
          <div className=" ">
          <Navbar   />
          </div>
          <Main>{children}</Main>
        </div>
      </div>
    </OuterContainer>
  );
};

export default Page;
