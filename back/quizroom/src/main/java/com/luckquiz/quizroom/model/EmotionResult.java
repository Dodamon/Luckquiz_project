package com.luckquiz.quizroom.model;

import lombok.Getter;

import java.util.List;
@Getter
public class EmotionResult {
    public class Size {
        public int width;
        public int height;
    }

    public class Info {
        public Size size;
        public int faceCount;
    }
    @Getter
    public class Face {
        public Roi roi;
        public Landmark landmark;
        public ValCon gender;
        public ValCon age;
        public ValCon emotion;
        public ValCon pose;
    }

    public class Roi extends Position {
        public int width;
        public int height;
    }

    public class Landmark {
        public Position leftEye;
        public Position rightEye;
        public Position leftMouth;
        public Position rightMouth;
        public Position nose;
    }

    public class Position {
        public int x;
        public int y;
    }

    @Getter
    public static class ValCon {
        public String value;
        public double confidence;
    }

    private Info info;
    private List<Face> faces;

}

