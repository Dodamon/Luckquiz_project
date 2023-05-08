package com.luckquiz.quizroom.api.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Properties;


@Slf4j
@Component
public class ToGradeProducer {
    private static Properties configs = new Properties();
    public ToGradeProducer() {
        configs.put("bootstrap.servers", "http://13.125.215.143:9092, http://54.180.139.100:9092, http://54.180.165.36:9092");
        configs.setProperty("key.serializer","org.apache.kafka.common.serialization.StringSerializer");
        configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    }

    public void quizStart(String quizRoomStartRequest){
        KafkaProducer<String , String> producer = new KafkaProducer<String, String>(configs);
        ProducerRecord record = new ProducerRecord<String,String>("sign_to_grade","quiz_start",quizRoomStartRequest);
        producer.send(record);
        producer.close();
    }

    public void clientSubmit(String request){
        KafkaProducer<String , String> producer = new KafkaProducer<String, String>(configs);
        ProducerRecord record = new ProducerRecord<String,String>("sign_to_grade","grade",request);
        producer.send(record);
        producer.close();
    }

    public void rollBack(String rollbackRequest){
        KafkaProducer<String , String> producer = new KafkaProducer<String, String>(configs);
        ProducerRecord record = new ProducerRecord<String,String>("sign_to_grade","rollback",rollbackRequest);
        producer.send(record);
        producer.close();
    }


}