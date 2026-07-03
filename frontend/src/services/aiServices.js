import axios from "axios";

const API = axios.create({
  baseURL: "https://shoppingkaro-65sf.onrender.com/api/v1",
});

export const askAI = async (question, history) => {
  const { data } = await API.post(
    "/ai/shopping-assistant",

    {
      question,
      history,
    },
  );

  return data;
};
