import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`fixed right-12 bottom-36 z-50 rounded-full bg-slate-400 p-4 transition-all duration-500 ease-in-out dark:bg-slate-700 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp />
    </button>
  );
}
