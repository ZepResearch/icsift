"use client";
import GoogleTranslate from "next-google-translate-widget";

export default function GoogleTranslateMenu() {
  return <GoogleTranslate pageLanguage="en" includedLanguages="en,tl,hi" />;
}