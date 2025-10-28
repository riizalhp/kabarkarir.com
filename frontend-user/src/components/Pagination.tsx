import React, { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DOTS = '...';

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  const paginationRange = useMemo(() => {
    const siblingCount = 1;
    // totalPageNumbers: Sibling Count + First Page + Last Page + Current Page + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      Jika jumlah halaman lebih kecil dari angka yang ingin kita tampilkan
      di komponen paginasi, kita kembalikan rentang [1..totalPages]
    */
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    /*
      Kita tidak ingin menampilkan titik-titik jika hanya ada satu nomor halaman
      yang tersisa setelah/sebelum nomor halaman kiri/kanan.
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: Tidak ada titik kiri untuk ditampilkan, tapi ada titik kanan
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPages];
    }

    // Case 3: Tidak ada titik kanan untuk ditampilkan, tapi ada titik kiri
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPages - rightItemCount + 1,
        totalPages
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Tampilkan titik kiri dan kanan
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return []; // Seharusnya tidak terjadi dengan logika saat ini
  }, [totalPages, currentPage]);


  if (totalPages <= 1 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Pagination" className="mt-8">
        <ul className="flex justify-center items-center -space-x-px text-sm">
            <li>
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sebelumnya
                </button>
            </li>

            {paginationRange && paginationRange.map((pageNumber, index) => {
                 if (pageNumber === DOTS) {
                    return (
                        <li key={`${DOTS}-${index}`}>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">...</span>
                        </li>
                    );
                }

                return (
                    <li key={pageNumber}>
                        <button
                            onClick={() => onPageChange(pageNumber as number)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                                currentPage === pageNumber
                                ? 'z-10 bg-primary border-primary text-white hover:bg-blue-600'
                                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                            aria-current={currentPage === pageNumber ? 'page' : undefined}
                        >
                            {pageNumber}
                        </button>
                    </li>
                );
            })}
           
            <li>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Berikutnya
                </button>
            </li>
        </ul>
    </nav>
  );
};

export default Pagination;
