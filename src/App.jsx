import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/studentSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSign = () => {
    dispatch(login({ email }))
      .unwrap()
      .then(() => {
        navigate("/studentDetail");
      });
  };
  return (
    <>
      <div className="bg-gray-800 text-white h-screen flex items-center justify-center">
        <form
          className="bg-gray-900 px-10 py-8 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-[90%] max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSign();
          }}
        >
          <h2 className="text-2xl font-semibold">Student Login</h2>
          <label className="text-sm w-full text-left">
            Enter your Email to visit dashboard
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 hover:text-black transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
