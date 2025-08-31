import React from "react";
import { Routes,Route } from "react-router-dom";
import Signup from "./components/SignUp/Signup";
import SignIn from "./components/SignUp/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateForm from "./components/Dashboard/createForm/CretaeForm";
import ShowForm from "./components/Dashboard/ShowForm/ShowForm";

const App: React.FC = ()=>{
  return <>
  <Routes>
    <Route path="/" element = {<Signup />} />
    <Route path="/signin" element = {<SignIn />} />
    <Route path="/dashboard" element = {<Dashboard />} />
    <Route path="/dashboard/createnote" element = {<CreateForm />} />
    <Route path="/dashboard/shownote/:id" element = {<ShowForm />} />
  </Routes>
  </>

}

export default App;