"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
interface Wallet {
  publickey: string;
  privatekey: string;
  mnemonic: string;
  path: string;
}

const WalletGenerator = () => {
  const [mnemonicWords, SetMnemonicWords] = useState<string[]>(
    Array(12).fill(" ")
  );

  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);
  const [mnemonicInput, setmnemonicInput] = useState<string>("");
  const [visiblePrivatekeys, setvisiblePrivatekeys] = useState<boolean[]>([]);
  const [visiblePhrases, setVisiblePhrases] = useState<boolean[]>([]);
  const [gridView, setgridView] = useState<boolean>(false);
  const pathTypeNames: { [key: string]: string } = {
    "501": "Solana",
    "60": "Ethereum",
  };

  const pathTypeName = pathTypeNames[pathTypes[0] || ""];

  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    const storedMnemonic = localStorage.getItem("mnemonics");
    const storedPathTypes = localStorage.getItem("paths");

    if (storedWallets && storedMnemonic && storedPathTypes) {
      SetMnemonicWords(JSON.parse(storedMnemonic));
      setWallets(JSON.parse(storedWallets));
      setPathTypes(JSON.parse(storedPathTypes));
      setvisiblePrivatekeys(JSON.parse(storedWallets).map(() => false));
      setVisiblePhrases(JSON.parse(storedWallets).map(() => false));
    }
  }, []);

  const handleDeleteWallet = (index: number) => {
    const updatedWallets = wallets.filter((_, i) => i !== index);
    const updatedPathTypes = pathTypes.filter((_, i) => i !== index);

    setWallets(updatedWallets);
    setPathTypes(updatedPathTypes);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    localStorage.setItem("paths", JSON.stringify(updatedPathTypes));
    setvisiblePrivatekeys(visiblePrivatekeys.filter((_, i) => i !== index));
    setVisiblePhrases(visiblePhrases.filter((_, i) => i !== index));
    toast.success("Wallet deleted successfully!");
  };

  const handleClearWallets = () => {
    localStorage.removeItem("wallets");
    localStorage.removeItem("mnemonics");
    localStorage.removeItem("paths");
    setWallets([]);
    SetMnemonicWords([]);
    setPathTypes([]);
    setvisiblePrivatekeys([]);
    setVisiblePhrases([]);
    toast.success("All Wallets cleared.");
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("copied to clipboard");
  };

  const togglePrivatekeyVisibility = (index: number) => {
    setvisiblePrivatekeys(
      visiblePrivatekeys.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const togglePhraseVisibility = (index: number) => {
    setVisiblePhrases(
      visiblePhrases.map((visible, i) => (i === index ? !visible : visible))
    );
  };
};
