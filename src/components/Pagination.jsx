// function Pagination({ page, totalPages, setPage }) {
//   return (
//     <div className="flex justify-center mt-6 gap-2">
//       <button
//         onClick={() => setPage(page - 1)}
//         disabled={page === 1}
//         className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
//       >
//         Prev
//       </button>

//       <span className="px-3 py-1">
//         {page} / {totalPages}
//       </span>

//       <button
//         onClick={() => setPage(page + 1)}
//         disabled={page === totalPages}
//         className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default Pagination;

function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-3">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm sm:text-base">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;