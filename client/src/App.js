import React from "react";
import Home from "./pages/home/Home";
import { ConversationContextProvider } from "./context/conversationContext";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/socketContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative min-h-screen w-full text-white font-sans">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: `url("http://localhost:3000/bgo.webp")` }}
      ></div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[-1]" />

      {/* App content */}
      <AuthContextProvider>
        <SocketContextProvider>
          <ConversationContextProvider>
            <main className="relative z-10 min-h-screen">
              <Home />
              <ToastContainer position="top-right" autoClose={3000} />
            </main>
          </ConversationContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
