"use client";
import { Box, Slider } from "@mui/material";
import { useEffect, useState } from "react";
function valuetext(value: number) {
  return `${value}°C`;
}

export default function ReleaseYear() {
  const [value, setValue] = useState<number[]>([1990, 2023]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-semibold mb-1">Release Year</div>
      <div>{value[0] + " - " + value[1]}</div>
      <Box className="  " sx={{ width: 300 }}>
        <Slider
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
