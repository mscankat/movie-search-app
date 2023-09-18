"use client";
import { platform, platformList } from "@/types/dataType";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Platform({
  checked,
  setChecked,
  platformList,
  setPlatformList,
}: {
  checked: boolean[];
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  platformList: platform[] | null;
  setPlatformList: Dispatch<SetStateAction<platform[] | null>>;
}) {
  const handleChange = (position: number) => {
    const updatedChecked = checked.map((item, index) =>
      index === position ? !item : item
    );
    setChecked(updatedChecked);
  };
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("fetching");
        const response = await fetch(apiURL + "/api/platforms");
        const platformData: platformList = await response.json();
        setPlatformList(platformData.data.platforms);
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="">
        <div className="text-center mb-2 font-semibold">Platforms</div>
        {platformList?.map((platform, index) => {
          return (
            <div key={platform.platformId} className="">
              <input
                type="checkbox"
                name={platform.platformName}
                value={platform.platformName}
                id={`checkbox-${index}`}
                checked={checked[index]}
                onChange={() => handleChange(index)}
              />
              <label className="ml-2" htmlFor={`checkbox-${index}`}>
                {platform.platformName}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
