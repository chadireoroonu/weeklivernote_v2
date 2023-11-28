-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: soolsool
-- ------------------------------------------------------
-- Server version	5.7.43-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_pk` tinyint(4) NOT NULL AUTO_INCREMENT,
  `bottle` int(11) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `glass` int(11) DEFAULT NULL,
  `volume` float DEFAULT NULL,
  PRIMARY KEY (`category_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,360,'소주',60,19),(2,510,'맥주',170,5),(3,400,'소맥',200,10),(4,750,'와인',150,11),(5,750,'막걸리',150,6),(6,400,'하이볼',400,8),(7,200,'칵테일(약)',200,8),(8,200,'칵테일(강)',200,20),(9,750,'위스키',30,40);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diary` (
  `diary_pk` int(11) NOT NULL AUTO_INCREMENT,
  `alcohol_conc` float DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `detox_time` float DEFAULT NULL,
  `drink_date` date DEFAULT NULL,
  `hangover` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`diary_pk`),
  KEY `FKact6ugdopxa49esjsbt9iqmbt` (`social_id`),
  CONSTRAINT `FKact6ugdopxa49esjsbt9iqmbt` FOREIGN KEY (`social_id`) REFERENCES `user` (`social_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary`
--

LOCK TABLES `diary` WRITE;
/*!40000 ALTER TABLE `diary` DISABLE KEYS */;
INSERT INTO `diary` VALUES (1,0.161875,'2023-11-17 10:48:36.616363',10.7917,'2023-01-01','string',NULL,'string','2023-11-17 10:48:36.616363','3149671154'),(2,0.194688,'2023-11-17 10:48:50.043083',12.9792,'2023-01-13','string',NULL,'string','2023-11-17 10:48:50.043083','3149671154'),(3,0.315,'2023-11-17 10:49:10.045917',21,'2023-03-03','string',NULL,'string','2023-11-17 10:49:10.045917','3149671154'),(4,0.118125,'2023-11-17 10:49:35.836401',7.875,'2023-04-15','string',NULL,'동창회','2023-11-17 10:49:35.836401','3149671154'),(5,0.137812,'2023-11-17 10:51:41.913436',9.1875,'2023-05-20','string',NULL,'친구 생일','2023-11-17 10:51:41.913436','3149671154'),(6,0.179375,'2023-11-17 10:52:13.672753',11.9583,'2023-09-21','string',NULL,'특화 회식','2023-11-17 10:52:13.672753','3149671154'),(7,0.0678125,'2023-11-17 10:52:33.756299',4.52083,'2023-11-02','string',NULL,'자율 회식','2023-11-17 10:52:33.756299','3149671154'),(8,0.124688,'2023-11-17 10:53:06.695282',8.3125,'2023-11-05','string',NULL,'자율 회식','2023-11-17 10:53:06.695282','3149671154'),(9,0.124688,'2023-11-17 10:54:06.136968',8.3125,'2023-11-12','숙취는 없음..',NULL,'내일 싸피간다..','2023-11-17 10:54:06.136968','3149671154'),(10,0.238438,'2023-11-17 10:54:38.256365',15.8958,'2023-11-14','두통',NULL,'간만에 친구모임','2023-11-17 10:54:38.256365','3149671154'),(11,0.04375,'2023-11-17 10:55:04.741903',2.91667,'2023-11-16','string',NULL,'가볍게 마심','2023-11-17 10:55:04.741903','3149671154'),(12,0,'2023-11-17 10:58:01.655049',0,'2023-11-17','string',NULL,'string','2023-11-17 10:58:01.655049','3149671154');
/*!40000 ALTER TABLE `diary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drink`
--

DROP TABLE IF EXISTS `drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drink` (
  `drink_pk` int(11) NOT NULL AUTO_INCREMENT,
  `drink_amount` float DEFAULT NULL,
  `drink_unit` varchar(255) DEFAULT NULL,
  `record_time` datetime(6) DEFAULT NULL,
  `category_pk` tinyint(4) DEFAULT NULL,
  `diary_pk` int(11) DEFAULT NULL,
  PRIMARY KEY (`drink_pk`),
  KEY `FKq7jgut8rjhgmi0vpimww1f4gi` (`category_pk`),
  KEY `FKb6ekxpx0put31kecix0pttu8r` (`diary_pk`),
  CONSTRAINT `FKb6ekxpx0put31kecix0pttu8r` FOREIGN KEY (`diary_pk`) REFERENCES `diary` (`diary_pk`),
  CONSTRAINT `FKq7jgut8rjhgmi0vpimww1f4gi` FOREIGN KEY (`category_pk`) REFERENCES `category` (`category_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drink`
--

LOCK TABLES `drink` WRITE;
/*!40000 ALTER TABLE `drink` DISABLE KEYS */;
INSERT INTO `drink` VALUES (1,1,'병','2023-01-01 18:00:00.000000',1,1),(2,1,'병','2023-01-01 18:00:00.000000',2,1),(3,1,'병','2023-01-13 18:00:00.000000',1,2),(4,1,'병','2023-01-13 18:00:00.000000',5,2),(5,2,'병','2023-03-03 20:34:00.000000',1,3),(6,1,'병','2023-03-03 20:34:00.000000',5,3),(7,1,'병','2023-04-15 20:30:00.000000',1,4),(8,4,'잔','2023-05-20 20:30:00.000000',3,5),(9,3,'잔','2023-09-21 19:00:00.000000',3,6),(10,1,'병','2023-09-21 19:00:00.000000',5,6),(11,2,'잔','2023-11-02 19:00:00.000000',3,7),(12,2,'잔','2023-11-05 19:30:00.000000',3,8),(13,2,'잔','2023-11-05 19:30:00.000000',4,8),(14,2,'잔','2023-11-12 20:00:00.000000',3,9),(15,2,'잔','2023-11-12 20:00:00.000000',4,9),(16,2,'병','2023-11-14 20:00:00.000000',1,10),(17,1,'병','2023-11-16 20:00:00.000000',2,11),(18,1,'잔','2023-11-17 10:58:01.657050',1,12);
/*!40000 ALTER TABLE `drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_pk` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `home_lat` double DEFAULT NULL,
  `home_long` double DEFAULT NULL,
  `now_lat` double DEFAULT NULL,
  `now_long` double DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`location_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'2023-11-17 10:47:20.443803',35.2351114770405,129.017222935657,35.085747,128.878013,'2023-11-17 10:58:45.050051');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_pk` tinyint(4) NOT NULL AUTO_INCREMENT,
  `content` longtext,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`notice_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'먼저, 어플을 사용해 주신 모든 분들에게 감사의 마음을 표현합니다.\n\n술, 알고 똑똑하게 마시자! 음주를 실시간으로 기록하며 간의 상태와 마신 양을 직관적으로 볼 수 있는 캘린더 기반 다이어리입니다.\n\n’주간일기’에서는 주종, 양, 그리고 메모와 사진을 첨부하여 음주 기록을 저장하고, 캘린더에서 날짜별로 상세한 이력을 확인할 수 있습니다.\n\n앱 평가와 리뷰 작성은 개발자에게 큰 도움이 됩니다.','2023-11-17 10:46:47.154707','‘주간일기’ 첫 스토어 배포 안내','2023-11-17 10:46:47.154707'),(2,'[개선 사항]\n- 메인 화면의 배경 및 캐릭터가 변경되었습니다.\n- 마이페이지 UI를 개선하였습니다.\n- 로딩 화면 디자인을 수정하였습니다.\n- 메인화면에서 주종 선택 시 캐러셀 가이드를 추가했습니다.\n- 동일 주종으로 기록 시 바로 합산되도록 변경하였습니다.\n- 특정 주종에서 잔 단위만 선택가능하도록 변경하였습니다.\n- 새벽 시간으로 기록 시 전날 일기가 있을 경우 알림창을 띄웁니다.\n- 술력 기록 시 주종과 단위에 기본값을 세팅했습니다.\n- 마이페이지에서 회원 정보 수정이 가능합니다.\n\n[버그 수정]\n- 메인화면에서 초기화 버튼 눌렀을 시 작동하지 않는 오류를 수정했습니다.\n- 메인화면에서 주종 선택하기 버튼이 반응하지 않는 오류를 수정했습니다.\n- 프로필 이미지가 뜨지 않는 현상을 수정했습니다.\n- 시간을 선택하지 않았을 경우 알림창을 띄웁니다.\n- 술력 기록 시 달력에 바로 반영되지 않는 오류를 수정했습니다.\n- 공지사항이 제대로 뜨지 않는 오류를 수정했습니다.','2023-11-17 10:46:47.200499','1.1.0 업데이트 안내','2023-11-17 10:46:47.200499'),(3,'[새로운 기능]\n회원가입 시 입력한 집 주소, 어디 쓰일지 궁금하셨죠?\n이제 술을 마시고 있으면 집까지의 최단 경로로 30분 전 막차 알림을 보냅니다.\n막차를 놓치고 싶지 않다면 바로 출발하세요!\n\n그리고 처음 입력한 주량 기준 초과 시 경고 알림도 보냅니다. (그것도 무려 세번!)\n그만 마시라는데… 알림 끄고 계속 마시는건 아니겠죠…?\n\n또한 마이페이지의 프로필 사진도 바꿀 수 있습니다.\n’주간일기’인만큼 회식 때 찍은 내 사진, 혹은 맛있는 안주 사진으로 설정하면 어떨까요?\n\n[개선 사항]\n- 어플리케이션 렌더링을 전체적으로 최적화했습니다.\n- 술력 기록을 수정할 수 있는 버튼을 추가했습니다.\n- 설정에서 알림을 켜고 끌 수 있습니다.\n- 이제 메인 페이지에서 전날 음주량을 반영한 데이터를 보여줍니다.\n- 메인 페이지의 캐릭터가 움직입니다.\n- 서비스 이용 약관, 위치 정보 이용 약관이 추가되었습니다.\n- 술력 요약 페이지를 bottomsheet로 변경하였습니다. (스와이프로 동작)\n- 술력에서 술 마신 날에 도장이 찍힙니다.\n- 술력 상세 페이지에 당일 음주량 통계 그래프를 추가했습니다.\n- 회원 정보 수정 시 키, 몸무게에 적정 범위 제한을 두었습니다.\n- 회원 가입 시 주소 입력을 활성화했습니다.','2023-11-16 00:00:00.000000','1.2.0 업데이트 안내','2023-11-17 11:01:41.000000');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `social_id` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `alcohol_limit` float DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `custom_profile_img` varchar(255) DEFAULT NULL,
  `drink_amount` float DEFAULT NULL,
  `drink_category` varchar(255) DEFAULT NULL,
  `drink_unit` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `max_nonalcohol_period` int(11) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `start_nonalcohol_date` date DEFAULT NULL,
  `today_blood_alcohol` float DEFAULT '0',
  `today_liver_alcohol` float DEFAULT '0',
  `updated_at` datetime(6) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `category_pk` tinyint(4) DEFAULT NULL,
  `location_pk` int(11) DEFAULT NULL,
  PRIMARY KEY (`social_id`),
  UNIQUE KEY `UK_hdfq28jkt9syn9kq5gsoq10n0` (`location_pk`),
  KEY `FK72820xfp5mk7s81ouddwrk40g` (`category_pk`),
  CONSTRAINT `FK72820xfp5mk7s81ouddwrk40g` FOREIGN KEY (`category_pk`) REFERENCES `category` (`category_pk`),
  CONSTRAINT `FKpujwci5tim4kfrnpb0iq9715i` FOREIGN KEY (`location_pk`) REFERENCES `location` (`location_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('3149671154','부산시 북구 화명대로 87',54.6106,'2023-11-17 10:47:20.503990',NULL,1,'소주','병','여',158,124,'tester_주간일기','https://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXJf7KO86rCE7J286riwSldUVG9rZW4iLCJzb2NpYWxJZCI6IjMxNDk2NzExNTQiLCJleHAiOjE3MDEzOTUyNzJ9.4VL2cekntE2pBKqAalAMFw7sA7m2_2QPMJuzfOjmqiM4CGmlj4xgB7c9ANWetzOvmIlsJ6UO1QBk152FnrVYUw','2023-11-17',0,0,'2023-11-17 10:52:13.696701',50,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 11:03:42
