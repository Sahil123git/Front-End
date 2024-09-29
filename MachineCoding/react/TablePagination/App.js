import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const limit = 2;

export default function App() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [refreshTime, setRefreshTime] = useState(new Date());
  const fetchData = async () => {
    try {
      dispatch({ type: "loading", payload: true });
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "setUser", payload: data.data });
      dispatch({ type: "loading", payload: false });
      setUsers(data.data);
      setRefreshTime(new Date());
      const filteredData = data.data.slice(
        curPage * limit,
        curPage * limit + limit
      );
      setFilteredUsers(filteredData);
    } catch (err) {
      dispatch({ type: "loading", payload: false });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getPrev = () => {
    setCurPage((prev) => prev - 1);
    const filteredData = users.slice(
      (curPage - 1) * limit,
      (curPage - 1) * limit + limit
    );
    setFilteredUsers(filteredData);
  };
  const getNext = () => {
    setCurPage((prev) => prev + 1);
    const filteredData = users.slice(
      (curPage + 1) * limit,
      (curPage + 1) * limit + limit
    );
    setFilteredUsers(filteredData);
  };
  const isNextPossible = () => {
    let totalPage = users.length / limit;
    if (users.length % limit === 0) totalPage = totalPage - 1;
    return curPage + 1 > totalPage;
  };
  const checkDataFetch = () => {
    const dif = new Date().getSeconds() - refreshTime.getSeconds();
    if (dif > 5 && loading === false) {
      console.log("from APi");
      fetchData();
    } else {
      console.log("from Redux");
      setUsers(list);
      const filteredData = list.slice(curPage * limit, curPage * limit + limit);
      setFilteredUsers(filteredData);
    }
  };
  return (
    <div className="App">
      <h1>Table Pagination</h1>
      <button onClick={checkDataFetch}>Refresh Data</button>
      <table style={{ marginTop: "40px" }}>
        <tr>
          <th style={{ paddingRight: "20px" }}>Name</th>
          <th style={{ paddingRight: "20px" }}>Email</th>
          <th style={{ paddingRight: "20px" }}>Mobile</th>
        </tr>
        {filteredUsers.map((ele) => (
          <tr key={ele.id}>
            <td>{ele.name}</td>
            <td>{ele.email}</td>
            <td>{ele.phone}</td>
          </tr>
        ))}
      </table>

      <button disabled={curPage === 0} onClick={getPrev}>
        Prev
      </button>
      {isNextPossible() ? (
        <button disabled>Next</button>
      ) : (
        <button onClick={getNext}>Next</button>
      )}
    </div>
  );
}
