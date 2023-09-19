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
  platformList: platform[];
  setPlatformList: Dispatch<SetStateAction<platform[]>>;
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
        setPlatformList(platformData.results.slice(0, 7));
        console.log(platformData);
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="text-white">
        <div className="text-center mb-2 font-semibold">Platforms</div>
        {platformList?.map((platform, index) => {
          return (
            <div key={platform.provider_id} className="">
              <input
                type="checkbox"
                name={platform.provider_name}
                value={platform.provider_name}
                id={`checkbox-${index}`}
                checked={checked[index]}
                onChange={() => handleChange(index)}
              />
              <label className="ml-2" htmlFor={`checkbox-${index}`}>
                {platform.provider_name}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
