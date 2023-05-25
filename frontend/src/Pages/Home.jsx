import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const baseURL = "http://localhost:8080/user";

const Home = () => {
  const { data } = useSelector((store) => store.auth);

  const getAlluser = async (token) => {
    try {
      if (!token) {
        return;
      }
      const headers = {
        Authorization: `${token}`, // Include the token in the headers
      };
      const response = await axios.get(`${baseURL}`, { headers });
      const { data } = response;
      return data;
    } catch (err) {
      const { data } = err.response;
      return data;
    }
  };

  useEffect(() => {
    getAlluser(data.token).then((res) => console.log(res));
  }, [data.token]);

  return <Box mt={"200px"}>Home</Box>;
};

export default Home;
