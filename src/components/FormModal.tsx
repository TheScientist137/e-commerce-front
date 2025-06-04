import { ReactNode } from "react";

type FormModalProps = {
  showModalForm: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function FormModal({
  showModalForm,
  title,
  onClose,
  children,
}: FormModalProps) {
  return (
    <div>
      {showModalForm && (
        <div>
          <div className="flex">
            <h2>{title}</h2>
            <button onClick={onClose}>x</button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
