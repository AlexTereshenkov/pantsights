import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
} from "victory";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Graphic() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "400" }}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLegend title="Average number of dependencies" data={[]} />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              height={200}
              width={200}
              data={[
                { x: "2022-01-01", y: 50 },
                { x: "2022-02-01", y: 48 },
              ]}
            />
          </VictoryChart>
        </Box>
      </Container>
    </React.Fragment>
  );
}
