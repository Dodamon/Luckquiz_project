package com.luckquiz.quizroom.api.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.stereotype.Component;

import java.util.Properties;
@Slf4j
@Component
public class ToQuizProducer {
    private static Properties configs = new Properties();
    public ToQuizProducer() {
        configs.put("bootstrap.servers", "http://13.125.215.143:9092, http://54.180.139.100:9092, http://54.180.165.36:9092");
        configs.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    }
    // server_message
    public void callQuizTemp(String request){
        KafkaProducer<String , String> producer = new KafkaProducer<String, String>(configs);
        ProducerRecord record = new ProducerRecord<String,String>("server_message","start",request);
        producer.send(record);
        producer.close();
    }

    public void QuizEnd(String request){
        KafkaProducer<String,String> producer = new KafkaProducer(configs);
        ProducerRecord record = new ProducerRecord<String,String>("server_message","end",request);
        producer.send(record);
        producer.close();
    }
}
