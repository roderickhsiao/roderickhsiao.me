"use client";
import { useEffect } from "react";
import { auroraCanvas } from "./auroraCanvas";

export default function AuroraHeaderClient() {
  useEffect(() => {
    const cleanup = auroraCanvas();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  return null;
}
