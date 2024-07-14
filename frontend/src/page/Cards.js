import { Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_BASE_URL } from "../services";
import { baseurl } from "../endpoint";
import { toast } from "react-toastify";
const Cards = ({ parameter }) => {
  const [result, setresult] = useState({});
  async function getAutorBySearch() {
    try {
      const response = await axios.get(REACT_APP_BASE_URL, {
        params: {
          t: parameter,
          apikey: `a38d3004`,
        },
      });
      setresult(response?.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    parameter && getAutorBySearch();
  }, [parameter]);
  async function addMovie() {
    const reqBody = {
      title: result?.Title || "",
      year: result?.Year || "",
      content: result?.Actors || "" + result?.Genre || "",
      type: result?.Type || "",
      poster: result?.Poster || "",
    };
    try {
      const res = await axios.post(baseurl + "/api/v1/add-movie", reqBody);
      console.log(res);
      if(res?.data?.msg){
        toast(res?.data?.msg)
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (!result?.Title) return <div className="!text-white">Not Found</div>;
  return (
    <Card className="!w-[50%] !h-[90vh]">
      <CardMedia
        className={"!h-[50%]"}
        image={result?.Poster}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {result?.Title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {String(result?.Type)?.toLocaleUpperCase()}
          {"  "}
          {result?.Year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result?.Actors}
          {result?.Genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addMovie()}>
          Add to Favourites <Add />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
