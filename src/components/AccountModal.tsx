import { ReactNode } from "react";

type AccountModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function AccountModal({
  title,
  children,
  isOpen,
  onClose,
}: AccountModalProps) {
  if (!isOpen) return null;
  return (
    <>
      {<div className="fixed inset-0 z-40 backdrop-blur-sm" />}

      <div className="fixed inset-x-8 inset-y-24 z-50 flex flex-col gap-4 rounded-xl bg-slate-200 p-4 text-slate-800 dark:bg-slate-800 dark:text-indigo-50">
        <div className="font-orbitron flex items-center justify-between text-xl font-bold">
          <h2>{title}</h2>
          <button className="text-right text-2xl" onClick={() => onClose()}>
            x
          </button>
        </div>
        <div className="flex h-full flex-col justify-between overflow-y-auto rounded-xl bg-slate-50 p-4 dark:bg-slate-700">
          {children}
        </div>
      </div>
    </>
  );
}
