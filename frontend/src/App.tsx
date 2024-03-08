import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import BookDetails from "./pages/BookDetails";
import CreateBook from "./pages/CreateBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageComments from "./pages/ManageComments";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Sign-up";

// interface Props

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/manage-comment" element={<ManageComments />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
