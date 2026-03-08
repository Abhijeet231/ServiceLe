import React, { useEffect, useState } from "react";
import BookingDetailsCard from "@/components/customer/BookingDetailsCard";
import { getBookingDetails } from "@/services/booking.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const BookingsC = () => {
  const [booking, setBooking] = useState(null);

  const {bookingId} = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBookingDetails(bookingId);
        setBooking(res.data.data);
      } catch (error) {
        toast.error("Error While Fetching Booking Details");
        console.log("Error while fetching Booking detials :", error);
      }
    };
    getData();
  }, []);

  console.log("Booking Details : ", booking)

  return <BookingDetailsCard 
      address={booking?.address}
      city={booking?.city}
      price={booking?.price}
      status={booking?.status}
      beforeImages={booking?.beforeImages}
      afterImages={booking?.afterImages}
    />;
};

export default BookingsC;
