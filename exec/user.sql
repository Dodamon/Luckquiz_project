create table user
(
    id         binary(16)                           not null comment 'pk'
        primary key,
    name       varchar(50)                          not null,
    email      varchar(50)                          not null,
    image_url  varchar(255)                         null comment 'url',
    created_at datetime default current_timestamp() not null
)
    charset = utf8mb3;

INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x02D4B19E692441BA959FC6C90FDBA732, '이승헌[서울_7반_A705]팀원', 'cxzlkjhgfdsa0821@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxaxOhddsg3A6v5_JXeoZWeBPlHjJWIvJq5XzrRr=s96-c', '2023-05-17 17:36:11');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x07EC3F66A4684A7BAA9BC41A26C2A096, '최원준', 'sky_rest@naver.com', 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', '2023-05-19 09:37:38');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x0A8D6C2345D7489685470FA70AD4DC85, '88 cc', 'cc012697@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxal3Y1zawWqewwjec4jX_Nuu_RPsJ2n9lKAE2xP=s96-c', '2023-05-13 15:02:52');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x155E6AADE45342168A7F4F41569D455D, 's', '2sy0127@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxaWICkVz8nWUJi6rZtJCagTYo354QxmWcAyoll3=s96-c', '2023-05-09 10:51:08');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x23BB8E7902D54F8886185710FEA2CAF1, 'wewe ewew', 'yyjj44448888@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxYlNVh2A7KSRltw0YDLX-250eFsYDMa5dzK-S-N=s96-c', '2023-05-17 22:15:18');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x3DE197D26B3E4FB6AC9EE03948546A28, '유진', 'syooj0728@gmail.com', 'http://k.kakaocdn.net/dn/bJ1MPe/btsfbi7e772/C4cOVG6CXNjtkuz39Xgc7K/img_640x640.jpg', '2023-05-10 09:28:48');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x4BC16076F1904C24B2963F854BA97EF5, '조현철', 'johyunchul214@gmail.com', 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', '2023-05-18 20:36:15');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x4E2BB5F504674624ABAD9582EADE8009, '조민수', 'whalstn1020@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxbLq86H46e547YFbQ4-z48Qt8O5f8QxTGh2JBtSQw=s96-c', '2023-05-12 13:57:59');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x6313025687924A7E9E3BCF68D62AAFDF, '정원철', 'gksrud316@naver.com', 'http://k.kakaocdn.net/dn/cRNaZX/btrZ72jjZMr/RaYGo77QRJei5J6rZWWQ9K/img_640x640.jpg', '2023-05-09 10:32:50');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x668B9E6E87404596ABBBEE06EDBF458E, '공진호[서울_2반_A205] 팀원', 'wlsgh7608@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxZ7ng80HdmVUKO9sonldcMYlm9UeLhAol4zQN0E=s96-c', '2023-05-18 01:18:14');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x7CC35A1CB00E4823AA5B6D0CB55CD213, '류하은', 'haun0321@naver.com', 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', '2023-05-19 09:38:55');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x7DCEAF7F0497474DA251356FB02BC079, 'Gh J', 'wlqus2020@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxYEzMrZuGSV8NMXf2icx0GT2JvCuK4Nk_LvcWuQ=s96-c', '2023-05-11 19:48:15');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x8C35436E4AD94CD38C3F1EB8F84DB75B, 'Yejin Lee', 'yjlee66096@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxYrH5pwaPxd3q9cCxJAFdz-jdiQ7b8ma_G4-x7v=s96-c', '2023-05-08 12:38:19');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x94D737CA699B4C6698B93B81F22EBD5E, 'woonchoi 42', '42.4.woonchoi@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxZhkDMrM4lH-4jjR-s-YIKyxzTqWJur0-Cpwzbc=s96-c', '2023-05-16 14:25:45');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0x9B5505A0BEF841BFA5ED33902617A1F9, '수연', '2sy0127@naver.com', 'http://k.kakaocdn.net/dn/vbY0n/btsfCt18Oxs/wsDmcCHSrjU6dXCTkQ5hzk/img_640x640.jpg', '2023-05-08 13:49:05');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xA18245607E014F55AA75D6A02CFD3F11, '이안채', 'dldksco@kakao.com', 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', '2023-05-16 14:27:03');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xA1D95CBD4696441A989BBD82A782801F, '안려환', 'arh951019@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxbArE8M0Srqw2cyc5JFzt_vPgiNEtOEaz-SVyPd=s96-c', '2023-05-13 15:00:05');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xA23EF914003F42C68C2AD8456A937F28, '이예진', 'dpwls951212@naver.com', 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', '2023-05-08 12:38:28');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xBE54BAD9E7F246F0A2BEEE59BAF1746B, '김상준', 'p01090147020@nate.com', 'http://k.kakaocdn.net/dn/pgxx8/btrU38aXGYE/Qc81f9et7NaR5WpGZLINvk/img_640x640.jpg', '2023-05-19 09:35:16');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xCB685DFED0EA47D7A057A2FDF6F089DD, 'A FO', 'wonchul97@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxYO2uux8xxvcdMSceN3uEPvqMpYG_A_aFbv0PqhEg=s96-c', '2023-05-10 00:35:42');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xCDE1CBF966BB47B4B23AF0977E5C8974, 'Carrot Yoon', 'ehdrmsdl9999@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxYj2BqRn29XCW-OhO2DPPvrKkKTMP2L4vpjT0SM=s96-c', '2023-05-13 15:54:49');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xE7562FD0C0ED406C8C047A96B9F1C897, '이예은', 'vksek222@nate.com', 'http://k.kakaocdn.net/dn/OOYDZ/btrQ0FS4pWZ/C7uqDRlfCmz7jvum3whGF1/img_640x640.jpg', '2023-05-13 15:37:20');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xE8D07581D4B6467D95AD3DD398E6804E, '남이랑', '111601joo@naver.com', 'http://k.kakaocdn.net/dn/Z5NiJ/btr0DV6Gn82/pUO22lNXhKxw89f5QQclmk/img_640x640.jpg', '2023-05-16 15:58:14');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xF3A399AB31A3469693487D0A141AF336, 'Yeeun Lee', 'dodamond222@gmail.com', 'https://lh3.googleusercontent.com/a/AGNmyxbHpRmSwMBH5iDoPmv_wvSvTBZmAJw-bubAhEAp=s96-c', '2023-05-13 15:39:02');
INSERT INTO luckquiz.user (id, name, email, image_url, created_at) VALUES (0xF3FE5A3093E14E6798FCEEE9C0EE6A82, '안려환', 'ahnrh951019@naver.com', 'http://k.kakaocdn.net/dn/bxnDJW/btscFEELNLs/zSlYOQmqzaKfGXDzyJrkrk/img_640x640.jpg', '2023-05-09 10:36:35');
