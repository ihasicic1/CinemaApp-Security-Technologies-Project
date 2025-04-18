import { CompactPagination } from "../CompactPagination";

import "./homepageGridSection.scss";

export type HomepageSectionProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
  itemsPerPage: number;
  currentPage: number;
  totalElements: number;
  onPageChange: (page: number) => void;
};

export function HomepageSection({
  title,
  className = "",
  children,
  itemsPerPage,
  currentPage,
  totalElements,
  onPageChange,
}: HomepageSectionProps) {
  return (
    <div className={`section-container ${className}`}>
      <div className="section-header">
        <p className="section-title">{title}</p>
      </div>
      <div className="section-content">{children}</div>

      <div className="section-pagination">
        <CompactPagination
          currentPage={currentPage}
          totalElements={totalElements}
          pageSize={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
