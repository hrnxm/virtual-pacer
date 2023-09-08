import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import MainCtxProvider from "./store/MainCtx";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./routes/Home";
import headerLogo from "./assets/header-logo.svg";
import NotFound from "./routes/NotFound";

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <MainCtxProvider>
                <HashRouter>
                    <header>
                        <Link to="/">
                            <img src={headerLogo} alt="header logo" />
                        </Link>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </main>
                </HashRouter>
            </MainCtxProvider>
        </ChakraProvider>
    );
};

export default App;
