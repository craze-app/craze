import Router from "./Router";
import React from "react";
import { MantineProvider } from '@mantine/core';
import "./assets/styles/main.scss"


function App() {
  return (
    <MantineProvider withNormalizeCSS>
      <Router />
    </MantineProvider>
  )
}

export default App
