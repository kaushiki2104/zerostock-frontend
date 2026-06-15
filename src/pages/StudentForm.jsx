// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../api/axios";

// function StudentForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [student, setStudent] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (id) {
//       api.get(`/students/${id}`).then((res) => {
//         setStudent(res.data.data);
//       });
//     }
//   }, [id]);

//   const validate = () => {
//     let temp = {};
//     if (!student.first_name) temp.first_name = "Required";
//     if (!student.email) temp.email = "Required";
//     setErrors(temp);
//     return Object.keys(temp).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     if (id) {
//       await api.put(`/students/${id}`, student);
//     } else {
//       await api.post("/students", student);
//     }

//     navigate("/");
//   };

//   return (
//       <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">
//         {id ? "Edit Student" : "Add Student"}
//       </h2>

//      <form onSubmit={handleSubmit} className="space-y-5">

//   <div>
//     <label className="block text-sm font-medium mb-1">
//       First Name
//     </label>
//     <input
//       type="text"
//       className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//       value={student.first_name}
//       onChange={(e) =>
//         setStudent({ ...student, first_name: e.target.value })
//       }
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium mb-1">
//       Last Name
//     </label>
//     <input
//       type="text"
//       className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//       value={student.last_name}
//       onChange={(e) =>
//         setStudent({ ...student, last_name: e.target.value })
//       }
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium mb-1">
//       Email
//     </label>
//     <input
//       type="email"
//       className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//       value={student.email}
//       onChange={(e) =>
//         setStudent({ ...student, email: e.target.value })
//       }
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium mb-1">
//      Phone No
//     </label>
//     <input
//       type="number"
//       className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//       value={student.phone}
//       onChange={(e) =>
//         setStudent({ ...student, phone: e.target.value })
//       }
//     />
//   </div>

//   <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
//     Save Student
//   </button>
// </form>
//     </div>
//   );
// }

// export default StudentForm;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`).then((res) => {
        setStudent(res.data.data);
      });
    }
  }, [id]);

  const validate = () => {
    let temp = {};

    if (!student.first_name.trim())
      temp.first_name = "First name is required";

    if (!student.last_name.trim())
      temp.last_name = "Last name is required";

    if (!student.email.match(/^\S+@\S+\.\S+$/))
      temp.email = "Valid email required";

    if (!student.phone.match(/^\d{10}$/))
      temp.phone = "Phone must be 10 digits";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (id) {
        await api.put(`/students/${id}`, student);
      } else {
        await api.post("/students", student);
      }
      navigate("/");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">
        {id ? "Edit Student" : "Add Student"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* First Name */}
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border rounded-lg p-3"
            value={student.first_name}
            onChange={(e) =>
              setStudent({ ...student, first_name: e.target.value })
            }
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border rounded-lg p-3"
            value={student.last_name}
            onChange={(e) =>
              setStudent({ ...student, last_name: e.target.value })
            }
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={student.email}
            onChange={(e) =>
              setStudent({ ...student, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            placeholder="Phone (10 digits)"
            className="w-full border rounded-lg p-3"
            value={student.phone}
            onChange={(e) =>
              setStudent({ ...student, phone: e.target.value })
            }
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;