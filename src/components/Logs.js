import Log from "./Log";
import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Logs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
    .get(`${API}/logs`)
    .then((response) => setLogs(response.data))
    .catch((err) => console.error('catch', err))
  }, []);

  return (
    <div className="Logs">
      <section>
        <table>
          <thead>
            <tr>
              <th>Mistakes</th>
              <th>Captain Name</th>
              <th>See this log</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              return <Log key={index} log={log} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}