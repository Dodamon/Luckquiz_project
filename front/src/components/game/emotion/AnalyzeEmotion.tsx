import React, { useState } from "react";

const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");

const key = "e34f4f9bbcc5477b9edb90650122a6d2";
const endpoint = "https://luckquiz.cognitiveservices.azure.com/";

const credentials = new msRest.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } });
const client = new Face.FaceClient(credentials, endpoint);

interface EmotionType {
  anger: number;
  contempt: number;
  disgust: number;
  fear: number;
  happiness: number;
  neutral: number;
  sadness: number;
  surprise: number;
}

const AnalyzeEmotion: React.FC = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://storage.googleapis.com/luckquiz/5f7797a0-c0cb-4cee-aaf0-cbe167a71da0",
  );
  const [emotionResult, setEmotionResult] = useState<EmotionType | null>(null);

  async function analyzeImage() {
    try {
      let detectedFaces = await client.face.detectWithUrl(imageUrl, {
        detectionModel: "detection_03",
        recognitionModel: "recognition_04",
        returnFaceAttributes: ["emotion"],
      });
      detectedFaces.filter((face: { faceAttributes: { emotion: any } }) => {
        const emotions = face.faceAttributes.emotion;
        return (
          emotions.anger > 0.5 ||
          emotions.contempt > 0.5 ||
          emotions.disgust > 0.5 ||
          emotions.fear > 0.5 ||
          emotions.happiness > 0.5 ||
          emotions.neutral > 0.5 ||
          emotions.sadness > 0.5 ||
          emotions.surprise > 0.5
        );
      });

      if (detectedFaces.length > 0) {
        const emotions = detectedFaces[0].faceAttributes.emotion;
        setEmotionResult(emotions);
      } else {
        setEmotionResult({
          anger: 0,
          contempt: 0,
          disgust: 0,
          fear: 0,
          happiness: 0,
          neutral: 0,
          sadness: 0,
          surprise: 0,
        });
      }
    } catch (error) {
      console.log(error);
      setEmotionResult(null);
    }
  }

  return (
    <div>
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button onClick={analyzeImage}>Analyze</button>
      {emotionResult && (
        <ul>
          <li>Anger: {emotionResult.anger}</li>
          <li>Contempt: {emotionResult.contempt}</li>
          <li>Disgust: {emotionResult.disgust}</li>
          <li>Fear: {emotionResult.fear}</li>
          <li>Happiness: {emotionResult.happiness}</li>
          <li>Neutral: {emotionResult.neutral}</li>
          <li>Sadness: {emotionResult.sadness}</li>
          <li>Surprise: {emotionResult.surprise}</li>
        </ul>
      )}
    </div>
  );
};

export default AnalyzeEmotion;
