"use client";

import React from "react";
import UpdateList from "./updateList";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "@/app/redux/store";
import Header from "@/app/component/Header";

const page = ({ params }) => {

  const id = params.id

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <UpdateList id={id} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default page;
