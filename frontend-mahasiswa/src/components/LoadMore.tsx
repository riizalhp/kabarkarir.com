import React from 'react';

interface LoadMoreProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  itemsShown: number;
  totalItems: number;
}

const LoadMore: React.FC<LoadMoreProps> = ({
  hasMore,
  isLoading,
  onLoadMore,
  itemsShown,
  totalItems,
}) => {
  if (!hasMore && itemsShown >= totalItems) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <p className="text-sm text-gray-600 mb-4">
        Menampilkan {itemsShown} dari {totalItems} items
      </p>
      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Memuat...
            </>
          ) : (
            <>
              <i className="fas fa-arrow-down mr-2"></i>
              Muat Lebih Banyak
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default LoadMore;
