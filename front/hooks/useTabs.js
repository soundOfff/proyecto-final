"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function useTabs({ TAB_TYPES }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    TAB_TYPES.find((tab) => searchParams.get("type") === tab.value)?.tabIndex
  );

  const handleChange = (_, newValue) => {
    setIsLoading(true);
    setSelectedTab(newValue);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (selectedTab) {
      const tab = TAB_TYPES.find((tab) => tab.tabIndex === selectedTab);
      params.set("type", tab.value);
    } else {
      params.delete("type");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [selectedTab, router, pathname, searchParams, TAB_TYPES]);

  return {
    isLoading,
    selectedTab,
    handleChange,
  };
}
