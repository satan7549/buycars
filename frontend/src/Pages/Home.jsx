import React, { useState } from "react";
import { Box, Text, Image, ButtonGroup, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryItems,
  removeItemFromInventory,
  updateInventoryItem,
} from "../Redux/Inventory/inventory.action";
import { Link } from "react-router-dom";

const Home = () => {
  const { inventory } = useSelector((store) => store.inventory);
  const { data } = useSelector((store) => store.auth);
  const { token } = data;
  const dispatch = useDispatch();

  const [updateData, setUpdateData] = useState({
  
    title: "2020 Chevrolet Corvette ",
    price: 25000000,
    description: "Excellent condition, well-maintained Ford Mustang with low mileage.",
    images: [
      "https://robbreport.com/wp-content/uploads/2022/12/corvettec7.jpg?w=1000",
      "https://hips.hearstapps.com/hmg-prod/images/2023-chevrolet-corvette-stingray-convertible-3lt-z51-257-1665496963.jpg?crop=0.663xw:0.609xh;0.0656xw,0.391xh&resize=980:*"
    ],
  });

  const handleAllInventory = () => {
    dispatch(getInventoryItems());
  };

  useEffect(() => {
    handleAllInventory();
  }, [dispatch]);

  const handledelete = (token, id) => {
    dispatch(removeItemFromInventory(token, id));
  };

  const handleUpdateInventry = (token, id, updateData) => {
    dispatch(updateInventoryItem(token, id, updateData))
  };

  return (
    <Box mt={"200px"}>
      {inventory.map((item) => (
        <Box key={item._id}>
          <Link to={`/detail/${item._id}`}>
            <Box>
              <Text>{item.model}</Text>
              <Text>{item.year}</Text>
              <Text>{item.kmOnOdometer}</Text>
              <Box>
                {item.images?.map((image) => (
                  <Image
                    width={"100px"}
                    height={"100px"}
                    key={image._id}
                    src={image.url}
                  />
                ))}
              </Box>
            </Box>
          </Link>
          <ButtonGroup>
            <Button onClick={() => handledelete(token, item._id)} color={"red"}>
              Delete
            </Button>
            <Button
              onClick={() => handleUpdateInventry(token, item._id, updateData)}
              color={"bule"}
            >
              UPDATE
            </Button>
          </ButtonGroup>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
