import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToInventory } from "../Redux/Inventory/inventory.action";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { oemDataSearchResult } from "../Redux/OEM/oem.action";

const initialState = {
  oemSpecs: "",
  kmOnOdometer: 0,
  majorScratches: false,
  originalPaint: false,
  accidentsReported: 0,
  previousBuyers: 0,
  registrationPlace: "",
  title: "",
  price: 0,
  description: "",
  images: [],
};

const AddCar = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [inventoryInfo, setInventoryInfo] = useState(initialState);
  const [search, setSearch] = useState("");
  const [oemId, setOemID] = useState("");

  const { data } = useSelector((store) => store.auth);
  const { token } = data;
  const { searchResults } = useSelector((store) => store.oem);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInventoryInfo((prevInventoryInfo) => ({
      ...prevInventoryInfo,
      [name]: value,
    }));
  };

  // Update inventoryInfo when selectedImages change
  useEffect(() => {
    setInventoryInfo((prevInventoryInfo) => ({
      ...prevInventoryInfo,
      images: selectedImages,
      oemSpecs: oemId,
    }));
  }, [selectedImages, oemId]);

  // const handleAddInventory = () => {
  //   dispatch(addItemToInventory(token, inventoryInfo));
  // };

  const handleAddInventory = () => {
    const {
      oemSpecs,
      kmOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      title,
      price,
      description,
      images,
    } = inventoryInfo;
    if (inventoryInfo.oemSpecs !== "") {
      const inventoryData = {
        oemSpecs,
        kmOnOdometer: parseInt(kmOnOdometer),
        majorScratches: majorScratches === "true",
        originalPaint: originalPaint === "true",
        accidentsReported: parseInt(accidentsReported),
        previousBuyers: parseInt(previousBuyers),
        registrationPlace,
        title,
        price: parseInt(price), // You can set the desired price value here
        description,
        images: images !== "" ? [images] : [], // Convert the image URL to an array if provided
      };
      dispatch(addItemToInventory(token, inventoryData));
    } else {
      alert("Please select OEM CAR Detail");
    }
  };
  
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    setSelectedImages([]);
    setImagesPreview([]);
  
    files.forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setSelectedImages((old) => [...old, reader.result]);
        }
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  // const createProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setSelectedImages([]);
  //   setImagesPreview([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setSelectedImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleSearch = () => {
    dispatch(oemDataSearchResult(search));
  };

  return (
    <Box width={"full"} mt={"80px"}>
      <HStack>
        <Input
          border={"1px solid gray"}
          type="search"
          placeholder="Search OEM"
          name="OEM"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </HStack>
      {searchResults.length > 0 ? (
        <Box>
          {searchResults.map((item) => (
            <Box
              key={item._id}
              display={"flex"}
              gap="10"
              border={"1px solid gray"}
              onClick={() => setOemID(item._id)}
            >
              <Text>{item.model}</Text>
              <Text>{item.year}</Text>
            </Box>
          ))}
        </Box>
      ) : null}

      <Heading color={"black"} p={4} textAlign={"center"}>
        Add Car Details
      </Heading>
      <Stack
        width={{ base: "300px", md: "500px", lg: "500px" }}
        boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        direction={"column"}
        gap={4}
        margin={"auto"}
        mt={2}
        justifyContent={"center"}
        alignItems={"center"}
        p={10}
        pb={5}
        borderRadius={5}
      >
        <Input
          border={"1px solid gray"}
          type="text"
          placeholder="OEM Refrance ID"
          name="oemSpecs"
          value={oemId}
        />
        <Input
          border={"1px solid gray"}
          type="text"
          placeholder="Title"
          name="title"
          value={inventoryInfo.title}
          onChange={handleChange}
        />
        <Textarea
          border={"1px solid gray"}
          placeholder="Description"
          name="description"
          value={inventoryInfo.description}
          onChange={handleChange}
        ></Textarea>
        <Input
          border={"1px solid gray"}
          type="number"
          placeholder="Odometer (KMs)"
          name="kmOnOdometer"
          value={inventoryInfo.kmOnOdometer}
          onChange={handleChange}
        />
        <Select
          name="majorScratches"
          border={"1px solid gray"}
          placeholder="Major Scratches"
          onChange={handleChange}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </Select>
        <Select
          name="originalPaint"
          border={"1px solid gray"}
          placeholder="Original Paints"
          onChange={handleChange}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </Select>
        <Input
          border={"1px solid gray"}
          type="text"
          placeholder="Accidents Reported"
          name="accidentsReported"
          value={inventoryInfo.accidentsReported}
          onChange={handleChange}
        />
        <Input
          border={"1px solid gray"}
          type="number"
          placeholder="Previous Buyers"
          name="previousBuyers"
          value={inventoryInfo.previousBuyers}
          onChange={handleChange}
        />
        <Input
          border={"1px solid gray"}
          type="text"
          placeholder="Registration Place"
          name="registrationPlace"
          value={inventoryInfo.registrationPlace}
          onChange={handleChange}
        />
        <Input
          border={"1px solid gray"}
          type="file"
          name="avatar"
          accept="image/*"
          onChange={createProductImagesChange}
          multiple
        />
        {imagesPreview.length > 0 ? (
          <Box height={"150px"} display={"flex"} gap="10px">
            {imagesPreview.map((src, i) => (
              <Image key={i} height={"80%"} alt={i} src={src} />
            ))}
          </Box>
        ) : null}

        <Button
          border={"1px solid gray"}
          onClick={handleAddInventory}
          bgColor={"green"}
          bg={"green.600"}
          color={"white"}
          _hover={{
            bg: "green.700",
          }}
        >
          Add Car To Inventory
        </Button>
      </Stack>
    </Box>
  );
};

export default AddCar;

// const inventoryInfo = {
//   oemSpecs: "646f89f51d551e56281f6c28",
//   kmOnOdometer: 50000,
//   majorScratches: false,
//   originalPaint: true,
//   accidentsReported: 1,
//   previousBuyers: 2,
//   registrationPlace: "New York",
//   title: "2020 Toyota Camry LE",
//   price: 25000,
//   description:
//     "Excellent condition, well-maintained Toyota Camry LE with low mileage.",
//   images: [
//     "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lamborghini/Huracan-EVO/6729/1678692048287/front-left-side-47.jpg",
//     "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwY2FyfGVufDB8fDB8fHww&w=1000&q=80",
//   ],
// };
