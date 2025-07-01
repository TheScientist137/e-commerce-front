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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;
  return (
    <button className="fixed z-50 bottom-16 right-12 rounded-full p-4 bg-slate-400 dark:bg-slate-700" onClick={() => scrollToTop()}>
      <FaArrowUp />
    </button>
  );
}
