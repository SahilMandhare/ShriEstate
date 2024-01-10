"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./component/Header";
import HomePage from "./homePage.jsx";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Home() {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <HomePage />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </>
  );
}
