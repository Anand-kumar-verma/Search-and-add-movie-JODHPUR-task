import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
const AllItems = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item?.poster}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {String(item?.type)?.toLocaleUpperCase()}
          {"  "}
          {item?.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item?.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AllItems;
