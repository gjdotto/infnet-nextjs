import type { ImageLoaderProps } from 'next/image';
import React from "react";
import logo from "../../public/wetravel.png"

export type WetravelLogoProps = {
  width?: string | number;
  height?: string | number;
};

export function WetravelLogo({ width, height }: WetravelLogoProps) {
  return (
    <img
      aria-label="Wetravel"
      src="/wetravel.png"
      width="150"
      height="50"
      style={{ width, height, marginTop: "8px" }}
    >
    </img>
  );
}
