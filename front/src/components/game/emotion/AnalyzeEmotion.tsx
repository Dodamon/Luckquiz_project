import axios from "axios";
import { Buffer } from "buffer";

const AnalyzeEmotion = async (img: string | undefined | null) => {
  const client_id = "1V5UcPyhK5z1_oZtSe9H";
  const client_secret = "QPJVtqfaRV";
  const apiURL = "https://naveropenapi.apigw.ntruss.com/vision/v1/face"; // 얼굴 감지

 
  const formData = new FormData();
  if (typeof img === "string") {
    const buffer = Buffer.from(img.split(",")[1], "base64");
    const blob = new Blob([buffer], { type: "image/jpeg" });
    formData.append("image", blob);
  }

  const config = {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": client_id,
      "X-NCP-APIGW-API-KEY": client_secret,
      "Content-Type": "multipart/form-data",
    },
  };

  const requestOptions = {
    method: "POST",
    url: apiURL,
    headers: config.headers,
    data: formData,
  };

  try {
    const response = await axios(requestOptions);
    console.log(response.status);
    console.log(response.headers["content-type"]);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default AnalyzeEmotion;
