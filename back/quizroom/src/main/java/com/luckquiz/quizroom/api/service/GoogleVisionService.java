package com.luckquiz.quizroom.api.service;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.vision.v1.*;
import com.google.gson.Gson;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
//@Service
public class GoogleVisionService {
    private final Gson gson;
    public void googleCheck(byte[] decode) throws  Exception {
        System.out.println("구글");
        List<AnnotateImageRequest> requests = new ArrayList<>();
        ByteString byteString = ByteString.copyFrom(decode);
        Image img = Image.newBuilder().setContent(byteString).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.FACE_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);
        GoogleCredentials googleCredentials = ServiceAccountCredentials.fromStream(new FileInputStream("src/main/resources/json/snappy-analog-384101-5ff843401827.json"));
        ImageAnnotatorSettings imageAnnotatorSettings = ImageAnnotatorSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(googleCredentials)).build();
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create(imageAnnotatorSettings)) {

            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return;
                }

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                for (FaceAnnotation annotation : res.getFaceAnnotationsList()) {
//                    System.out.println("화남: " + annotation.getAngerLikelihoodValue());
//                    System.out.println("놀람 :" + annotation.getSurpriseLikelihoodValue());
//                    System.out.println("즐거움 :" + annotation.getJoyLikelihoodValue());
//                    System.out.println("슬픔 :" + annotation.getSorrowLikelihoodValue());
//                    System.out.println("머리에 뭐 쓴거같은지 :" + annotation.getHeadwearLikelihoodValue());
//                    System.out.println("화난 가능성 :" + annotation.getAngerLikelihood());
//                    System.out.println("놀람 가능성 :" + annotation.getSurpriseLikelihood());
//                    System.out.println("즐거움 가능성 :" + annotation.getJoyLikelihood());
//                    System.out.println("슬픔 가능성 :" + annotation.getSurpriseLikelihood());
//                    System.out.println("머리 뭐 쓴 가능성 :" + annotation.getHeadwearLikelihood());
                    //                    System.out.println(gson.toJson(annotation));
//                    System.out.format(
//                            "anger: %s%njoy: %s%nsurprise: %s%nposition: %s",
//                            annotation.getAngerLikelihoodValue(),
//                            annotation.getJoyLikelihoodValue(),
//                            annotation.getSurpriseLikelihoodValue(),
//                            annotation.getBoundingPoly());
//                            annotation.getAngerLikelihoodValue();
//                            annotation.getSurpriseLikelihood();
//                            annotation.getHeadwearLikelihoodValue();
//                            annotation.getDetectionConfidence();
//                }
                }

                client.close();
            }
        } catch (Exception e) {
            System.out.println(e);
        }

    }
}
