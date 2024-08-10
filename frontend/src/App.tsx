import React from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimerPage from "./pages/TimerPage";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Flex>
          <Box flex="1" p="4" ml={{ base: 0, md: 12 }} mt={{ base: 12, md: 4 }}>
            <Routes>
              <Route path="/" element={<TimerPage />} />
              <Route path="/users" element={<UserPage />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
