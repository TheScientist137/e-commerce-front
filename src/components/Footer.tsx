import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <p className="font-space font-bold text-sm">Guillermo Casado 2025</p>
      <div className="flex gap-2">
        <button className="cursor-pointer px-1 text-xl">
          <FaGithub />
        </button>
        <button className="cursor-pointer px-1 text-xl">
          <FaLinkedin />
        </button>
      </div>
    </>
  );
}
