package com.luckquiz.quizroom.api.service;

import com.luckquiz.quizroom.model.QuizMessage;
import com.microsoft.azure.cognitiveservices.vision.faceapi.FaceAPI;
import com.microsoft.azure.cognitiveservices.vision.faceapi.FaceAPIManager;
import com.microsoft.azure.cognitiveservices.vision.faceapi.models.AzureRegions;
import com.microsoft.azure.cognitiveservices.vision.faceapi.models.DetectWithStreamOptionalParameter;
import com.microsoft.azure.cognitiveservices.vision.faceapi.models.DetectedFace;
import com.microsoft.azure.cognitiveservices.vision.faceapi.models.FaceAttributeType;
import org.springframework.messaging.handler.annotation.MessageMapping;

import java.util.ArrayList;
import java.util.List;

public class AzureFaceService {
//    @MessageMapping("/submit")
//    public void submit(QuizMessage message) throws  Exception {
//        String KEY = "c2f5e3ed8258411a8070a8118e25e534";
//        AzureRegions REGION = AzureRegions.EASTASIA;
//        String END_POINT = "https://luckquiz.cognitiveservices.azure.com/";
//        FaceAPI client = FaceAPIManager.authenticate(REGION, KEY);
//        List<FaceAttributeType> faceAttributeTypes = new ArrayList();
//        faceAttributeTypes.add(FaceAttributeType.AGE);
//        //웃는지
//        faceAttributeTypes.add(FaceAttributeType.SMILE);
//        // 악세사리
//        faceAttributeTypes.add(FaceAttributeType.ACCESSORIES);
//        // 감정
//        faceAttributeTypes.add(FaceAttributeType.EMOTION);
//        // 성별
//        faceAttributeTypes.add(FaceAttributeType.GENDER);
//        // 안경
//        faceAttributeTypes.add(FaceAttributeType.GLASSES);
//        // 얼굴 털
//        faceAttributeTypes.add(FaceAttributeType.FACIAL_HAIR);
//        // 머리
//        faceAttributeTypes.add(FaceAttributeType.HAIR);
//        //사진이 흐린지
//        faceAttributeTypes.add(FaceAttributeType.BLUR);
//        //사진이 노이지 꼈는지
//        faceAttributeTypes.add(FaceAttributeType.NOISE);
////         화장 했는지
//        faceAttributeTypes.add(FaceAttributeType.MAKEUP);
////         교합
//        faceAttributeTypes.add(FaceAttributeType.OCCLUSION);
//        List<DetectedFace> faces = client.faces().detectWithStream(decode, new DetectWithStreamOptionalParameter().withReturnFaceId(false).withReturnFaceAttributes(faceAttributeTypes));
//
//        for (DetectedFace face : faces) {
//            System.out.println("확인1");
//            System.out.println(gson.toJson(face));
//            System.out.println(face.faceAttributes().emotion().anger());
//            System.out.println("확인2");
//        }
//    }
}
