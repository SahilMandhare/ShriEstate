"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "../component/Header";
import CreateList from "./createList";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function page() {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <CreateList />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </>
  );
}
