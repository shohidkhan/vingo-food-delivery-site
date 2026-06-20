import React from "react";
import useCurrentUser from "../../hooks/useCurrentUser";

const Home = () => {
  const { currentUser } = useCurrentUser();
  console.log(currentUser);
  return <div>Home</div>;
};

export default Home;
