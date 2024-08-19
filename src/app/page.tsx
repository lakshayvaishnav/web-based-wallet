"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateMnemonic } from "bip39";

export default function Home() {
  const [mnemonic, setmnemonic] = useState("");
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Button
        onClick={async () => {
          const mn = await generateMnemonic();
          setmnemonic(mn);
          console.log(mnemonic);
        }}
      >
        Cerate Seed Phrase
      </Button>
    </main>
  );
}
