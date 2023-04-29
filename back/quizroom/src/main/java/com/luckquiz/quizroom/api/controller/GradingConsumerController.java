package com.luckquiz.quizroom.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class GradingConsumerController {
    @GetMapping("/consumer")
    public void consumerTest() {
        Properties configs = new Properties();
        configs.put("bootstrap.servers", "http://k8a707.p.ssafy.io:9091, http://k8a707.p.ssafy.io:9092, http://k8a707.p.ssafy.io:9093");
        configs.put("group.id", "topic01_group");
        configs.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        configs.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(configs);

        consumer.subscribe(Arrays.asList("test"));

        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(5000);
            List<String> resultList = new ArrayList<>();
            for (ConsumerRecord<String, String> record : records) {
                // 채점 로직
                String a = "test"; // 정답
                if(a.equals(record.value())){
                    String ans = record.value()+"/"+"true";
                    resultList.add(ans);
                }else {
                    String ans = record.key()+"/"+"false";
                    resultList.add(ans);
                }
                System.out.println("record = " + record.value());
            }

        }

    }
}
