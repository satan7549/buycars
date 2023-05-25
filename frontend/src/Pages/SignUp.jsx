import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
// import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { signIn } from "../Redux/Auth/Auth.action";

// Initial state for signup details
const initState = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [signUPDetails, setSignUPDetails] = useState(initState);
  const { name, email, password } = signUPDetails;
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Handles input change event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUPDetails({ ...signUPDetails, [name]: value });
  };

  // Handles key press event (Enter key) for submitting the signup form
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  // Handles signup attempt
  const handleSignUp = async () => {
    if (name === "" || email === "" || password === "") {
      return alert("fill both credentials");
    }

    dispatch(signIn(signUPDetails));
  };

  return (
    <Container
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        width="full"
        maxWidth="400px"
        borderRadius="lg"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p={4}
      >
        <Heading
          fontWeight="bolder"
          textAlign="center"
          fontSize="20px"
          mb="20px"
        >
          SIGN UP FORM
        </Heading>
        <FormControl p={2}>
          <Input
            name="name"
            value={name}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Enter Username"
            borderRadius="lg"
            focusBorderColor="teal.100"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="email"
            placeholder="Enter Email"
            borderRadius="lg"
            focusBorderColor="teal.100"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="password"
            value={password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="password"
            placeholder="Enter password"
            borderRadius="lg"
            focusBorderColor="teal.100"
            required
          />
        </FormControl>

        <FormControl>
          <Button
            loadingText="Submitting"
            width="full"
            p={4}
            borderRadius="lg"
            colorScheme="teal"
            _hover={{
              bg: "teal.300",
              color: "white",
            }}
            variant="outline"
            mt={4}
            onClick={handleSignUp}
          >
            SIGN IN FORM
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default SignUp;
