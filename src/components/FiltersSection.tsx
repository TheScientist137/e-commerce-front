import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";

type FiltersSectionProps = {
  title: string;
  isOpen: boolean;
  selected: string | null;
  options: string[];
  onToggle: () => void;
  onSelect: (value: string | null) => void;
};

export default function FiltersSection({
  title,
  isOpen,
  selected,
  options,
  onToggle,
  onSelect,
}: FiltersSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xl">{title}</h4>
        <button onClick={() => onToggle()}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </button>
      </div>

      {isOpen && (
        <div className="">
          {selected ? (
            <div className="flex items-center gap-2">
              {selected}
              <button onClick={() => onSelect(null)}>
                <FaTimes size={18} className="text-red-500" />
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3 border-y-1 py-2">
              {options.length === 1 ? (
                <li>
                  <span>{options[0]}</span>
                </li>
              ) : (
                options.map((option) => (
                  <li
                    key={option}
                    className="flex items-center gap-1"
                  >
                    <IoMdArrowDropright size={22} />
                    <button
                      type="button"
                      onClick={() => onSelect(option)}
                      className="w-full text-left font-semibold"
                    >
                      {option}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
