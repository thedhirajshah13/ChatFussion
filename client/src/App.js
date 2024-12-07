import React from "react";
import Home from "./pages/home/Home";
import { ConversationContextProvider } from "./context/conversationContext";

import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/socketContext";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <SocketContextProvider>
        <ConversationContextProvider>
          <Home />
        </ConversationContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
