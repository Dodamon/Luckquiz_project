import { Outlet } from "react-router-dom";

const GuestQuiz = () => {
  return (
    <>
      <h1>GuestQuiz</h1>
      <Outlet></Outlet>
    </>
  );
};

export default GuestQuiz;
