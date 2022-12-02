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
import SignupForm from "./components/Forms/SignupForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { token, login, userId, logout, userName } = useAuth();

  const fetchTodosData = useCallback(async () => {
    // fetching todos API call

    try {
      const res = await axios.get("/getToDos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res, "main response");
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
          logout: logout,
          userId: userId,
          userName: userName,
        }}
      >
        <Router>
          <MainHeader getSearchInput={getSearchInput} />
          {token ? (
            <div className="container flex flex-col sm:flex-row	 mx-auto">
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
            <Routes>
              <Route path="/" element={<LoginForm />} />
            </Routes>
          )}
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
