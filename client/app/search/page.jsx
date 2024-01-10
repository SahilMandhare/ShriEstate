"use client";

import React from "react";
import Search from "./search";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "@/app/redux/store";
import Header from "@/app/component/Header";

const page = () => {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Search />
        </PersistGate>
      </Provider>
    </>
  );
};

export default page;
