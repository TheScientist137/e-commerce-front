import { useShopContext } from "../hooks/useContext.ts";

export default function FilterCategoryButtons({
  closeMenu,
}: {
  closeMenu: () => void;
}) {
  const { filterProductsByCategory } = useShopContext();
  const categories: string[] = ["TELESCOPES", "MOUNTS", "EYEPIECES", "FILTERS"];

  const handleCategoryClick = (category: string) => {
    filterProductsByCategory(category.toLowerCase());
    closeMenu();
  };

  return (
    <nav className="font-zen text-xs">
      <ul>
        {categories.map((category) => (
          <li key={category} className="py-2 px-4 mb-2">
            <button onClick={() => handleCategoryClick(category.toLowerCase())}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
