package com.luckquiz.quizroom.api.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Properties;


@Slf4j
@Component
public class SubmitProducerService {
    private static Properties configs = new Properties();
    public SubmitProducerService() {
        configs.put("bootstrap.servers", "http://k8a707.p.ssafy.io:9091, http://k8a707.p.ssafy.io:9092, http://k8a707.p.ssafy.io:9093");
        configs.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    }

    public ResponseEntity producerTest(String var){
        log.info("=====producerTest start=====");
        log.info("var : " + var);

        KafkaProducer<String, String> producer = new KafkaProducer<String, String>(configs);

        ProducerRecord record = new ProducerRecord<String, String>("test", var);

//        키를 포함하여 전송하는 경우
//        ProducerRecord record = new ProducerRecord<String, String>("topic01", "1", var);

        producer.send(record);

        producer.close();

        log.info("=====producerTest end=====");
        return ResponseEntity.ok(var + "entered");
    }

    // server_message
    public void callQuizTemp(String request){
        KafkaProducer<String , String> producer = new KafkaProducer<String, String>(configs);
        ProducerRecord record = new ProducerRecord<String,String>("server_message",request);
        producer.send(record);
        producer.close();
    }

}