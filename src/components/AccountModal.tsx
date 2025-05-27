import { ReactNode } from "react";

type AccountModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onclose: () => void;
};

export default function AccountModal({
  children,
  isOpen,
  onclose,
}: AccountModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 left-0 z-50 bg-white p-4 shadow-lg m-8 rounded-xl">
      <button className="text-2xl" onClick={() => onclose()}>x</button>
      {children}
    </div>
  );
}
