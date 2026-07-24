import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ITEMS_PER_PAGE } from "@/constants/constants";
import { useTransactionStore } from "@/stores/transactionStore";
import type { Transaction } from "@/stores/transactionStore";


export function Pagination({ onPageChange }: { onPageChange: (paginatedTransactions: Transaction[]) => void }) {
  const transactions = useTransactionStore((state) => state.transactions);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = transactions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    onPageChange(transactions.slice(startIndex, endIndex));

  }, [transactions, currentPage]);

  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, totalItems);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages] as const;
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
    }

    return [1, "ellipsis", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "ellipsis", totalPages] as const;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-gray-500">
        { totalItems > 0 && `${startItem} a ${endItem} | `}{totalItems} resultados
      </p>
      <PaginationContent className="mx-0 w-auto justify-end">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Página anterior"
              className={`size-8 rounded-md border border-gray-200 p-0 text-gray-500 hover:bg-gray-50 ${safeCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                goToPage(safeCurrentPage - 1);
              }}
            >
              <ChevronLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>
          {visiblePages.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <span className="flex size-8 items-center justify-center text-sm text-gray-500">
                    ...
                  </span>
                </PaginationItem>
              );
            }

            const isActive = item === safeCurrentPage;

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={isActive}
                  className={`size-8 rounded-md p-0 text-sm ${isActive ? "bg-brand text-white hover:bg-brand-dark hover:text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(item);
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Próxima página"
              className={`size-8 rounded-md border border-gray-200 p-0 text-gray-500 hover:bg-gray-50 ${safeCurrentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                goToPage(safeCurrentPage + 1);
              }}
            >
              <ChevronRight className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </PaginationContent>
    </div>
  );
}
