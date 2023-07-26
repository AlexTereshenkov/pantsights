import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BasicTabs from "../src/Tabs";

export default function Index() {
  return (
    <Container maxWidth="false">
      <Box sx={{ my: 4 }}>
        <BasicTabs />
      </Box>
    </Container>
  );
}
