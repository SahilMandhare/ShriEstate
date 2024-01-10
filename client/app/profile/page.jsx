"use client";

import React from "react";
import Header from "../component/Header";
import Profile from "./profile";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

const page = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Profile />
        </PersistGate>
      </Provider>
    </>
  );
};

export default page;
