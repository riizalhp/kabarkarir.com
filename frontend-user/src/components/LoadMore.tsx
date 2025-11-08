import React from 'react';

interface LoadMoreProps {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  itemsShown: number;
  totalItems: number;
}

const LoadMore: React.FC<LoadMoreProps> = ({ 
  hasMore, 
  isLoading = false, 
  onLoadMore, 
  itemsShown, 
  totalItems 
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p>Menampilkan semua {totalItems} item</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-8 mb-4">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Memuat...</span>
          </>
        ) : (
          <>
            <span>Muat Lebih Banyak</span>
            <i className="fas fa-chevron-down"></i>
          </>
        )}
      </button>
      <p className="text-sm text-gray-500 mt-3">
        Menampilkan {itemsShown} dari {totalItems} item
      </p>
    </div>
  );
};

export default LoadMore;
