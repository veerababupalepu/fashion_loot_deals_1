"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: "!bg-white dark:!bg-neutral-900 !text-neutral-900 dark:!text-white !shadow-lg !rounded-xl",
        duration: 3000,
      }}
    />
  );
}
