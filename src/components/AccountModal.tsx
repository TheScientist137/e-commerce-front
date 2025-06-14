import { ReactNode } from "react";

type AccountModalProps = {
  title: string;
  isOpen: boolean;
  onclose: () => void;
  children: ReactNode;
};

export default function AccountModal({
  title,
  children,
  isOpen,
  onclose,
}: AccountModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 left-0 z-50 flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 shadow-lg">
      <div className="font-orbitron flex items-center justify-between text-xl font-bold">
        <h2>{title}</h2>
        <button className="text-right text-2xl" onClick={() => onclose()}>
          x
        </button>
      </div>
      {children}
    </div>
  );
}
