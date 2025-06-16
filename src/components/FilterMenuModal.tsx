import { IoClose } from "react-icons/io5";

type FilterMenuModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function FiltersMenuModal({
  title,
  isOpen,
  onClose,
  children,
}: FilterMenuModalProps) {
  if (!isOpen) return null;
  return (
    <>
      {/* Blur Backdrop */}
      {<div className="fixed inset-0 z-40 backdrop-blur-sm" />}

      {/* Fixed Menu on top of Backdrop */}
      <div className="fixed inset-8 z-50 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between font-orbitron text-xl font-bold">
          <h2>{title}</h2>
          <button className="text-right text-2xl" onClick={() => onClose()}>
            <IoClose />
          </button>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 h-full rounded-xl p-4 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
