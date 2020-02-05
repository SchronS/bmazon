CREATE DATABASE  IF NOT EXISTS `tedi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tedi`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tedi
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids` (
  `itemID_fk` int(11) DEFAULT NULL,
  `username_fk` varchar(45) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (1,'Stratis','20','2019-09-26 17:56:04'),(1,'Stratis','22','2019-09-26 20:00:39'),(1,'Stratis','25','2019-09-26 20:01:00'),(2,'Stratis','20','2019-09-26 20:12:56'),(2,'Stratis','22','2019-09-27 18:31:29'),(2,'Stratis','25','2019-09-27 18:31:36'),(1,'Stratis','30','2019-09-27 18:58:30'),(2,'User','30','2019-09-27 18:59:06'),(19,'User','13','2019-09-27 19:00:59'),(19,'User','14','2019-09-27 19:01:23'),(19,'Stratis','15','2019-09-27 19:17:06');
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category` varchar(100) NOT NULL,
  `sub_categories` varchar(100) NOT NULL,
  PRIMARY KEY (`category`,`sub_categories`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('Books, Movies & Music','Books'),('Books, Movies & Music','DVDs & Movies'),('Books, Movies & Music','Music'),('Books, Movies & Music','Musical Instruments & Gear'),('Books, Movies & Music','Other'),('Electronics','Cameras & Photo'),('Electronics','Cell Phones, Smart Watches & Accessories'),('Electronics','Computers, Tablets & Network Hardware'),('Electronics','Other'),('Electronics','TV, Video & Home Audio Electronics'),('Electronics','Video Games & Consoles'),('Fashion','Accessories'),('Fashion','Men\'s Clothing'),('Fashion','Other'),('Fashion','Shoes'),('Fashion','Women\'s Clothing');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `category` varchar(1000) DEFAULT NULL,
  `currently` varchar(45) DEFAULT NULL,
  `buy_price` varchar(45) DEFAULT NULL,
  `first_bid` varchar(45) DEFAULT NULL,
  `number_of_bids` int(11) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `started` date DEFAULT NULL,
  `ends` date DEFAULT NULL,
  `seller_fk` varchar(200) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `other_images` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Low Poly Bear','Fashion,Men\'s Clothing,Women\'s Clothing','30','35','15',4,'37.97575992945389,23.73577003231502','2019-09-27','2019-09-30','Stratis','\n\nSolid colors: 100% Cotton; Heather Grey: 90% Cotton, 10% Polyester; All Other Heathers: 65% Cotton, 35% Polyester, Imported, Machine wash cold with like colors, dry low heat, Do polar bears make you happy. If so this is the tee for you. Encourage wildlife preservation and protect these majestic species from global warming. Great to wear to parties, clubs, bars, class, work, gyms, parks, hikes, safaris, fishing trips, etc. This Polygonal Polar Bear tshirt is the perfect gift for anyone who loves polar bears, grizzly bears, black bears, brown bears, other bears, the arctic, north pole, nature, or is a wildlife activist preservationist. For a looser fit please order a size up. Lightweight, Classic fit, Double-needle sleeve and bottom hem\n	','3462015c-c20e-4ca6-a737-51ab261e6f8a.png','4c6bb991-4399-4b96-aef6-0bdf2c250699.png'),(2,'Frontend T-shirt','Fashion,Men\'s Clothing,Women\'s Clothing','30','30','18',4,'37.97958592645275,23.72585071051419','2019-09-27','2019-09-30','Stratis','100% Cotton, Imported, Machine wash cold with like colors, dry low heat, Addicted to book club shirt for the reader has cute pink and teal pop art style logo. Book club apparel clothing gift products for women who love to read. Lightweight, Classic fit, Double-needle sleeve and bottom hem','3df2a40e-3082-4cd4-b2f2-34c78fd796ea.png','9cb2c483-d502-4c88-a303-036b70157863.png'),(3,'Solar System T-shirt','Fashion,Men\'s Clothing','20','30','20',0,'37.97745163835194,23.731777702608355','2019-09-27','2019-09-30','Stratis','100% Cotton, Imported, Machine wash cold with like colors, dry low heat, Not Me Us – Fell The Bern – Bernie Sanders 2016 – Limited Edition For Bernie Supporters and to support Bernie! Lets Feel The Bern, You are buying a top quality Bernie Sanders 2016 “Feel The Bern” design with high quality Graphic. This design is available for a limited time only and available for Women, Children and Men. Lightweight, Classic fit, Double-needle sleeve and bottom hem','0b73e772-0a16-4470-a880-4c2355f09417.png','517e6939-143a-4b39-b22d-8170770ea7ed.png'),(4,'Panasonic\'s S1H camera','Electronics,Cameras & Photo','500','0','500',0,'37.95682000000005,23.703450000000032','2019-09-27','2019-10-22','Stratis','Panasonic has added a third full-frame mirrorless camera to its L-Mount lineup with the launch of the video-oriented Lumix S1H, revealed at Cine Gear Expo 2019. It packs many of the specs we were hoping for but didn\'t receive with the S1, like 6K video, 10-bit 4:2:2 internal recording and V-Log/V-Gamut with a Sony A7 III-beating 14+ stops of dynamic range.','d52cbaf4-b8f3-40ea-8ea3-2fd3256e9064.png','f5b77de5-bdca-44aa-a77f-45ac09f0f55e.png,555eec59-b5b2-433e-b502-f0c1a4848b51.png'),(5,'Something','Books, Movies & Music,Other','100','0','100',0,'37.95682000000005,23.703450000000032','2019-09-27','2019-09-28','Stratis','No Description.',NULL,''),(19,'ewr','Electronics,Computers, Tablets & Network Hardware,Video Games & Consoles','15','312','12',3,'38.19589000000008,26.838490000000036','2019-09-02','2019-10-03','User','efawaw',NULL,'');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(45) DEFAULT NULL,
  `receiver` varchar(45) DEFAULT NULL,
  `message` varchar(5000) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'MoneyWaste','Stratis','This is a message',0),(3,'MoneyWaste','Stratis','This is a longer message',1),(4,'MoneyWaste','Stratis','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',1),(5,'Stratis','MoneyWaste','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',1),(6,'Stratis','MoneyWaste','tedi is great i would rate it 10/10 every time!',1),(8,'Stratis','MoneyWaste','Hey there,\nI\'m a message to test send functionality\nYours,\nStratis',1),(12,'MoneyWaste','Stratis','This is a message',0),(13,'MoneyWaste','Stratis','This is a message',0),(14,'MoneyWaste','Stratis','This is a diffrent message',0),(15,'User','Stratis','This is another message',0),(16,'MoneyWaste','Stratis','This is my final test message',0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `geolocation` varchar(45) DEFAULT NULL,
  `afm` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `activated` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','nimda','admin','istrator','admin@this.com','','','','','admin',NULL),('MoneyWaste','pass','Rich','I am','iamrich@this.com','','','','','bidder',1),('Stratis','pass','Stratis','Chron','chron.stratis@this.com','6955509980','Zaimi','','5','seller',1),('User','pass','User','Last','user@this.com','2109800000','','','','guest',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tedi'
--

--
-- Dumping routines for database 'tedi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-21 15:14:20
