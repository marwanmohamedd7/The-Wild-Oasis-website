"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  updateGuest as apiUpdateGuest,
  createBooking as apiCreateBooking,
  deleteBooking as apiDeleteBooking,
  updateBooking as apiUpdateBooking,
  getBookings,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  return await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // check if user is logged in (authenticated)
  const session = await auth();
  if (!session) throw new Error("You have to be logged in");

  // split string to extract guest nationality and countryFlag
  const [nationality, countryFlag] = formData
    ?.get("nationality")
    ?.split("%") ?? ["", ""];

  // check if national ID is valid
  const nationalID = formData.get("nationalID");
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error(
      "Invalid National ID. Must be alphanumeric and between 6 to 12 characters."
    );

  // update guest object
  const updateGuest = {
    nationality,
    countryFlag,
    nationalID,
  };

  // update guest in database
  apiUpdateGuest(session.user.guestId, updateGuest);

  // revalidate cache guest data
  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be a logged in user to be do such action");

  // Extract data from formData
  // const bookingData = Object.entries(formData.entries());

  const newBooking = {
    ...bookingData,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    guestId: session.user.guestId,
    totalPrice: bookingData.cabinPrice,
  };

  // create booking in database
  apiCreateBooking(newBooking);

  // revalidate cache booking data
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  // redirect to booking greeting page
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session)
    throw new Error("You must be a logged in user to be do such action");

  //2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId"));
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You don't have a booking with this id");

  // 3) Building update booking
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  apiUpdateBooking(bookingId, updateData);

  // 5) Revalidate cache
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 6) Redirect
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  // Artificial deley & error
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw new Error("Not implemented yet");

  const session = await auth();
  if (!session)
    throw new Error("You must be a logged in user to be do such action");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You don't have a booking with this id");

  // delete booking in database
  apiDeleteBooking(bookingId);

  // revalidate cache booking data
  revalidatePath(`/account/reservations`);
}
