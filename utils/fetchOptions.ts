export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
  },
};
