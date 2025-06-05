import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex content-center justify-between">
      <p className="font-mono text-base">Guillermo Casado 2025</p>
      <div className="flex">
        <button className="cursor-pointer px-1 text-xl">
          <FaGithub />
        </button>
        <button className="cursor-pointer px-1 text-xl">
          <FaLinkedin />
        </button>
      </div>
    </div>
  );
}
