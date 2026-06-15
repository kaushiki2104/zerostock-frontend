import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  const [newMarks, setNewMarks] = useState([
    {
      subject: "",
      score: "",
    },
  ]);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setStudent(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching student details");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const addField = () => {
    setNewMarks([
      ...newMarks,
      {
        subject: "",
        score: "",
      },
    ]);
  };

  const removeField = (index) => {
    const updated = newMarks.filter((_, i) => i !== index);
    setNewMarks(updated);
  };

  const handleNewChange = (index, field, value) => {
    const updated = [...newMarks];
    updated[index][field] = value;
    setNewMarks(updated);
  };

  const submitNewMarks = async () => {
    try {
      const filteredMarks = newMarks.filter(
        (mark) => mark.subject && mark.score
      );

      if (filteredMarks.length === 0) {
        return alert("Please add at least one mark");
      }

      await api.post(`/students/${id}/marks`, filteredMarks);

      setNewMarks([
        {
          subject: "",
          score: "",
        },
      ]);

      fetchStudent();

      alert("Marks added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding marks");
    }
  };

  if (!student) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow max-w-3xl mx-auto">
      {/* Student Info */}
      <h2 className="text-2xl font-bold mb-2">
        {student.first_name} {student.last_name}
      </h2>

      <p className="text-gray-600">
        <span className="font-medium">Email:</span>{" "}
        {student.email}
      </p>

      <p className="text-gray-600 mb-6">
        <span className="font-medium">Phone:</span>{" "}
        {student.phone}
      </p>

      {/* Existing Marks */}
      <h3 className="text-xl font-semibold mb-4">
        Existing Marks
      </h3>

      {student.marks?.length > 0 ? (
        <div className="space-y-3 mb-8">
          {student.marks.map((mark) => (
            <div
              key={mark.id}
              className="flex justify-between items-center bg-gray-50 border rounded-lg p-4"
            >
              <span className="font-medium">
                {mark.subject}
              </span>

              <span className="font-bold text-blue-600">
                {mark.marks}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border rounded-lg p-4 text-gray-500 mb-8">
          No marks available
        </div>
      )}

      {/* Add Marks */}
      <h3 className="text-xl font-semibold mb-4">
        Add Marks
      </h3>

      <div className="space-y-3">
        {newMarks.map((mark, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <input
              type="text"
              placeholder="Subject"
              className="border p-3 rounded-lg"
              value={mark.subject}
              onChange={(e) =>
                handleNewChange(
                  index,
                  "subject",
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Score"
              className="border p-3 rounded-lg"
              value={mark.score}
              onChange={(e) =>
                handleNewChange(
                  index,
                  "score",
                  e.target.value
                )
              }
            />

            <button
              onClick={() => removeField(index)}
              className="bg-red-500 text-white rounded-lg px-4 py-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={addField}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          + Add More
        </button>

        <button
          onClick={submitNewMarks}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Submit Marks
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;