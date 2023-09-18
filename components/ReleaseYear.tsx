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
  value: number | string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (e: any) => {
    setValue(e.currentTarget.value);
  };
  const years = Array.from(new Array(34), (val, index) =>
    (2023 - index).toString()
  );
  years.unshift("-");
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-semibold mb-1">Release Year</div>
      <select
        className=" w-28 text-center p-1 rounded-md"
        onChange={handleChange}
        value={value || "-"}
      >
        {years.map((year, index) => {
          return (
            <option key={`year${index}`} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
