import { ReactNode } from "react"

type ModalFormProps = {
 showModalForm: boolean,
 title: string,
 onClose: () => void,
 children: ReactNode
}

export default function ModalForm({ showModalForm, title, onClose, children }: ModalFormProps) {
 return (
  <div>
   {showModalForm && (
    <div>
     <div>
      <h2>{title}</h2>
      <button onClick={onClose}>x</button>
     </div>
     {children}
    </div>
   )}
  </div>
 )
}