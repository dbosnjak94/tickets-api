-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: ticket_manager
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `ticket`
--

DROP SCHEMA IF EXISTS `ticket_manager` ;

CREATE SCHEMA IF NOT EXISTS `ticket_manager`;
SHOW WARNINGS;
USE `ticket_manager` ;

DROP TABLE IF EXISTS `ticket_manager`.`ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id_ticket` int NOT NULL AUTO_INCREMENT,
  `id_vendor` int NOT NULL,
  `starting_point` varchar(255) NOT NULL,
  `end_point` varchar(255) NOT NULL,
  `time_of_departure` datetime NOT NULL,
  `time_of_arrival` datetime NOT NULL,
  `price` double NOT NULL,
  `available_number_of_tickets` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_ticket`),
  KEY `fk_id_vendor_idx` (`id_vendor`),
  CONSTRAINT `fk_id_vendor` FOREIGN KEY (`id_vendor`) REFERENCES `ticket_vendor` (`id_ticket_vendor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (7,1,'Sarajevo','Berlin','2022-01-31 16:00:00','2022-01-31 17:00:00',200,5,'2022-01-19 21:05:01','2022-01-20 03:18:49'),(8,1,'Zagreb','Dublin','2022-01-31 16:30:00','2022-01-31 19:30:00',200,100,'2022-01-20 08:25:11',NULL),(9,1,'Zagreb','Oslo','2022-01-31 15:15:00','2022-01-31 18:15:00',200,100,'2022-01-20 08:25:15',NULL),(10,2,'Zagreb','London','2022-01-31 18:30:00','2022-01-31 20:30:00',200,100,'2022-01-20 08:25:16',NULL),(11,3,'Zagreb','Rim','2022-01-20 21:00:00','2022-01-31 23:30:00',200,100,'2022-01-20 08:25:17',NULL),(12,1,'Zagreb','Pariz','2022-01-31 16:30:00','2022-01-31 16:30:00',200,20,'2022-01-20 08:25:17','2022-01-20 19:27:27'),(14,7,'Zagreb','Beograd','2022-01-31 13:30:00','2022-01-31 16:30:00',200,100,'2022-01-20 08:25:19',NULL),(15,8,'Zagreb','Madrid','2022-01-31 17:30:00','2022-01-31 22:30:00',200,100,'2022-01-20 08:25:19',NULL),(16,8,'Oslo','Istanbul','2022-01-31 18:30:00','2022-01-31 22:30:00',200,100,'2022-01-20 17:32:00',NULL),(18,8,'Zagreb','New York','2022-01-31 12:30:00','2022-02-01 06:30:00',200,0,'2022-01-20 17:33:12',NULL),(19,6,'Zagreb','Tokyo','2022-01-31 11:10:00','2022-02-01 16:15:00',200,100,'2022-01-20 19:21:57',NULL),(21,6,'Zagreb','Mexico City','2022-01-31 16:30:00','2022-01-31 16:30:00',200,20,'2022-01-21 01:02:59','2022-01-21 01:06:38');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_vendor`
--

DROP TABLE IF EXISTS `ticket_manager`.`ticket_vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_manager`.`ticket_vendor` (
  `id_ticket_vendor` int NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(255) NOT NULL,
  `vendor_address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_ticket_vendor`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_vendor`
--

LOCK TABLES `ticket_vendor` WRITE;
/*!40000 ALTER TABLE `ticket_vendor` DISABLE KEYS */;
INSERT INTO `ticket_vendor` VALUES (1,'Ryanair','Ireland','2022-01-19 18:28:02',NULL),(2,'Delta Air Lines','USA','2022-01-19 18:28:02',NULL),(3,'Lufthansa Group','Germany','2022-01-19 18:28:02',NULL),(6,'United Airlines','USA','2022-01-19 18:28:02',NULL),(7,'Emirates','UAE','2022-01-19 18:28:02',NULL),(8,'British Airways','United Kingdom','2022-01-19 18:28:02',NULL);
/*!40000 ALTER TABLE `ticket_vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `ticket_manager`.`user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_manager`.`user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(70) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Dominik','Bosnjak','dominik.bosnjak94@gmail.com','$2b$10$Ura9OlSsqpymOcoXU1yCIOeSxTohSci7B/Q4VTz0BKr8g5xXjPVFW','2022-01-19 18:28:02',NULL),(2,'Ars','Futura','ars.futura@test.com','$2b$10$b.xeuFbeZQ/392yXIFo1aus7w1kPKJF9tYWhW/jHjjd64QnPVHknq','2022-01-20 19:14:01',NULL),(4,'John','Doe','john.doe@test.com','$2b$10$ir7xhWmiEffKcVfOM7tpnuoz20vKoKLUaURvuOUG/84vzioEJGM9W','2022-01-21 00:50:30',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ticket`
--

DROP TABLE IF EXISTS `ticket_manager`.`user_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_manager`.`user_ticket` (
  `id_user_ticket` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_ticket` int NOT NULL,
  `id_purchase` int NOT NULL,
  `seat_number` int NOT NULL,
  `datetime_of_purchase` datetime NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user_ticket`),
  KEY `fk_id_user_idx` (`id_user`),
  KEY `fk_user_id_idx` (`id_user`),
  KEY `fk_id_ticket_idx` (`id_ticket`),
  CONSTRAINT `fk_id_ticket` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id_ticket`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ticket`
--

LOCK TABLES `user_ticket` WRITE;
/*!40000 ALTER TABLE `user_ticket` DISABLE KEYS */;
INSERT INTO `user_ticket` VALUES (1,1,7,28801478,1,'2022-01-20 18:30:00','2022-01-20 21:05:01',NULL),(2,1,8,80560906,1,'2022-01-20 11:59:40','2022-01-20 10:59:40',NULL),(3,1,9,42267262,1,'2022-01-20 12:01:36','2022-01-20 11:01:36',NULL),(4,1,10,49462196,1,'2022-01-20 12:03:19','2022-01-20 11:03:19',NULL),(5,1,11,50129590,1,'2022-01-20 12:06:30','2022-01-20 11:06:30',NULL),(8,1,7,27865780,2,'2022-01-20 20:07:01','2022-01-20 19:07:01',NULL),(10,1,7,22501201,4,'2022-01-20 20:08:09','2022-01-20 19:08:09',NULL),(11,1,7,83096064,5,'2022-01-20 20:08:23','2022-01-20 19:08:23',NULL),(13,2,11,19152000,2,'2022-01-20 20:18:31','2022-01-20 19:18:31',NULL),(14,2,11,90095620,3,'2022-01-20 20:19:51','2022-01-20 19:19:51',NULL),(15,2,11,88752531,4,'2022-01-20 20:20:10','2022-01-20 19:20:10',NULL),(30,4,21,76279010,1,'2022-01-21 02:03:58','2022-01-21 01:03:58',NULL),(31,4,21,30054359,2,'2022-01-21 02:04:01','2022-01-21 01:04:01',NULL),(32,4,21,64722147,3,'2022-01-21 02:04:02','2022-01-21 01:04:02',NULL);
/*!40000 ALTER TABLE `user_ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-21  2:13:43
