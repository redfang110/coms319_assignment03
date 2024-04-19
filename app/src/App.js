import "./App.css";
import CreateView from "./views/create_view";
import ReadView from "./views/read_view";
import UpdateView from "./views/update_view";
import DeleteView from "./views/delete_view";
import AboutView from "./views/about_view";
import React, { useState } from "react";

function App() {
  const [currentView, setCurrentView] = useState("create");

  function changeView(view) {
    setCurrentView(view);
  }

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <p onClick={() => changeView("create")}>Create</p>
            </li>
            <li>
              <p onClick={() => changeView("read")}>Read</p>
            </li>
            <li>
              <p onClick={() => changeView("update")}>Update</p>
            </li>
            <li>
              <p onClick={() => changeView("delete")}>Delete</p>
            </li>
            <li>
              <p onClick={() => changeView("about")}>About</p>
            </li>
          </ul>
        </nav>
      </header>
      {currentView === "create" && <CreateView />}
      {currentView === "read" && <ReadView />}
      {currentView === "update" && <UpdateView />}
      {currentView === "delete" && <DeleteView />}
      {currentView === "about" && <AboutView />}
    </div>
  );
}

export default App;
