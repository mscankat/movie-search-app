"use client";
import { Box, Slider } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
function valuetext(value: number) {
  return `${value}°C`;
}

export default function ReleaseYear({
  value,
  setValue,
}: {
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
}) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const years = Array.from(new Array(34), (val, index) =>
    (2023 - index).toString()
  );
  years.unshift("-");
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-semibold mb-1 text-white">Release Year</div>
      <Box className="  " sx={{ width: 300 }}>
        <Slider
          color="secondary"
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={1990}
          max={2023}
        />
      </Box>
    </div>
  );
}
