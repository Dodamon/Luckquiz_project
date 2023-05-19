create table template
(
    id       int auto_increment
        primary key,
    name     varchar(50)             null,
    host_id  binary(16)              not null,
    date     datetime                null,
    is_valid varchar(10) default '0' null
);

INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (1, '알톡챗의 재미있는 알고리즘 퀴즈', 0x7FB5BC30C7C64CD9859D2BB4EF982644, '2023-05-11 10:24:27', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (2, '알톡챗의 재미있는 알고리즘 퀴즈', 0x7FB5BC30C7C64CD9859D2BB4EF982644, '2023-05-12 15:05:58', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (3, '알톡챗의 재미있는 알고리즘 퀴즈', 0x7FB5BC30C7C64CD9859D2BB4EF982644, '2023-05-11 10:24:27', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (4, '알톡챗의 재미있는 알고리즘 퀴즈', 0x7FB5BC30C7C64CD9859D2BB4EF982644, '2023-05-11 10:24:27', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (5, '알톡챗의 재미있는 알고리즘 퀴즈2', 0x7FB5BC30C7C64CD9859D2BB4EF982644, '2023-05-11 10:24:27', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (151, '알톡챗의 재미있는 알고리즘 퀴주', 0x7FB5BC30C7C64CD9859D2BB4EF982644, '2023-05-13 17:57:14', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (167, '', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-13 22:40:57', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (169, '우리 너무 이뻐 이거', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-14 14:16:12', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (192, 'emtion', 0x8C35436E4AD94CD38C3F1EB8F84DB75B, '2023-05-15 22:18:48', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (199, '', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-16 10:48:37', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (200, '', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-16 10:51:33', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (204, '', 0x9B5505A0BEF841BFA5ED33902617A1F9, '2023-05-16 14:47:39', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (206, '테스트', 0x94D737CA699B4C6698B93B81F22EBD5E, '2023-05-16 14:26:51', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (207, '이찬희', 0xA18245607E014F55AA75D6A02CFD3F11, '2023-05-16 14:30:33', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (211, 'create', 0xE8D07581D4B6467D95AD3DD398E6804E, '2023-05-16 15:59:43', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (255, '냠', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-18 23:56:09', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (258, '제발', 0xF3A399AB31A3469693487D0A141AF336, '2023-05-17 17:10:13', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (262, '양준모 A to Z', 0x02D4B19E692441BA959FC6C90FDBA732, '2023-05-18 17:25:55', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (265, '얼굴게임', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-17 19:00:05', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (266, '알게임', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-17 18:50:16', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (267, '풍선게임', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-17 18:44:26', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (268, '유나니게임', 0xA1D95CBD4696441A989BBD82A782801F, '2023-05-18 01:56:54', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (271, '나는공진호', 0x668B9E6E87404596ABBBEE06EDBF458E, '2023-05-18 01:19:27', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (273, '테스트', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-18 01:59:07', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (274, '믓져믓져', 0xF3A399AB31A3469693487D0A141AF336, '2023-05-18 08:54:57', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (276, 'test', 0xA1D95CBD4696441A989BBD82A782801F, '2023-05-19 10:15:47', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (279, '감정게임', 0xF3A399AB31A3469693487D0A141AF336, '2023-05-18 08:58:36', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (282, '11시27분퀴즈템플릿', 0x6313025687924A7E9E3BCF68D62AAFDF, '2023-05-18 17:28:06', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (285, '된다된다', 0xF3A399AB31A3469693487D0A141AF336, '2023-05-18 15:06:01', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (287, 'ffds', 0x94D737CA699B4C6698B93B81F22EBD5E, '2023-05-18 17:01:20', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (288, '7조테스트문제', 0x6313025687924A7E9E3BCF68D62AAFDF, '2023-05-19 01:10:16', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (289, 'balloon', 0x8C35436E4AD94CD38C3F1EB8F84DB75B, '2023-05-18 19:20:41', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (290, 'egg', 0x8C35436E4AD94CD38C3F1EB8F84DB75B, '2023-05-18 21:57:52', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (292, '오늘의 퀴즈왕은 나야나', 0x8C35436E4AD94CD38C3F1EB8F84DB75B, '2023-05-18 19:59:56', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (294, '테스트', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 11:48:18', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (297, '퀴즈1게임1', 0xE7562FD0C0ED406C8C047A96B9F1C897, '2023-05-18 21:03:37', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (298, '이거 왜캐 잘 만듦?', 0x668B9E6E87404596ABBBEE06EDBF458E, '2023-05-19 03:25:28', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (300, 'dwd', 0x6313025687924A7E9E3BCF68D62AAFDF, '2023-05-18 23:21:59', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (302, '복습', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-18 23:50:17', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (303, 'ㅇ', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 00:06:49', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (306, '수학 퀴즈', 0xCDE1CBF966BB47B4B23AF0977E5C8974, '2023-05-19 01:22:47', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (307, '테스트1', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 01:41:05', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (310, '지브리', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 01:45:05', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (311, '지브리', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 01:45:39', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (312, '지브리', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 02:52:36', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (315, 'SSAFY 707 퀴즈 템플', 0x6313025687924A7E9E3BCF68D62AAFDF, '2023-05-19 03:12:27', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (317, '임시저장', 0x3DE197D26B3E4FB6AC9EE03948546A28, '2023-05-19 03:40:35', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (318, '어쩌고입니다', 0x6313025687924A7E9E3BCF68D62AAFDF, '2023-05-19 08:58:43', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (319, '덤벼라', 0xBE54BAD9E7F246F0A2BEEE59BAF1746B, '2023-05-19 09:35:32', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (320, '덤벼라', 0xBE54BAD9E7F246F0A2BEEE59BAF1746B, '2023-05-19 09:35:51', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (321, '핀번호 어딨노', 0xBE54BAD9E7F246F0A2BEEE59BAF1746B, '2023-05-19 09:43:45', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (322, '퀴즈템플릿', 0x07EC3F66A4684A7BAA9BC41A26C2A096, '2023-05-19 09:38:09', null);
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (323, '짱짱하은', 0x7CC35A1CB00E4823AA5B6D0CB55CD213, '2023-05-19 09:41:28', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (324, '홀리', 0x07EC3F66A4684A7BAA9BC41A26C2A096, '2023-05-19 09:40:30', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (325, '짱하은', 0x7CC35A1CB00E4823AA5B6D0CB55CD213, '2023-05-19 09:42:42', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (326, '새로운 퀴즈를 만들어봅니', 0x8C35436E4AD94CD38C3F1EB8F84DB75B, '2023-05-19 10:50:51', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (327, '이게뭘까요?', 0x9B5505A0BEF841BFA5ED33902617A1F9, '2023-05-19 11:08:55', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (328, '나는짱템플릿', 0x6313025687924A7E9E3BCF68D62AAFDF, '2023-05-19 11:11:46', 'false');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (329, '안녕하세요', 0x9B5505A0BEF841BFA5ED33902617A1F9, '2023-05-19 11:11:02', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (330, 'teset', 0x9B5505A0BEF841BFA5ED33902617A1F9, '2023-05-19 11:12:27', 'true');
INSERT INTO luckquiz.template (id, name, host_id, date, is_valid) VALUES (331, 'ㅇㅇㅇ', 0x9B5505A0BEF841BFA5ED33902617A1F9, '2023-05-19 11:15:05', null);
