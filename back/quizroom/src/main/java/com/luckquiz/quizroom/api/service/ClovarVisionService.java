package com.luckquiz.quizroom.api.service;

import com.google.gson.Gson;
import com.luckquiz.quizroom.message.EmotionResultMessage;
import com.luckquiz.quizroom.model.EmotionResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

// @Service
// @Slf4j
// @RequiredArgsConstructor
public class ClovarVisionService{
    // private final Gson gson;
//     private String clientId = "VAfocGbRd1aI0EwNo6b_";//애플리케이션 클라이언트 아이디값";
//     private String clientSecret = "ZfD57EsyxR";//애플리케이션 클라이언트 시크릿값"
//     private String paramName = "image"; // 파라미터명은 image로 지정
//     private String apiURL = "https://openapi.naver.com/v1/vision/face";
//     private String LINE_FEED = "\r\n";
//     private String fileName = "emotion.jpg";
//     private URL url;
//     private HttpURLConnection con;
//     {
//         try {
//             url = new URL(apiURL);
//         } catch (MalformedURLException e) {
//             throw new RuntimeException(e);
//         }
//         try {
//             con = (HttpURLConnection)url.openConnection();
//             con.setUseCaches(false);
//             con.setDoOutput(true);
//             con.setDoInput(true);
//             con.setRequestProperty("X-Naver-Client-Id", clientId);
//             con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
//         } catch (IOException e) {
//             throw new RuntimeException(e);
//         }
//     }
//
//     public EmotionResultMessage naverCheck(byte[] decode) throws  Exception{
// //        byte[] decode = Base64.getDecoder().decode(message.getMessage().split(",")[1]);
//
//         EmotionResult result = new EmotionResult();
//         EmotionResultMessage resultMessage = new EmotionResultMessage();
//
// //        String path;
// //        path = "ts.jpg";
// //        File file = new File(path);
// //        try(OutputStream outputStream = new FileOutputStream(file)){
// //            outputStream.write(decode);
// //        } catch(Exception e) {
// //            e.printStackTrace();
// //        }
// //        System.out.println(file.length());
//         try {
//             // multipart request
//             String boundary = "---" + System.currentTimeMillis() + "---";
//             con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
//
//             OutputStream outputStream = con.getOutputStream();
//             PrintWriter writer = new PrintWriter(new OutputStreamWriter(outputStream, "UTF-8"), true);
//
//             // file 추가
//             writer.append("--" + boundary).append(LINE_FEED);
//             writer.append("Content-Disposition: form-data; name=\"" + paramName + "\"; filename=\"" + fileName + "\"").append(LINE_FEED);
//             writer.append("Content-Type: "  + URLConnection.guessContentTypeFromName(fileName)).append(LINE_FEED);
//             writer.append(LINE_FEED);
//             writer.flush();
//             ByteArrayInputStream inputStream = new ByteArrayInputStream(decode);
//             byte[] buffer = new byte[4096];
//             int bytesRead = -1;
//             while ((bytesRead = inputStream.read(buffer)) != -1) {
//                 outputStream.write(buffer, 0, bytesRead);
//             }
//             outputStream.flush();
//             inputStream.close();
//             writer.append(LINE_FEED).flush();
//             writer.append("--" + boundary + "--").append(LINE_FEED);
//             writer.close();
//             BufferedReader br = null;
//             int responseCode = con.getResponseCode();
//             if(responseCode==200) { // 정상 호출
//                 br = new BufferedReader(new InputStreamReader(con.getInputStream()));
//             } else {  // 에러 발생
//                 log.info("에러 : "+responseCode);
//                 br = new BufferedReader(new InputStreamReader(con.getInputStream()));
//             }
//
//             String inputLine;
//             if(br != null) {
//                 StringBuffer response = new StringBuffer();
//                 while ((inputLine = br.readLine()) != null) {
//                     response.append(inputLine);
//                 }
//                 br.close();
//                 result = gson.fromJson(response.toString(),EmotionResult.class);
//             } else {
//                 log.info("네이버 클로바쪽 에러");
//             }
//         } catch (Exception e) {
//            log.info(e.getMessage());
//         }
//
//         resultMessage.setResult(result);
//         resultMessage.setType("emotion");
//         return resultMessage;
//     }
}
