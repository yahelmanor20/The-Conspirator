import { useEffect, useState } from "react";

function App() {
  const [conspiracies, setConspiracies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/conspiracies")
      .then((response) => response.json())
      .then((data) => setConspiracies(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>המערכת הקונספירטור</h1>

      {conspiracies.map((conspiracy) => (
        <div key={conspiracy._id}>
          <h3>{conspiracy.text}</h3>

          <p>
            👍 {conspiracy.likes} | 👎 {conspiracy.disLikes}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;