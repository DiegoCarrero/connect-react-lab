import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function LogDetails() {
  let navigate = useNavigate();
  const [log, setLog] = useState({});
  let { index } = useParams();

  useEffect(() => {
    axios
    .get(`${API}/logs/${index}`)
    .then((response) => setLog(response.data))
    .catch(() => {
      navigate('/not-found')
    })
  }, [index, navigate]);

  const handleDelete = () => {
    axios
    .delete(`${API}/logs/${index}`)
    .then(() => navigate(`/logs`))
    .catch((e) => console.error(e))
  };
  
  return (
    <article>
      <h3>
        {log.mistakesWereMadeToday ? <span>⭐️</span> : null} {log.name}
      </h3>
      <h5>
        <span>
          <a href={log.url}>{log.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {log.url}
      </h5>
      <h6>{log.category}</h6>
      <p>{log.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/logs`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/logs/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}