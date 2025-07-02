type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Mostrar máximo 5 páginas: [1] [2] [3] [...] [última]
  const getPages = () => {
    if (totalPages <= 4) {
      // Si hay 4 o menos páginas, mostrar todas
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    } else {
      // Si hay más de 4, mostrar: 1, 2, 3, "...", última
      return [1, 2, 3, "...", totalPages];
    }  
  };
  const pageNumbers = getPages();
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  if (totalPages <= 1) return null;
  return (
    <div className="mt-8 mb-4 flex items-center justify-center gap-2">
      {/* Previous Page Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pageNumbers.map((item, index) =>
          item === "..." ? (
            <span
              key={`dots-${index}`}
              className="flex h-[40px] min-w-[40px] items-center justify-center text-gray-500 dark:text-gray-400"
            >
              ···
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item as number)}
              className={`flex h-[40px] min-w-[40px] items-center justify-center rounded-lg border transition-colors ${
                currentPage === item
                  ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
              aria-label={`Go to page ${item}`}
              aria-current={currentPage === item ? "page" : undefined}
            >
              {item}
            </button>
          ),
        )}
      </div>

      {/* Next Page Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}
