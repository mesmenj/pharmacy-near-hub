import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PharmacyNearHubLanding from "./pages/home/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState } from "react";
import { LanguageContext, type Language } from "./i18n";
import persistor_store, { store } from "./store/state";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

function App() {
  const [lang, setLang] = useState<Language>("fr");
  return (
    <ErrorBoundary>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor_store}>
            <Toaster />
            <BrowserRouter>
              {/* <ScrollToTop /> */}
              <div className="min-h-screen  font-sans">
                <Header />
                <main className="flex-1 pt-16">
                  <Routes>
                    <Route path="/" element={<PharmacyNearHubLanding />} />
                    {/* 
            <Route path="/contact" element={<Contact />} />
            <Route path="/howItWork" element={<HowItWorks />} />
            <Route path="/service" element={<Service />} /> */}
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </LanguageContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
