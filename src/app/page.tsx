"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { Dialog } from "@/components/ui/dialog";
import { tree } from "next/dist/build/templates/app-page";
import { SolanaWallet } from "./_components/SolanaWallet";
import { EthWallet } from "./_components/EthWallet";
import WalletGenerator from "./_components/Walletgenerator";

export default function Home() {
  const [mnemonic, setmnemonic] = useState("");
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      {/* <Button
        onClick={async () => {
          const mn = await generateMnemonic();
          setmnemonic(mn);
          console.log(mnemonic);
        }}
      >
        Cerate Seed Phrase
      </Button>

      <Dialog>
        <input
          type="text"
          value={mnemonic}
          className="w-[100%] text-white bg-slate-800 text-center"
          disabled
        />
      </Dialog>

      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} /> */}
      <WalletGenerator />
    </main>
  );
}
