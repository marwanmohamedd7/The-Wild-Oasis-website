import { getCabin, getBookedDatesByCabinId } from "../../../_lib/data-service";

export async function GET(request, { params }) {
  const [cabin, bookedCabins] = await Promise.all([
    getCabin(params.cabinId),
    getBookedDatesByCabinId(params.cabinId),
  ]);
  return Response.json({ cabin, bookedCabins });
}
