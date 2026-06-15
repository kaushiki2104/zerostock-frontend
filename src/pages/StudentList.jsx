import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/students?page=${page}&limit=6`);
      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      alert("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const deleteStudent = async (id) => {
    if (!confirm("Are you sure?")) return;
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Students</h1>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : students.map((student) => (
              <div
  key={student.id}
  className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
>
  <h2 className="font-semibold text-lg">
    {student.first_name} {student.last_name}
  </h2>

  <p className="text-sm text-gray-500 break-all">
    {student.email}
  </p>

  <div className="flex justify-between mt-4 text-sm font-medium">
    <Link
      to={`/student/${student.id}`}
      className="text-blue-600 hover:underline"
    >
      View
    </Link>

    <Link
      to={`/edit/${student.id}`}
      className="text-yellow-600 hover:underline"
    >
      Edit
    </Link>

    <button
      onClick={() => deleteStudent(student.id)}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
    <Link
  to={`/student/${student.id}?addMarks=true`}
  className="text-green-600 hover:underline"
>
  Add Marks
</Link>

  </div>
</div>
            ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
}

export default StudentList;