import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex content-center justify-between">
      <p className="font-mono text-xs">Guillermo Casado 2025</p>
      <div className="flex">
        <button className="cursor-pointer px-1">
          <FaGithub />
        </button>
        <button className="cursor-pointer px-1">
          <FaLinkedin />
        </button>
      </div>
    </div>
  );
}
