import React from "react";
import { Switch, changeTheme, useTheme } from '@nextui-org/react';
import { SunIcon } from "@/components/Icons/SunIcon";
import { MoonIcon } from "@/components/Icons/MoonIcon";
import { STORAGE_SCREEN_MODE } from "@/constants";

export default function SwitchThemeComponent() {
  const { isDark } = useTheme();

  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem(STORAGE_SCREEN_MODE, nextTheme); // you can use any storage
    changeTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <Switch
    aria-label="content navigation"
    aria-labelledby="content navigation"
    checked={isDark}
    size="xl"
    bordered
    iconOn={<SunIcon filled />}
    iconOff={<MoonIcon filled />}
    onChange={handleChange}
  />
  )
}
