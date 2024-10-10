import "./App.css";
import Body from "./Components/Body/Body";
import { useEffect, useState } from "react";
import Dropdown from "./Components/Header/Dropdown";
import { handleAddQueryFilters } from "./set.query";

function App() {
  const currentUrl = new URL(window.location.href);
  const orderingParam = currentUrl.searchParams.get("ordering")
    ? currentUrl.searchParams.get("ordering")
    : "Title";
  const groupingParam = currentUrl.searchParams.get("grouping")
    ? currentUrl.searchParams.get("grouping")
    : "Priority";
  const [filterState, setFilterState] = useState({
    ordering: orderingParam,
    grouping: groupingParam,
  });
  const [tickets, setTickets] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    handleAddQueryFilters(filterState.ordering, filterState.grouping);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setTickets(result.tickets);
        setUsers(result.users);
        console.log(tickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="header">
        <Dropdown setFilterState={setFilterState} filterState={filterState} />
      </div>
      <Body
        filterState={filterState}
        setTickets={setTickets}
        tickets={tickets}
        users={users}
      />
    </div>
  );
}

export default App;
