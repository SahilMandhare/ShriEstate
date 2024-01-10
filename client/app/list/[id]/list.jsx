import React, { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useDispatch, useSelector } from "react-redux";
import { errorData } from "@/app/redux/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const list = (props) => {
  SwiperCore.use([Navigation]);

  const [list, setList] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();

  const currentUser = useSelector((state) => state.userSlice.currentUser);

  useEffect(() => {
    const DisplayList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/lists/list/" + props.id
        );

        const data = await response.json();

        if (!data) {
          router.push("/profile");
          return;
        }

        setList(data);
      } catch (error) {
        dispatch(errorData(error.message));
      }
    };

    if (!currentUser) router.push("/signin")
    
    DisplayList();
  }, []);

  useEffect(() => {
    
    const DisplayLandLord = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/user/get/" + list.useRef
        );

        const data = await response.json();

        if (!data) {
          router.push("/profile");
          return;
        }

        setUser(data);
      } catch (error) {
        dispatch(errorData(error.message));
      }
    };

    DisplayLandLord();
  }, [list]);

  return (
    currentUser && list && user && (
      <>
        <div>
          <Swiper navigation>
            {list.imageUrls.map((url, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url.image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="my-10 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">
              {list.name} - ${list.regularPrice} / {list.type === "Sell" ? "only" : "month"}
            </h1>
            <p className="mt-4 mb-2">{list.address}</p>
            <div className="flex gap-2">
              <div className="p-2 flex justify-center items-center bg-red-800 w-60 rounded-lg">
                For {list.type}
              </div>
              <div className="p-2 flex justify-center items-center bg-green-800 w-60 rounded-lg text-center">
                ${+list.regularPrice - +list.discountPrice} discount
              </div>
            </div>
            <div className="my-2">
              <p>Description - {list.description}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-green-600">
              <p>{list.bedrooms} Beds</p>
              <p>{list.bathrooms} Baths</p>
              <p>{!list.parking && "No"} Parking</p>
              <p>{!list.furnished && "Not"} Furnished</p>
            </div>
            {currentUser._id !== list.useRef && (
              <Link href={`mailto:${user.email}`}>
              <div className="my-2 p-2 bg-slate-800 text-center rounded-lg cursor-pointer">
                Contact Landlord
              </div>
              </Link>
            )}
          </div>
        </div>
      </>
    )
  )
};

export default list;
