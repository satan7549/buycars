import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleInventoryItems } from "../Redux/Inventory/inventory.action";
import { Box, Image, Text } from "@chakra-ui/react";

const CarDetail = () => {
  const { id } = useParams();
  const { singleItem } = useSelector((store) => store.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleInventoryItems(id));
  }, [id, dispatch]);

  console.log("cardetail page",singleItem);
  return (
    <Box mt={"200px"}>
      <Box>
        <Text>{singleItem.model}</Text>
        <Text>{singleItem.year}</Text>
        <Text>{singleItem.kmOnOdometer}</Text>
        <Box>
          {singleItem.images?.map((image) => (
            <Image
              width={"100px"}
              height={"100px"}
              key={image._id}
              src={image.url}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CarDetail;
