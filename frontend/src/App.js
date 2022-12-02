import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import SideDrawer from "./components/SideDrawer";
import ToDoView from "./components/todo/ToDoView";
import TasksPage from "./pages/TasksPage";
import MainHeader from "./components/MainHeader";
import SearchResultPage from "./pages/SearchResultPage";
import { useCallback } from "react";
import AuthContext from "./components/context/AuthContext";
import LoginForm from "./components/Forms/LoginForm";
import { useAuth } from "./components/hooks/authHook";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { token, login, userId } = useAuth();

  const fetchTodosData = useCallback(async () => {
    // fetching todos API call

    try {
      const res = await axios.get("/getToDos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res);
      setTodos(res.data.userWithTodos.todos.reverse());
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    fetchTodosData();
  }, [fetchTodosData]);

  const getSearchInput = (input) => {
    setSearchInput(input);
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          userId: userId,
        }}
      >
        <Router>
          <MainHeader getSearchInput={getSearchInput} />
          {token ? (
            <div className="container flex mx-auto">
              <SideDrawer
                todos={todos}
                setTodos={setTodos}
                fetchTodosData={fetchTodosData}
              />

              <Routes>
                {todos.length ? (
                  <Route
                    path="/"
                    element={<Navigate to={`/${todos[0]._id}/tasks`} replace />}
                  />
                ) : (
                  <Route path="/" element={<ToDoView />} />
                )}

                <Route
                  path="/:todoId/tasks"
                  element={
                    <TasksPage todos={todos} fetchTodosData={fetchTodosData} />
                  }
                />
                <Route
                  path="/search"
                  element={
                    <SearchResultPage searchInput={searchInput} todos={todos} />
                  }
                />
              </Routes>
            </div>
          ) : (
            <div>
              <LoginForm />
            </div>
          )}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
