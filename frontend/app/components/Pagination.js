// app/components/Pagination.js
'use client';

import Link from 'next/link';

export default function Pagination({ currentPage, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Previous
        </Link>
      )}
      
      {pages.map(page => (
        <Link
          key={page}
          href={`/?page=${page}`}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Next
        </Link>
      )}
    </div>
  );
}