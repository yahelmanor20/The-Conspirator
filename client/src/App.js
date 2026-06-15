import { useEffect, useState } from "react";
import ConspiracyCard from "./components/ConspiracyCard/ConspiracyCard.js";
import CreateConspiracyForm from "./components/CreateConspiracyForm/CreateConspiracyForm.js";
import SortBar from "./components/sortBar/sortBar.js";
import "./app.css"
import env from "react-dotenv";


function App() {
  const [conspiracies, setConspiracies] = useState([]);
  const [sort, onSort] = useState("date");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [NumberOfConspiracys, setNumberOfConspiracys] = useState(0);

  const fetchConspiracies = async (sortOption = sort) => {
    try {
      const response = await fetch(
        `${env.API_URL}conspiracies?sort=${sortOption}`
      );
      const countResponse = await fetch(
        `http://localhost:5000/conspiracies/count`
      );
      const countData = await countResponse.json();
      const data = await response.json();
      setConspiracies(data);
      onSort(sortOption);
      setNumberOfConspiracys(countData);
    }
   catch (error) {
     console.error(error);
    }
  };

  useEffect(() => {
    fetchConspiracies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>הקונספירטור</h1>
        <p>
        תתעוררו כבשים! 🐑 &#60;---- אתם
        </p>
      </header>
      <button className="primary-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
        {!showCreateForm?"+ קונספירציה חדשה":"סגור"}        
      </button> 
      {
      showCreateForm && (
      <CreateConspiracyForm onConspiracyCreated={fetchConspiracies}/>
      )}
      <br/>

      <SortBar onSortUpdate={fetchConspiracies} currentSort={sort} NumberOfConspiracys={NumberOfConspiracys}/>

      {conspiracies.map((conspiracy) => (
        <ConspiracyCard key={conspiracy._id} conspiracy={conspiracy} onConspiracyUpdated={fetchConspiracies} />
      ))}
    </div>
  );
}

export default App;