"use client"
import Image from "next/image";

export default function TotekafeLogo() {
  const logoUrl = "https://i.imgur.com/vup9m6l.png";

  return (
    <Image
      src={logoUrl}
      alt="Totekafe Logo"
      width={100}
      height={100}
      className="object-contain"
    />
  );
}
