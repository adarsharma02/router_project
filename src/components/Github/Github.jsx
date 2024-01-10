import { useEffect } from "react";
import { useState } from "react";
import Loader from "../Loader";

function Github() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/search/users?q=location:usa")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data.items); // Assuming the user data is in the 'items' property of the response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching GitHub users:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const userElements = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    userElements.push(
      <li key={user.id}>
        <img
          src={user.avatar_url}
          alt={`Avatar of ${user.login}`}
          width={200}
          height={200}
        />
        <h1>{user.login}</h1>
      </li>
    );
  }

  return (
    <div className="w-screen flex items-center justify-center ">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Github Users</h1>
          <ul>{userElements}</ul>
        </div>
      )}
    </div>
  );
}

export default Github;
