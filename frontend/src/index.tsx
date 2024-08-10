import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { TaskTimeProvider } from "./utils/TaskTimeProvider";


const container = document.getElementById("root")!; // ルート要素取得. !を入れることでnullを明示的に返却しない
const root = createRoot(container); // ルートコンテナでcreateRoot呼び出し

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <TaskTimeProvider>
        <App />
      </TaskTimeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
