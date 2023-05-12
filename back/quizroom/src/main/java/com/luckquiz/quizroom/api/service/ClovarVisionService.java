package com.luckquiz.quizroom.api.service;

import com.google.gson.Gson;
import com.luckquiz.quizroom.model.QuizMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

@Service
@RequiredArgsConstructor
public class ClovarVisionService {
    private final Gson gson;
    public void naverCheck(byte[] decode) throws  Exception{
//        byte[] decode = Base64.getDecoder().decode(message.getMessage().split(",")[1]);
        System.out.println("네이버 인식");
        String result="";
        String clientId = "VAfocGbRd1aI0EwNo6b_";//애플리케이션 클라이언트 아이디값";
        String clientSecret = "ZfD57EsyxR";//애플리케이션 클라이언트 시크릿값";
        System.out.println("디코딩시작");

        System.out.println("디코딩 끝");
        String path;
        path = "ts.jpg";
        File file = new File(path);
        try(OutputStream outputStream = new FileOutputStream(file)){
            outputStream.write(decode);
        } catch(Exception e) {
            e.printStackTrace();
        }
        System.out.println(file.length());
        try {
            String paramName = "image"; // 파라미터명은 image로 지정
            String apiURL = "https://openapi.naver.com/v1/vision/face";
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            // multipart request
            String boundary = "---" + System.currentTimeMillis() + "---";
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            OutputStream outputStream = con.getOutputStream();
            PrintWriter writer = new PrintWriter(new OutputStreamWriter(outputStream, "UTF-8"), true);
            String LINE_FEED = "\r\n";
            // file 추가
            String fileName = file.getName();
            System.out.println("파일이름"+fileName);
            writer.append("--" + boundary).append(LINE_FEED);
            writer.append("Content-Disposition: form-data; name=\"" + paramName + "\"; filename=\"" + fileName + "\"").append(LINE_FEED);
            writer.append("Content-Type: "  + URLConnection.guessContentTypeFromName(fileName)).append(LINE_FEED);
            writer.append(LINE_FEED);
            writer.flush();
            ByteArrayInputStream inputStream = new ByteArrayInputStream(decode);
            byte[] buffer = new byte[4096];
            int bytesRead = -1;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            outputStream.flush();
            inputStream.close();
            writer.append(LINE_FEED).flush();
            writer.append("--" + boundary + "--").append(LINE_FEED);
            writer.close();
            BufferedReader br = null;
            int responseCode = con.getResponseCode();

            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                System.out.println("error!!!!!!! responseCode= " + responseCode);
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            }

            String inputLine;
            if(br != null) {
                StringBuffer response = new StringBuffer();
                while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
                result = response.toString();
                System.out.println(result);
                Map<String,Object> object = gson.fromJson(result,Map.class);
                ObjectMapper mapper = new ObjectMapper();
                System.out.println(object.get("faces"));
                System.out.println("출력안해봄");
            } else {
                System.out.println("error !!!");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
