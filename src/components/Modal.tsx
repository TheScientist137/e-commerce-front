import { useState } from "react"

export default function Modal() {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <div>Im a modal</div>
 )
}