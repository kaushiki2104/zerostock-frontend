// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className="bg-white shadow-sm">
//       <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
//         <Link to="/" className="text-xl font-semibold text-blue-600">
//           Student Management
//         </Link>
//         <Link
//           to="/add"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Student
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-lg sm:text-xl font-semibold text-blue-600"
        >
          Student Management
        </Link>

        <Link
          to="/add"
          className="text-sm sm:text-base bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;