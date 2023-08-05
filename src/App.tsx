import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import {routePath} from "./routes/path";
import Todos from "./pages/todos";
import Login from "./pages/login/login";
import Todo from "./pages/todo/todo";


function App() {
  useEffect(() => {
    //TODO: handle redirect to list todo page if uri is root path
    // if (location.pathname === routePath.Root) {
    //     window.location.href = routePath.Todos
    // }
  })

  return (
      <React.Suspense fallback={<></>}>
          <Routes>
              <Route
                  path={routePath.Login}
                  element={
                      <React.Suspense fallback={null}>
                          <Login />
                      </React.Suspense>
                  }
              />
              <Route
                  path={routePath.Login}
                  element={
                      <React.Suspense fallback={null}>
                          //TODO: create register component
                          <div>Register</div>
                      </React.Suspense>
                  }
              />
              <Route path={routePath.Todos} element={<Todos />} />
              <Route
                  path={routePath.Todo}
                  element={
                      <React.Suspense fallback={null}>
                          <Todo />
                      </React.Suspense>
                  }
              />
          </Routes>
      </React.Suspense>
  );
}

export default App;
