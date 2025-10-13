import React, { forwardRef, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';

// Pagination variant types
export type PaginationVariant = 'primary' | 'secondary' | 'tertiary';
export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationTheme = 'light' | 'dark';

// Pagination props interface
export interface PaginationProps {
  variant?: PaginationVariant;
  size?: PaginationSize;
  theme?: PaginationTheme;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
  className?: string;
}

// Pagination component with forwardRef for better ref handling
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = true,
      showPrevNext = true,
      maxVisiblePages = 5,
      disabled = false,
      className = '',
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    
    // Determine effective theme
    const effectiveTheme = theme || (systemTheme as PaginationTheme) || 'light';
    
    // Generate visible page numbers
    const visiblePages = useMemo(() => {
      const pages: (number | 'ellipsis')[] = [];
      
      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate start and end pages
        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);
        
        // Adjust if we're near the beginning or end
        if (currentPage <= halfVisible) {
          endPage = maxVisiblePages;
        } else if (currentPage >= totalPages - halfVisible) {
          startPage = totalPages - maxVisiblePages + 1;
        }
        
        // Add first page and ellipsis if needed
        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) {
            pages.push('ellipsis');
          }
        }
        
        // Add visible pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        // Add ellipsis and last page if needed
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            pages.push('ellipsis');
          }
          pages.push(totalPages);
        }
      }
      
      return pages;
    }, [currentPage, totalPages, maxVisiblePages]);
    
    // Generate CSS class names based on props
    const paginationClasses = [
      styles.pagination,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      disabled && styles.disabled,
      className
    ]
      .filter(Boolean)
      .join(' ');

    // Handle page change
    const handlePageChange = (page: number) => {
      if (disabled || page === currentPage || page < 1 || page > totalPages) {
        return;
      }
      onPageChange(page);
    };

    // Button class generator
    const getButtonClasses = (isActive = false, isDisabled = false) => [
      styles.pageButton,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      isActive && styles.active,
      (isDisabled || disabled) && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    // Navigation button class generator
    const getNavButtonClasses = (isDisabled = false) => [
      styles.navButton,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      (isDisabled || disabled) && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={paginationClasses} role="navigation" aria-label="페이지네이션">
        {/* First page button */}
        {showFirstLast && (
          <button
            className={getNavButtonClasses(currentPage === 1)}
            onClick={() => handlePageChange(1)}
            disabled={disabled || currentPage === 1}
            aria-label="첫 페이지로 이동"
          >
            <Image
              src="/icons/leftdisabled_outline_light_m.svg"
              alt="첫 페이지"
              width={20}
              height={20}
              className={styles.navIcon}
            />
          </button>
        )}

        {/* Previous page button */}
        {showPrevNext && (
          <button
            className={getNavButtonClasses(currentPage === 1)}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            aria-label="이전 페이지로 이동"
          >
            <Image
              src="/icons/leftenable_outline_light_m.svg"
              alt="이전 페이지"
              width={20}
              height={20}
              className={styles.navIcon}
            />
          </button>
        )}

        {/* Page numbers */}
        <div className={styles.pageNumbers}>
          {visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={styles.ellipsis}
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                className={getButtonClasses(page === currentPage)}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                aria-label={`${page}페이지로 이동`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next page button */}
        {showPrevNext && (
          <button
            className={getNavButtonClasses(currentPage === totalPages)}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            aria-label="다음 페이지로 이동"
          >
            <Image
              src="/icons/rightenable_outline_light_m.svg"
              alt="다음 페이지"
              width={20}
              height={20}
              className={styles.navIcon}
            />
          </button>
        )}

        {/* Last page button */}
        {showFirstLast && (
          <button
            className={getNavButtonClasses(currentPage === totalPages)}
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            aria-label="마지막 페이지로 이동"
          >
            <Image
              src="/icons/rightdisabled_outline_light_m.svg"
              alt="마지막 페이지"
              width={20}
              height={20}
              className={styles.navIcon}
            />
          </button>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

// Export default
export default Pagination;

// Additional utility functions for pagination
export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getPageRange = (currentPage: number, itemsPerPage: number): { start: number; end: number } => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = currentPage * itemsPerPage;
  return { start, end };
};

export const isValidPage = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages && Number.isInteger(page);
};

// Pagination info component for displaying current page info
export interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  variant?: PaginationVariant;
  size?: PaginationSize;
  theme?: PaginationTheme;
  className?: string;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  variant = 'primary',
  size = 'medium',
  theme,
  className = ''
}) => {
  const { theme: systemTheme } = useTheme();
  const effectiveTheme = theme || (systemTheme as PaginationTheme) || 'light';
  
  const { start, end } = getPageRange(currentPage, itemsPerPage);
  const actualEnd = Math.min(end, totalItems);
  
  const infoClasses = [
    styles.paginationInfo,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${effectiveTheme}`],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={infoClasses}>
      <span className={styles.infoText}>
        전체 {totalItems.toLocaleString()}개 중 {start.toLocaleString()}-{actualEnd.toLocaleString()}개 표시
      </span>
      <span className={styles.pageInfo}>
        {currentPage} / {totalPages} 페이지
      </span>
    </div>
  );
};

PaginationInfo.displayName = 'PaginationInfo';
