// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <button key="ellipsis-start" className="btn-custom btn-pagination">
          ...
        </button>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn-custom ${
            currentPage === page ? "btn-pagination-active" : "btn-pagination"
          }`}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <button key="ellipsis-end" className="btn-custom btn-pagination">
          ...
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md text-xs">
      <div>
        현재 페이지 {(currentPage - 1) * itemsPerPage + 1}에서{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)}까지, 총 {totalItems}{" "}
        항목
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="btn-custom btn-pagination"
        >
          처음
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-custom btn-pagination"
        >
          이전
        </button>
        {renderPageButtons()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-custom btn-pagination"
        >
          다음
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="btn-custom btn-pagination"
        >
          마지막
        </button>
      </div>
    </div>
  );
}
