import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../features/studentSlice";
import { useNavigate } from "react-router-dom";
import { updateStudent } from "../features/studentSlice";
import { useState } from "react";
import { clearData } from "../features/studentSlice";
import { useEffect } from "react";

const StudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, status } = useSelector((state) => state.student);
  const [update, setUpdate] = useState({
    name: student.name || "",
    course: student.course || "",
    age: student.age || "",
  });
  const handleDeleteStudent = async () => {
    await dispatch(deleteStudent(student._id)).unwrap();
  };
  console.log(status);
  const handleUpdate = async () => {
    const finalUpdate = {
      name: update.name.trim() !== "" ? update.name : student.name,
      course: update.course.trim() !== "" ? update.course : student.course,
      age: update.age !== "" ? update.age : student.age,
    };

    await dispatch(
      updateStudent({ id: student._id, data: finalUpdate })
    ).unwrap();

    setUpdate({
      name: finalUpdate.name,
      course: finalUpdate.course,
      age: finalUpdate.age,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((pval) => ({
      ...pval,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!student._id && status !== "loading") {
      navigate("/");
    }
  }, [student._id, status]);

  return (
    <>
      <div className="bg-gray-800 h-screen text-gray-200">
        {status === "loading" ? (
          <p className="text-center pt-40 text-2xl">Loading...</p>
        ) : !student._id ? (
          <div className="relative h-screen">
            <Link
              to="/"
              className="bg-gray-300 max-h-11 absolute top-[35%] left-[40%] px-4 py-2 rounded-2xl text-black hover:bg-gray-200"
            >
              Login Expired, Sign In here
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-12">
            <p className="text-5xl mt-20">Student Details</p>

            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                onChange={(e) => handleChange(e)}
                value={update.name}
                placeholder={student.name || ""}
                className="bg-gray-600 px-4 py-1 ms-10"
              />
            </div>

            <div>
              <label>Age: </label>
              <input
                type="number"
                name="age"
                onChange={(e) => handleChange(e)}
                value={update.age}
                placeholder={student.age || ""}
                className="bg-gray-600 px-4 py-1 ms-10"
              />
            </div>

            <div>
              <label>Email: </label>
              <input
                type="email"
                placeholder={student.email || ""}
                className="bg-gray-600 px-4 py-1 ms-10 w-[250px]"
                disabled
              />
            </div>

            <div>
              <label>Course: </label>
              <input
                type="text"
                name="course"
                onChange={(e) => handleChange(e)}
                value={update.course}
                placeholder={student.course || ""}
                className="bg-gray-600 px-4 py-1 ms-10"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400 cursor-pointer"
            >
              Save Details
            </button>

            <button
              onClick={handleDeleteStudent}
              className="bg-red-500 text-black font-bold px-4 py-2 rounded-xl hover:bg-red-800 cursor-pointer"
            >
              Delete Student
            </button>

            <button
              onClick={() => {
                navigate("/");
                dispatch(clearData());
              }}
              className="bg-red-500 text-black font-bold px-4 py-2 rounded-xl hover:bg-red-800 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentDetail;
