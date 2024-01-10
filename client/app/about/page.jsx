"use client";

import React from "react";
import Header from "../component/Header";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const about = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div>
          <div className="py-20 px-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-white">
              About Shri Estate
            </h1>
            <p className="mb-4 text-white">
              Shri Estate is a leading shri estate agency that specializes in
              helping clients buy, sell, and rent properties in the most
              desirable neighborhoods. Our team of experienced agents is
              dedicated to providing exceptional service and making the buying
              and selling process as smooth as possible.
            </p>
            <p className="mb-4 text-white">
              Our mission is to help our clients achieve their shri estate goals
              by providing expert advice, personalized service, and a deep
              understanding of the local market. Whether you are looking to buy,
              sell, or rent a property, we are here to help you every step of
              the way.
            </p>
            <p className="mb-4 text-white">
              Our team of agents has a wealth of experience and knowledge in the
              shri estate industry, and we are committed to providing the
              highest level of service to our clients. We believe that buying or
              selling a property should be an exciting and rewarding experience,
              and we are dedicated to making that a reality for each and every
              one of our clients.
            </p>
          </div>
        </div>
      </Provider>
    </>
  );
};

export default about;
