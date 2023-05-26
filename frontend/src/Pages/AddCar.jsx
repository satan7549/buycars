import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToInventory } from "../Redux/Inventory/inventory.action";
import { Box, Button } from "@chakra-ui/react";

const AddCar = () => {
  const [inventoryInfo, setInventoryInfo] = useState({
    oemSpecs: "646f89f51d551e56281f6c28",
    kmOnOdometer: 50000,
    majorScratches: false,
    originalPaint: true,
    accidentsReported: 1,
    previousBuyers: 2,
    registrationPlace: "New York",
    title: "2020 Toyota Camry LE",
    price: 25000,
    description:
      "Excellent condition, well-maintained Toyota Camry LE with low mileage.",
    images: [
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lamborghini/Huracan-EVO/6729/1678692048287/front-left-side-47.jpg",
      "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwY2FyfGVufDB8fDB8fHww&w=1000&q=80",
    ],
  });
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleAddInventory = () => {
    dispatch(addItemToInventory(data.token, inventoryInfo));
  };

  return (
    <Box mt={"200px"}>
      <Button onClick={handleAddInventory}>Add Inventory</Button>
    </Box>
  );
};

export default AddCar;
