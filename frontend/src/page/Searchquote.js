import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Cards from "./Cards";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Searchquote() {
  const [value, setvalue] = React.useState("");
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen ">
      <div className="flex">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "70%",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            onChange={(e) => setvalue(e.target.value)}
            className="!w-full"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Quotes"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <DirectionsIcon />
          </IconButton>
        </Paper>
        <Button className="!w-[30%] !bg-yellow-700 !text-white" 
        onClick={()=>navigate("/all-favorites")}
        >
          Go TO Favourites
        </Button>
      </div>
      <div className="w-full flex flex-wrap justify-center mt-5 gap-3">
        {[1]?.map((i) => {
          return <Cards parameter={value} />;
        })}
      </div>
    </div>
  );
}
