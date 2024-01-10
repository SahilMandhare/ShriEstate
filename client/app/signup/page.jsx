"use client"

import React from "react";
import Header from "../component/Header";
import Signup from "./signup";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

const signup = () => {

  return (
    <>
      <Provider store={store }>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Signup />
        </PersistGate>
      </Provider>
    </>
  );
};

export default signup;
