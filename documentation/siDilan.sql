-- MySQL dump 10.13  Distrib 8.0.27, for macos11.6 (x86_64)
--
-- Host: localhost    Database: siDilan
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `app_id` int NOT NULL AUTO_INCREMENT,
  `nip` varchar(50) DEFAULT NULL,
  `last_phase` int DEFAULT NULL,
  `app_status` varchar(20) DEFAULT NULL,
  `app_type` varchar(20) DEFAULT NULL,
  `app_date` date DEFAULT NULL,
  `acc_date` date DEFAULT NULL,
  `institution_name` varchar(255) DEFAULT NULL,
  `acreditation` varchar(50) DEFAULT NULL,
  `institution_address` varchar(255) DEFAULT NULL,
  `institution_phone_number` varchar(255) DEFAULT NULL,
  `education_level` varchar(255) DEFAULT NULL,
  `study_program` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `year_of_study` varchar(20) DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`app_id`),
  KEY `nip` (`nip`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`nip`) REFERENCES `user` (`nip`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'197005201991011001',2,'Menunggu','Tugas Belajar','2021-11-23',NULL,'.','A','.','.','S1','.','.','.','.');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_data`
--

DROP TABLE IF EXISTS `employee_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_data` (
  `nip` varchar(50) NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `nik` varchar(100) DEFAULT NULL,
  `gender` varchar(2225) DEFAULT NULL,
  `place_of_birth` varchar(225) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `religion` varchar(225) DEFAULT NULL,
  `phone` varchar(225) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `profession_status` varchar(225) DEFAULT NULL,
  `specialization` varchar(225) DEFAULT NULL,
  `last_education` varchar(225) DEFAULT NULL,
  `department` varchar(225) DEFAULT NULL,
  `ranks` varchar(225) DEFAULT NULL,
  `photo` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`nip`),
  CONSTRAINT `employee_data_ibfk_1` FOREIGN KEY (`nip`) REFERENCES `user` (`nip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_data`
--

LOCK TABLES `employee_data` WRITE;
/*!40000 ALTER TABLE `employee_data` DISABLE KEYS */;
INSERT INTO `employee_data` VALUES ('197005201991011001','.','.','perempuan','.','0001-01-01','islam','.','.',12,'Pegawai Negeri Sipil','non-nakes','PPDS',' .','iiid','197005201991011001_photo.png');
/*!40000 ALTER TABLE `employee_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `files_id` int NOT NULL AUTO_INCREMENT,
  `app_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`files_id`),
  KEY `app_id` (`app_id`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`app_id`) REFERENCES `applications` (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,1,'pending','KTP','197005201991011001_1_KTP.png'),(2,1,'pending','Ijazah','197005201991011001_1_Ijazah.pdf'),(3,1,'pending','Transkrip','197005201991011001_1_Transkrip.pdf'),(4,1,'pending','SKPNS','197005201991011001_1_SKPNS.pdf'),(5,1,'pending','SK Terakhir','197005201991011001_1_SK Terakhir.pdf'),(6,1,'pending','P2KP','197005201991011001_1_P2KP.pdf');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notifications_id` int NOT NULL AUTO_INCREMENT,
  `nip` varchar(20) DEFAULT NULL,
  `link` text,
  `content` text,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`notifications_id`),
  KEY `nip` (`nip`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`nip`) REFERENCES `user` (`nip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `study_program` varchar(100) DEFAULT NULL,
  `open_date` date DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  `acreditation` varchar(100) DEFAULT NULL,
  `post_date` date DEFAULT NULL,
  `institute` varchar(100) DEFAULT NULL,
  `link` text,
  `photo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `nip` varchar(50) NOT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('196311151983121001','kt2OZA7vjwdp','rwHqeOgj'),('196404181989112001','3t52XCZNWm0U','pbva0ceW'),('196609112000031001','9kzdHbCedyeV','aA2lAN1b'),('197005201991011001','RJXy+tar9RRI','EygSyzRQ'),('197102182000122002','wsqtgJ89ywMe','eq/uIhd3'),('197108021992032003','8KoIikMYQgkO','wNaBFOaL'),('197203222000122001','Mdaihqg/8Rmn','1mB0mlfe'),('197206041993031004','BI47XUhMLzzk','wYLz+0+o'),('197303182002121002','hk+bsrry1lEW','1rNS7UnX'),('197303232008011002','qfh96MDViKBl','caU7Kh0X'),('197307011993031002','5d/OOLWTmj3v','kx75rjN2'),('197310081997032001','6/XGzis9RUTn','m6SG0Xdh'),('197405092003121003','fhzR6lZL6ArK','X1ooJhtR'),('197405291998032000','qr4TEVTquZbo','BR6JzsVd'),('197407311995032001','fi0dA/Ymp+Jz','+xCMeQcv'),('197411172005012011','jo5ZeSL4fdse','E3Hsaf06'),('197501112010012003','J3OBZ1rn0xEw','rgqLqAJ/'),('197502102002122001','HrIaQdePsFz2','ENmPxSqT'),('197502262002122005','0SBuR1MHy6As','7m0V18+u'),('197503121995031002','TQRnSTTKSgVk','CuULRW2J'),('197512152005011000','nj74/IWmihc9','WSobzcD/'),('197512251996031003','7j/pJxnZefWv','GXW2A92W'),('197601132006042012','VxKJz4ldPIFo','dZOGM0M7'),('197603042005012006','D+NUfvlN1VyB','ih6YXDxY'),('197607222011012000','03fasbvBCI1e','9yE1AG1c'),('197701072008042001','s1YDJh3ThgLs','tHUosRr3'),('197704102006042014','+8YrQFImwVyz','t1tJc3fI'),('197707082003121007','5pOCpSfiPhvM','hYf8pPb7'),('197709122008012006','IQPNnArMM7S1','E5VllN5p'),('197804222009022002','3b7N7NLShtsA','6waYViPs'),('197807182010012010','8r+Fo9owQ7Pr','OdxhW35B'),('1978092420092002','G6mrx4iwvvjB','EgNonNDq'),('197810122009031002','j7v2nHX1TGoc','xsKtFFe9'),('197905032008042001','AAshvPzUldxj','nycu+iSy'),('197905042005012008','2KkbONJrOLpB','TdCf0B7z'),('197910111998032001','QZwyXyJ6W5d6','YgUduIXo'),('198005012005012015','hrK8wNjnfGOA','d5bSsnKK'),('198006012009032003','3T4106qEoBRJ','5phxLhKU'),('198012242006042008','811xLdWKVVUl','HXQ1FTDW'),('198104022009022001','8VIsNxMOkLDS','kVnmaymp'),('198105192007012002','SGjrnxqUs8wB','tD1yMDD0'),('198106272007011008','ZrSqPUCkO1EI','ydAU5KKF'),('198109092015032001','eX1MczMgMTeN','v+in1PAN'),('198204042009022011','WOrHa5grvlxu','T09WYOwv'),('198211222008032001','TmPO7QIk8M69','k1Bx3Pkv'),('198309302010011001','MdbI5cOv00ET','PU5wfYg2'),('198311252019032005','A78NuvqjyFF5','Paa7IuQi'),('198312012010011014','sG8leaLwVZUu','L3C28csD'),('198403132008041001','3IACs/ZoHrU8','VxZd2gRc'),('198405092019032009','XWtvgJ0Fb3bq','Jbd1Uuxg'),('198408262007011003','vqE3oqpjH5iJ','ZsVkpNXu'),('198409012019031002','F5ECkX8AYT4p','0c7lKiqC'),('198410042011012000','3pHu+/kh7lET','vWvhuEfr'),('198410122019032005','7yq0Y2SSF5Tw','3Q1Df4Ua'),('198411022006042005','P9c/d0W0DC9L','oeVI+tgR'),('198411152009042004','yXTcyUihg0oE','FdHX/hCb'),('198411232019032005','fXtgyQ4ngZVm','kjggJCn6'),('198501012019032010','pSZryqKXQqvX','FrHV9A11'),('198503062009031002','/1Ac/hEbgLMN','jl8OcKnh'),('198504032014092001','YuyellLULcn4','8X0Odtj4'),('198506022019032009','lKPoRQ7IAkrs','fhMiYXe3'),('198506172011012002','zBfc7MxZ8Nn2','pnR72ses'),('198507192019032004','sGivjNWiRbAt','PILuEfMJ'),('198508152019032006','mpqhA8w3Fkl8','agIjgQhi'),('198508242019032005','NwFPuzURuyVW','JDB3Kspb'),('198512162009022006','+LPcp+hIqplr','DI03avsd'),('198605162019032005','1Tw4dikh2ivK','JKHYBMTa'),('198606152011012004','SK5IhXIMpfOV','W8LevPLo'),('198608072019031006','RGMVF/2tCz8n','dIV3cYgV'),('19860901201932008','KoGFBFEqBY/G','MLyvli5+'),('198609192019032009','Wg6tsk8ckUNY','3YPrPhf3'),('198611102019031007','b5akFKh61pnv','6Y6BahF+'),('198612262019032004','UO4mAsY3Lhi1','slwBuqYW'),('198703092019032005','6U7iKDVvwwFp','BUMm7RH2'),('198706012019032006','A9Rb/jWkv+sc','qB4bufc8'),('198706042019032007','40tpeEV8h3Bs','SmAHuq41'),('198708112019031004','JPJLzNUX2Q9t','UxhHyqEJ'),('198710042010012014','2rPMH3sL/HVk','fxB8M7gV'),('198710042015032002','2628y9FfrK7o','kjgb8IYM'),('198710052019032007','15C5UdDXdm/J','+OxlRUxn'),('198710172019032007','QyA2EenKaHLQ','XdoQAWsr'),('198711072010011003','V7MASGnahuiQ','/fHcEB0s'),('198712142019032004','toHITX3DWXZK','W7r7KEtx'),('198801132019031004','f+iYPe6xrEhj','zY6tnRv5'),('198802012014021002','foWzvcy4Yaqv','76JP+9ON'),('198803122019032006','gXl4p2swTqD+','kDOZY5II'),('198803222019032004','I6WtW58fToFt','OUfIsnsN'),('198805112020122004','5ADrtDcBgCCy','z4b0b+JR'),('198807182010011004','veVW8rVkF15W','wuBkGY8Q'),('198807272019032010','BgYRUWxmlCVl','0MA6eZ8R'),('198808282019032007','2zL3LB8iwStq','ND/ZJz6f'),('198809092019031008','J6SANHObIhdb','m4PWvVWp'),('198901242011011002','0PhxqfR0dyxR','NN6sSr8O'),('198903292019032006','K+WPkiKBWwBB','vYZNQzVM'),('198904132011012015','y1o3Rdl9B9q6','dFeHgptW'),('198904262019032006','zqS+YuUvVUa+','8uN3WHVC'),('198905262019031001','oIpTeUB3ke1n','sKnug/YP'),('198906122019031008','Wyxd1/N5G2EK','30uqzZIC'),('198906122020122003','09DENCOYaSg4','6zGEShDA'),('198908102011012002','yAAmVq5jVwba','kaqUzG21'),('198908292019032014','JYrsaTEBWh0y','RKPt4D2R'),('198912022019032007','MpGPJZcEeLxh','rUxOTmPS'),('198912082015032005','4B0ralhSy0sg','tBwS1Gkp'),('199002082014031001','R31wNoFeX/OO','fpSiNoC0'),('199002232019032007','f1UAHmDtack8','2UihktHM'),('199003242019032008','mHWjaqyK8wAu','RYPpMh0P'),('199005132019032012','WUc99iWmAnDA','Sn/JQGXD'),('199008062019031007','3sUPut4wBUt/','FnFqFSFl'),('199010132019032006','/PzIZ4hFEJlM','t+WiSAEO'),('199010312019032007','uq8twX47ert+','ON5yWCJF'),('199011182019032011','UHPPB9vc3Sf9','XukMN59l'),('199012112019032012','vYTGieHivjx5','XWwA8ODx'),('199103152019031005','amaUpQ6qHn7e','oKIqucic'),('199104032019032017','GxBufgoEJpF3','H1DQ67LH'),('199104102019032016','NVdiqNNIlPSZ','Sfuc7Z5h'),('199107272019031009','aRV+pYD7AVVo','fjC71GvD'),('199109252019032010','vqxktNIpFdvf','TXpUHQDc'),('199112272019032015','pyr/uFUDlYwe','bckTdos+'),('199203282019032012','6IcnunwBHZIE','ir/hl0NQ'),('199205042019032015','RFs3CsjkzWhN','ax/5DWQ2'),('199205252019032015','BKAvWBTqtySz','XpXisPVE'),('199207022020122010','sJU3+7cIo7v7','TCAPrOY1'),('199207152019031007','W+mfPEsk91cu','JWJogYCr'),('199209122020122006','aPqsDbRFBwXz','066dMj5o'),('199210312019031010','gYcvrNZtZwwq','q9ZJMA2Z'),('199211302019031010','Uu4NKnHPEaKs','UqjvqVT1'),('199212102019032016','l1X31v6eGizZ','2ySi0aCR'),('199212252019032013','xOSyE7rbJ52u','2SUNtOo9'),('199302132019032017','iMtlvIW2x9R4','tyW1YMU3'),('199303072020121008','+OtaxF4Qwu1l','xwl4JCa4'),('199304082019031009','5hBEltaDmUAX','xjMgtv1Z'),('199305202019032009','HLOaUtXRRivc','36Fn5rd/'),('199305312015042002','RNu9uNKwRVXe','5hdAl8mA'),('199307072019032015','gQ1fwaLRIhXM','NEv4lSwM'),('199307142019032013','b1HUh2JcFYTU','W363vfzG'),('199308052020121008','Wo4mUDfZ0+Jf','834BDYUx'),('199309302019031010','rWAg5VnstJ7Q','3PvlUYqW'),('199310192019031006','63YYkNA55Lu+','H0TZbESj'),('199311122019032008','s4AGaZ5vSU8F','weYF6ydo'),('199312192020120003','prmEMdcToZn8','sAO6n+E7'),('199401122019031007','QtkUf227w96S','qnap+jbE'),('199401192019032013','GCFsKAcaxLga','I9Z94cKQ'),('199402112019032012','EN1PueYo/TN9','GjypdWE+'),('199403062020121007','DbE/2LrGcKzi','SK7KZD8g'),('199404142019032021','y2d3LaaDnB/I','JZNUzo/3'),('199404282019032018','KdTVKK5mlhLG','n9ft3eQc'),('199406122019032014','Xog8qcrMenBe','X00bsb0P'),('199406142019032011','7C/Wb0AgCNEQ','MoAG3000'),('199406152019031011','+HuGo/NbYlwu','qfeqavU4'),('199407122019032019','MPI2PhbAS0u9','jISxmMcK'),('199407252019032013','oOEOsWKAsbqQ','CN58KVfU'),('199408172019031007','SxgseCGCqmC7','ppxZW1Zw'),('199409052019031003','Hu5Lbv+u35ua','/4Q3hJyx'),('199409082020122005','vJUP3xBgK4T/','r1vtyIwr'),('199409092019031005','nseUjbbK3ucF','XbES/nh4'),('199411012019032015','NDnmiZaPiFxa','YS4sjDx/'),('199411032020122004','YpMF7MHGLPeE','0GDEFPmA'),('199501032019032016','SMBjJIwfEPGh','iF51xM7A'),('199501112019031004','FsqZ2i89K+vT','VzCLJm57'),('199501182020121003','yZcqqR+ZRsDd','IHm5bd8F'),('199502032019032014','9+SSsdsNU23y','G5t6ADar'),('199503052019031010','0HZhi8+GrA0R','2FkO716e'),('199505152019032019','Uvx1Xja78P/3','bKx52MnH'),('199506022019031004','5fUQEaUvHsFT','7pUjpsRs'),('199508202019032010','sLC8ZQQ6f6x/','ZOpLlpzH'),('199508212019032013','tyLDO/EzaFnR','iRpIbOQv'),('199509122019031003','AFjaWSGPU3jW','abY5RjEd'),('199509162019031006','YRL4ziV88WMN','blFp9QDl'),('199509172019032006','WmKs3QqWmBcn','0bSMId0B'),('199511072019032009','O7j/TsuQr6QU','s99gsgee'),('199511242019032003','cWkgqEciOzkZ','/WiOCypF'),('199511302019032012','RCCnutrGCw4F','4MUq6GrH'),('199512112019032013','GE1Yql8D8+Jz','FOnsdDCt'),('199512172019032010','22559j8IiTx+','PQst6thE'),('199602062019032013','wfCqhLt2/g1z','PWuMVHt1'),('199604072019032015','SuSk9+HAIu4X','oadX5Mla'),('199605192019032008','VNMr3XKPiOd3','ZYU0oTSf'),('199606172019032013','xRwRZUHHlfvB','F5MEgika'),('199608282019032008','f5lTV5HdTRHM','34v4bN7e'),('199611032019032005','DpshyPCGb17D','Vvl27E+R'),('199612232019032003','TJ1WXi+s4kOj','jBaV0lUk'),('199701222019032005','mXRWgIc8KsMS','Al3mWSYB'),('199702022020122009','6TBfw4Rke1M8','TdAdvkE9'),('199708192020122008','CvRQDTMmBAVK','5qnQUqVM'),('199709182019032002','oKdFIMQ4TkvR','/jqCBt4E'),('199711232019031001','im+7hU8ZYO1b','R/t9XkbD');
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

-- Dump completed on 2021-11-23  7:16:27
