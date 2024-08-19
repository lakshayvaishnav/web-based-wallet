import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import nacl from "tweetnacl";

import { derivePath } from "ed25519-hd-key";
import { Button } from "@/components/ui/button";
interface SolanaWalletProps {
  mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [publicKeys, setpublicKeys] = useState<string[]>([]);

  return (
    <div>
      <Button
        onClick={function () {
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString()).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setcurrentIndex(currentIndex + 1);
          setpublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
        }}
      >
        Add Wallet
      </Button>
    </div>
  );
}
