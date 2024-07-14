import * as React from "react";
import AllItems from "./AllItems";
import axios from "axios";
import { baseurl } from "../endpoint";

export default function Favourites() {
  const [result, setresult] = React.useState([]);
  async function getAutorBySearch() {
    try {
      const response = await axios.get(baseurl + "/api/v1/get-all-items");
      setresult(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    getAutorBySearch();
  }, []);
  // console.log(result)
  return (
    <div className=" p-2 w-screen flex flex-wrap gap-5">
      {result?.map((i, index) => {
        return <AllItems key={index} item={i} />;
      })}
    </div>
  );
}
