"use client";

import React from "react";
import Header from "../component/Header";
import SignIn from "./signin";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const page = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <SignIn />
        </PersistGate>
      </Provider>
    </>
  );
};

export default page;
