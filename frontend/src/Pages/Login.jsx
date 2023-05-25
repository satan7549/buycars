import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Auth/Auth.action";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Initial state for login details
const initState = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginDetails, setLoginDetails] = useState(initState);
  const { email, password } = loginDetails;
  const { loading, data, error } = useSelector((store) => store.auth);
  const { isAuthenticated } = data;
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (state.from) {
        navigate(state.from);
      } else {
        navigate("/signup");
      }
    }
  }, [isAuthenticated]);

  // Handles input change event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // Handles key press event (Enter key) for submitting the login form
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // Handles login attempt
  const handleLogin = async () => {
    if (email === "" || password === "") {
      return alert("fill both credentials");
    }
    dispatch(login(loginDetails));
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
          LOGIN FORM
        </Heading>
        <FormControl p={2}>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="text"
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
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Login;
