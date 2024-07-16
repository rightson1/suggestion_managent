"use client";
import React from "react";
import { VictoryContainer, VictoryPie, VictoryTooltip } from "victory";
const Pie = ({ data }: { data: { x: string; y: number; color: string }[] }) => {
  return (
    <VictoryPie
      containerComponent={
        <VictoryContainer
          style={{
            // pointerEvents: "auto",
            // userSelect: "auto",
            touchAction: "auto",
          }}
        />
      }
      data={data}
      colorScale={data.map((d) => d.color)}
      cornerRadius={5}
      padAngle={3}
      padding={50}
      innerRadius={70}
      labelComponent={<VictoryTooltip />}
      //   rounded
    />
  );
};

export default Pie;
