import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import AuthProvider from "./context/AuthProvider"; // Import AuthProvider
import BookDetails from "./pages/BookDetails";
import CreateBook from "./pages/CreateBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageComments from "./pages/ManageComments";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Sign-up";
import Loader from "./components/Loader";
// interface Props (not needed here)

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        {/* Wrap routes with AuthProvider */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book-details/:id" element={<BookDetails />} />
            <Route path="/manage-comment" element={<ManageComments />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
