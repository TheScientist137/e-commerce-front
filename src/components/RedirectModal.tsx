import { ReactNode } from "react"

type RedirectModalProps = {
 showModalRedirect: boolean,
 children: ReactNode
}

export default function ModalRedirect({
 showModalRedirect,
 children
}: RedirectModalProps) {
 return (
  <div>
   {showModalRedirect && (
    <div>
     {children}
    </div>
   )}
   </div>
 )
}