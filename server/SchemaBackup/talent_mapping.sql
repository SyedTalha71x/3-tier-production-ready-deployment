-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: talent_mapping
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.23.10.2

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
-- Table structure for table `path`
--

DROP TABLE IF EXISTS `path`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `path` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `path` varchar(350) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `path_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `path`
--

LOCK TABLES `path` WRITE;
/*!40000 ALTER TABLE `path` DISABLE KEYS */;
INSERT INTO `path` VALUES (1,1,'hello','2024-10-08 11:28:50'),(4,1,'I want to become a Cloud Engineer','2024-10-14 10:04:36'),(5,1,'I want to become a Cloud Engineer','2024-10-14 10:05:25'),(6,1,'I want to become a Cloud Engineer','2024-10-14 10:07:58'),(7,1,'I want to become a Mern Stack Developer','2024-10-14 10:10:03'),(8,1,'I want to become a Backend Developer','2024-10-14 10:12:02'),(9,1,'I want to become a Content Writer','2024-10-14 10:13:11'),(10,1,'How to become a software engineer','2024-10-16 06:26:24'),(11,1,'how to become a software engineer','2024-10-16 06:28:51'),(12,1,'how to become a devOps Engineer','2024-10-16 07:03:52'),(13,1,'Build a successful tech startup','2024-10-16 07:04:40'),(14,1,'Develop a fitness routine for weight loss','2024-10-16 07:06:59'),(15,1,'Learn machine learning in 6 months','2024-10-16 07:08:17'),(16,1,'how to become a barber','2024-10-16 07:11:37'),(17,1,'Learn machine learning in 6 months','2024-10-16 07:19:02'),(18,1,'Develop a fitness routine for weight loss','2024-10-16 07:21:07'),(19,1,'Learn machine learning in 6 months','2024-10-16 07:21:54'),(20,1,'Build a successful tech startup','2024-10-16 07:23:15'),(21,1,'Learn machine learning in 6 months','2024-10-16 07:24:36'),(22,1,'Build a successful tech startup','2024-10-16 07:25:50'),(23,1,'Learn machine learning in 6 months','2024-10-16 07:26:24'),(24,1,'Develop a fitness routine for weight loss','2024-10-16 07:26:53'),(25,1,'Build a successful tech startup','2024-10-16 07:27:19'),(26,1,'How to become a devops engineer','2024-10-16 07:27:43'),(27,1,'how to build a successful tech startup','2024-10-16 12:15:05'),(28,1,'how to build a successful tech startup','2024-10-16 12:15:25'),(29,1,'Can you please guide me through a roadmap of ui/ux developer right now im a frontend developer\n','2024-10-16 12:19:35');
/*!40000 ALTER TABLE `path` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `step_id` int NOT NULL,
  `name` varchar(350) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `step_id` (`step_id`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=293 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,1,'Programming languages such as Python, Java, or C++','2024-10-14 10:08:04'),(2,1,'Understanding of networking and security principles','2024-10-14 10:08:04'),(3,1,'Knowledge of operating systems like Linux and Windows','2024-10-14 10:08:04'),(4,2,'Understanding of infrastructure as code and automation tools like Terraform or Ansible','2024-10-14 10:08:04'),(5,2,'Experience with cloud platforms such as AWS, Azure, or Google Cloud','2024-10-14 10:08:04'),(6,2,'Familiarity with virtualization technologies like VMWare or Docker','2024-10-14 10:08:04'),(7,3,'Google Cloud Certified - Professional Cloud Architect','2024-10-14 10:08:04'),(8,3,'AWS Certified Solutions Architect','2024-10-14 10:08:04'),(9,3,'Microsoft Certified: Azure Solutions Architect','2024-10-14 10:08:04'),(10,4,'Contribute to open source projects or build personal projects on cloud platforms','2024-10-14 10:08:04'),(11,4,'Stay current with industry trends and technologies','2024-10-14 10:08:04'),(12,4,'Participate in training courses and workshops','2024-10-14 10:08:04'),(13,5,'HTML','2024-10-14 10:10:08'),(14,5,'CSS','2024-10-14 10:10:08'),(15,5,'JavaScript','2024-10-14 10:10:08'),(16,6,'Node.js','2024-10-14 10:10:08'),(17,6,'Express.js','2024-10-14 10:10:08'),(18,7,'React.js','2024-10-14 10:10:08'),(19,8,'MongoDB','2024-10-14 10:10:08'),(20,9,'MERN stack development','2024-10-14 10:10:08'),(21,10,'Java','2024-10-14 10:12:09'),(22,10,'Python','2024-10-14 10:12:09'),(23,10,'Ruby','2024-10-14 10:12:09'),(24,10,'C#','2024-10-14 10:12:09'),(25,11,'SQL','2024-10-14 10:12:09'),(26,11,'NoSQL','2024-10-14 10:12:09'),(27,11,'Database design','2024-10-14 10:12:09'),(28,12,'HTTP protocol','2024-10-14 10:12:09'),(29,12,'RESTful APIs','2024-10-14 10:12:09'),(30,12,'Server-side scripting','2024-10-14 10:12:09'),(31,13,'Ruby on Rails','2024-10-14 10:12:09'),(32,13,'Node.js','2024-10-14 10:12:09'),(33,13,'Django','2024-10-14 10:12:09'),(34,13,'Spring','2024-10-14 10:12:09'),(35,14,'Data structures','2024-10-14 10:12:09'),(36,14,'Algorithms','2024-10-14 10:12:09'),(37,14,'Problem-solving techniques','2024-10-14 10:12:09'),(38,15,'Collaboration','2024-10-14 10:12:09'),(39,15,'Version control (e.g. Git)','2024-10-14 10:12:09'),(40,15,'Testing and debugging','2024-10-14 10:12:09'),(41,16,'Understanding of basic programming concepts like variables, loops, and functions','2024-10-16 06:28:56'),(42,16,'Proficiency in at least one programming language such as Python, Java, or C++','2024-10-16 06:28:56'),(43,17,'Knowledge of algorithms for sorting, searching, and optimization','2024-10-16 06:28:56'),(44,17,'Understanding of common data structures like arrays, linked lists, trees, and graphs','2024-10-16 06:28:56'),(45,18,'Practice writing code for real-world projects or contributing to open-source projects','2024-10-16 06:28:56'),(46,18,'Learn about software design patterns and best practices','2024-10-16 06:28:56'),(47,19,'Obtain certifications in relevant technologies or programming languages','2024-10-16 06:28:56'),(48,19,'Consider obtaining a degree in computer science or a related field','2024-10-16 06:28:56'),(49,20,'Demonstrate your problem-solving and coding skills through personal projects or hackathons','2024-10-16 06:28:56'),(50,20,'Develop a portfolio showcasing your projects, code samples, and contributions','2024-10-16 06:28:56'),(51,21,'Stay current with industry trends, technologies, and tools','2024-10-16 06:28:56'),(52,21,'Engage in continuous learning through online courses, workshops, or conferences','2024-10-16 06:28:56'),(53,22,'Python','2024-10-16 07:03:56'),(54,22,'Shell scripting','2024-10-16 07:03:56'),(55,22,'Java','2024-10-16 07:03:56'),(56,23,'Git','2024-10-16 07:03:56'),(57,23,'SVN','2024-10-16 07:03:56'),(58,24,'Jenkins','2024-10-16 07:03:56'),(59,24,'GitLab CI','2024-10-16 07:03:56'),(60,24,'Travis CI','2024-10-16 07:03:56'),(61,25,'Terraform','2024-10-16 07:03:56'),(62,25,'CloudFormation','2024-10-16 07:03:56'),(63,25,'Ansible','2024-10-16 07:03:56'),(64,26,'Docker','2024-10-16 07:03:56'),(65,26,'Kubernetes','2024-10-16 07:03:56'),(66,27,'Prometheus','2024-10-16 07:03:56'),(67,27,'Grafana','2024-10-16 07:03:56'),(68,27,'ELK Stack','2024-10-16 07:03:56'),(69,28,'AWS','2024-10-16 07:03:56'),(70,28,'Azure','2024-10-16 07:03:56'),(71,28,'Google Cloud Platform (GCP)','2024-10-16 07:03:56'),(72,29,'Troubleshooting skills','2024-10-16 07:03:57'),(73,29,'Collaboration skills','2024-10-16 07:03:57'),(74,30,'Problem-solving skills','2024-10-16 07:04:45'),(75,30,'Market research','2024-10-16 07:04:45'),(76,31,'Business acumen','2024-10-16 07:04:45'),(77,31,'Financial forecasting','2024-10-16 07:04:45'),(78,32,'Software development','2024-10-16 07:04:45'),(79,32,'User experience design','2024-10-16 07:04:45'),(80,33,'User testing','2024-10-16 07:04:45'),(81,33,'Iterative development','2024-10-16 07:04:45'),(82,34,'Pitching investors','2024-10-16 07:04:45'),(83,34,'Financial management','2024-10-16 07:04:45'),(84,35,'Marketing','2024-10-16 07:04:45'),(85,35,'Product launch strategy','2024-10-16 07:04:45'),(86,36,'Scaling operations','2024-10-16 07:04:45'),(87,36,'Team building','2024-10-16 07:04:45'),(88,37,'Understanding current weight, body composition, and fitness level','2024-10-16 07:07:02'),(89,38,'Setting achievable and measurable weight loss targets','2024-10-16 07:07:02'),(90,39,'Seeking guidance from a personal trainer or fitness coach','2024-10-16 07:07:02'),(91,40,'Incorporating cardio, strength training, and flexibility exercises','2024-10-16 07:07:02'),(92,41,'Balancing macronutrients, portion control, and mindful eating habits','2024-10-16 07:07:02'),(93,42,'Monitoring weight loss, fitness improvements, and adjusting workout and diet as needed','2024-10-16 07:07:02'),(94,43,'Python programming','2024-10-16 07:08:22'),(95,43,'Data structures and algorithms','2024-10-16 07:08:22'),(96,44,'Linear algebra','2024-10-16 07:08:22'),(97,44,'Descriptive statistics','2024-10-16 07:08:22'),(98,44,'Probability theory','2024-10-16 07:08:22'),(99,45,'Supervised learning','2024-10-16 07:08:22'),(100,45,'Unsupervised learning','2024-10-16 07:08:22'),(101,45,'Model evaluation','2024-10-16 07:08:22'),(102,46,'Clustering algorithms','2024-10-16 07:08:22'),(103,46,'Regression algorithms','2024-10-16 07:08:22'),(104,46,'Classification algorithms','2024-10-16 07:08:22'),(105,47,'Keras','2024-10-16 07:08:22'),(106,47,'Scikit-learn','2024-10-16 07:08:22'),(107,47,'TensorFlow','2024-10-16 07:08:22'),(108,48,'Data preprocessing','2024-10-16 07:08:22'),(109,48,'Feature engineering','2024-10-16 07:08:22'),(110,48,'Model tuning and optimization','2024-10-16 07:08:22'),(111,49,'Understanding state licensing requirements','2024-10-16 07:11:40'),(112,50,'Barbering techniques','2024-10-16 07:11:40'),(113,50,'Client communication','2024-10-16 07:11:40'),(114,51,'Knowledge of barbering laws and regulations','2024-10-16 07:11:40'),(115,51,'Practical barbering skills','2024-10-16 07:11:40'),(116,52,'Haircutting and styling','2024-10-16 07:11:40'),(117,52,'Beard trimming','2024-10-16 07:11:40'),(118,53,'Customer service','2024-10-16 07:11:40'),(119,53,'Marketing and networking','2024-10-16 07:11:40'),(120,54,'Python syntax','2024-10-16 07:19:07'),(121,54,'Data types and structures','2024-10-16 07:19:07'),(122,54,'Functions and modules','2024-10-16 07:19:07'),(123,55,'Mean, median, mode','2024-10-16 07:19:07'),(124,55,'Standard deviation and variance','2024-10-16 07:19:07'),(125,55,'Matrix operations','2024-10-16 07:19:07'),(126,56,'Supervised learning','2024-10-16 07:19:07'),(127,56,'Unsupervised learning','2024-10-16 07:19:07'),(128,56,'Model evaluation and validation','2024-10-16 07:19:07'),(129,57,'Keras','2024-10-16 07:19:07'),(130,57,'Scikit-learn','2024-10-16 07:19:07'),(131,57,'TensorFlow','2024-10-16 07:19:07'),(132,58,'Data preprocessing','2024-10-16 07:19:07'),(133,58,'Feature engineering','2024-10-16 07:19:07'),(134,58,'Model tuning and optimization','2024-10-16 07:19:07'),(135,59,'Deep learning','2024-10-16 07:19:07'),(136,59,'Reinforcement learning','2024-10-16 07:19:07'),(137,59,'Natural language processing','2024-10-16 07:19:07'),(138,60,'Understanding current weight, body fat percentage, and fitness level','2024-10-16 07:21:11'),(139,61,'Setting achievable weight loss targets','2024-10-16 07:21:11'),(140,61,'Establishing a timeline for reaching goals','2024-10-16 07:21:11'),(141,62,'Consulting with a nutritionist or dietitian','2024-10-16 07:21:11'),(142,62,'Planning meals with proper macro and micronutrient balance','2024-10-16 07:21:11'),(143,63,'Incorporating cardiovascular exercises','2024-10-16 07:21:11'),(144,63,'Incorporating strength training exercises','2024-10-16 07:21:11'),(145,63,'Including flexibility and mobility exercises','2024-10-16 07:21:11'),(146,64,'Keeping track of weight loss progress','2024-10-16 07:21:11'),(147,64,'Adjusting diet and exercise routine as needed','2024-10-16 07:21:11'),(148,65,'Finding a support system or accountability partner','2024-10-16 07:21:11'),(149,65,'Rewarding yourself for reaching milestones','2024-10-16 07:21:11'),(150,66,'Basic understanding of statistics','2024-10-16 07:21:58'),(151,66,'Familiarity with programming languages like Python','2024-10-16 07:21:58'),(152,66,'Learn about different types of machine learning algorithms','2024-10-16 07:21:58'),(153,67,'Data cleaning and handling missing values','2024-10-16 07:21:59'),(154,67,'Feature scaling and normalization','2024-10-16 07:21:59'),(155,67,'Encoding categorical variables','2024-10-16 07:21:59'),(156,68,'Regression techniques','2024-10-16 07:21:59'),(157,68,'Classification techniques','2024-10-16 07:21:59'),(158,68,'Model evaluation and selection','2024-10-16 07:21:59'),(159,69,'Clustering algorithms','2024-10-16 07:21:59'),(160,69,'Dimensionality reduction techniques','2024-10-16 07:21:59'),(161,69,'Anomaly detection','2024-10-16 07:21:59'),(162,70,'Neural networks and deep learning frameworks','2024-10-16 07:21:59'),(163,70,'Convolutional Neural Networks (CNNs) for image data','2024-10-16 07:21:59'),(164,70,'Recurrent Neural Networks (RNNs) for sequential data','2024-10-16 07:21:59'),(165,71,'Work on Kaggle competitions or personal projects','2024-10-16 07:21:59'),(166,71,'Apply machine learning to real-world problems','2024-10-16 07:21:59'),(167,71,'Stay updated with the latest trends and research in machine learning','2024-10-16 07:21:59'),(168,72,'Market research','2024-10-16 07:23:20'),(169,72,'Problem-solving','2024-10-16 07:23:20'),(170,73,'Product development','2024-10-16 07:23:20'),(171,73,'Innovation','2024-10-16 07:23:20'),(172,74,'Business acumen','2024-10-16 07:23:20'),(173,74,'Financial planning','2024-10-16 07:23:20'),(174,75,'Coding','2024-10-16 07:23:20'),(175,75,'Prototyping','2024-10-16 07:23:20'),(176,76,'User testing','2024-10-16 07:23:20'),(177,76,'Agile development','2024-10-16 07:23:20'),(178,77,'Digital marketing','2024-10-16 07:23:20'),(179,77,'Sales','2024-10-16 07:23:20'),(180,78,'Strategic planning','2024-10-16 07:23:21'),(181,78,'Team building','2024-10-16 07:23:21'),(182,79,'Basic understanding of machine learning concepts','2024-10-16 07:24:42'),(183,79,'Learn about supervised and unsupervised learning','2024-10-16 07:24:42'),(184,79,'Familiarize yourself with popular machine learning algorithms','2024-10-16 07:24:42'),(185,80,'Data cleaning and handling missing values','2024-10-16 07:24:42'),(186,80,'Feature scaling and normalization','2024-10-16 07:24:42'),(187,80,'Feature extraction and selection','2024-10-16 07:24:42'),(188,81,'Cross-validation and hyperparameter tuning','2024-10-16 07:24:42'),(189,81,'Model evaluation metrics','2024-10-16 07:24:42'),(190,81,'Bias-Variance tradeoff','2024-10-16 07:24:42'),(191,82,'Neural network architecture and design','2024-10-16 07:24:42'),(192,82,'Activation functions and optimization algorithms','2024-10-16 07:24:42'),(193,82,'Introduction to popular deep learning frameworks like TensorFlow or PyTorch','2024-10-16 07:24:42'),(194,83,'Ensemble methods and boosting algorithms','2024-10-16 07:24:42'),(195,83,'Dimensionality reduction techniques','2024-10-16 07:24:42'),(196,83,'Reinforcement learning and natural language processing','2024-10-16 07:24:42'),(197,84,'Work on practical projects and Kaggle competitions','2024-10-16 07:24:42'),(198,84,'Implement machine learning models in real-world scenarios','2024-10-16 07:24:42'),(199,84,'Collaborate with other data scientists and machine learning enthusiasts','2024-10-16 07:24:42'),(200,85,'Problem-solving','2024-10-16 07:25:54'),(201,85,'Market research','2024-10-16 07:25:54'),(202,86,'Strategic planning','2024-10-16 07:25:54'),(203,86,'Financial forecasting','2024-10-16 07:25:54'),(204,87,'Software development','2024-10-16 07:25:54'),(205,87,'User experience design','2024-10-16 07:25:54'),(206,88,'Agile development','2024-10-16 07:25:54'),(207,88,'User feedback analysis','2024-10-16 07:25:54'),(208,89,'Team building','2024-10-16 07:25:54'),(209,89,'Recruitment','2024-10-16 07:25:54'),(210,90,'Pitching','2024-10-16 07:25:54'),(211,90,'Financial management','2024-10-16 07:25:54'),(212,91,'Marketing','2024-10-16 07:25:54'),(213,91,'Sales','2024-10-16 07:25:54'),(214,92,'Business development','2024-10-16 07:25:54'),(215,92,'Scaling strategies','2024-10-16 07:25:54'),(216,93,'Understanding basic concepts of machine learning','2024-10-16 07:26:29'),(217,93,'Learning about different types of machine learning algorithms','2024-10-16 07:26:29'),(218,94,'Brushing up on linear algebra and calculus','2024-10-16 07:26:29'),(219,94,'Understanding probability and statistics','2024-10-16 07:26:29'),(220,95,'Learning Python programming language','2024-10-16 07:26:29'),(221,95,'Getting familiar with libraries like NumPy, Pandas, and Scikit-learn','2024-10-16 07:26:29'),(222,96,'Cleaning and preparing data for analysis','2024-10-16 07:26:29'),(223,96,'Visualizing data using tools like Matplotlib and Seaborn','2024-10-16 07:26:29'),(224,97,'Implementing supervised and unsupervised learning algorithms','2024-10-16 07:26:29'),(225,97,'Evaluating and fine-tuning models for better performance','2024-10-16 07:26:29'),(226,98,'Working on hands-on projects to apply machine learning concepts','2024-10-16 07:26:29'),(227,98,'Exploring different applications of machine learning in various industries','2024-10-16 07:26:29'),(228,99,'Perform a fitness assessment to determine current fitness level','2024-10-16 07:26:55'),(229,100,'Consult with a healthcare professional to set achievable weight loss goals','2024-10-16 07:26:55'),(230,101,'Include a mix of cardiovascular exercises, strength training, and flexibility exercises','2024-10-16 07:26:55'),(231,102,'Regularly track weight loss progress and adjust workout routine as needed','2024-10-16 07:26:55'),(232,103,'Find ways to stay motivated and consistent with your fitness routine','2024-10-16 07:26:55'),(233,104,'Problem-solving','2024-10-16 07:27:24'),(234,104,'Market research','2024-10-16 07:27:24'),(235,105,'Innovation','2024-10-16 07:27:24'),(236,105,'Product development','2024-10-16 07:27:24'),(237,106,'Prototyping','2024-10-16 07:27:24'),(238,106,'Software development','2024-10-16 07:27:24'),(239,107,'User testing','2024-10-16 07:27:24'),(240,107,'Agile methodology','2024-10-16 07:27:24'),(241,108,'Cloud computing','2024-10-16 07:27:24'),(242,108,'Scalability planning','2024-10-16 07:27:24'),(243,109,'Marketing','2024-10-16 07:27:24'),(244,109,'Sales','2024-10-16 07:27:24'),(245,110,'Pitching to investors','2024-10-16 07:27:24'),(246,110,'Financial planning','2024-10-16 07:27:24'),(247,111,'Leadership','2024-10-16 07:27:24'),(248,111,'Strategic planning','2024-10-16 07:27:24'),(249,112,'Programming languages such as Python, Java, or Ruby','2024-10-16 07:27:50'),(250,112,'Version control systems like Git','2024-10-16 07:27:50'),(251,112,'Basic understanding of networking and databases','2024-10-16 07:27:50'),(252,113,'Linux operating system','2024-10-16 07:27:50'),(253,113,'Shell scripting','2024-10-16 07:27:50'),(254,113,'Virtualization and containerization technologies such as Docker','2024-10-16 07:27:50'),(255,114,'CI/CD tools like Jenkins or Travis CI','2024-10-16 07:27:50'),(256,114,'Automated testing frameworks','2024-10-16 07:27:50'),(257,114,'Infrastructure as code tools like Terraform or Ansible','2024-10-16 07:27:50'),(258,115,'Public cloud platforms like AWS, Azure, or Google Cloud','2024-10-16 07:27:50'),(259,115,'Understanding of cloud services such as EC2, S3, or Azure DevOps','2024-10-16 07:27:50'),(260,115,'Monitoring and logging tools like CloudWatch or Stackdriver','2024-10-16 07:27:50'),(261,116,'Understanding of security best practices','2024-10-16 07:27:50'),(262,116,'Knowledge of security tools like Vault or AWS IAM','2024-10-16 07:27:50'),(263,116,'Compliance and governance frameworks like GDPR or PCI DSS','2024-10-16 07:27:50'),(264,117,'Certifications such as AWS Certified DevOps Engineer, Docker Certified Associate, or Kubernetes Certified Administrator','2024-10-16 07:27:50'),(265,118,'Problem solving','2024-10-16 12:15:30'),(266,118,'Market research','2024-10-16 12:15:30'),(267,119,'Financial planning','2024-10-16 12:15:30'),(268,119,'Business development','2024-10-16 12:15:30'),(269,120,'Product development','2024-10-16 12:15:30'),(270,120,'Coding','2024-10-16 12:15:30'),(271,121,'User testing','2024-10-16 12:15:30'),(272,121,'Agile methodology','2024-10-16 12:15:30'),(273,122,'Sales','2024-10-16 12:15:30'),(274,122,'Marketing','2024-10-16 12:15:30'),(275,123,'Team building','2024-10-16 12:15:30'),(276,123,'Scaling strategies','2024-10-16 12:15:30'),(277,124,'Understanding user experience design principles','2024-10-16 12:19:41'),(278,124,'Understanding user interface design principles','2024-10-16 12:19:41'),(279,125,'Conducting user research','2024-10-16 12:19:41'),(280,125,'Creating user personas','2024-10-16 12:19:41'),(281,125,'Building user flows','2024-10-16 12:19:41'),(282,126,'Wireframing and prototyping','2024-10-16 12:19:41'),(283,126,'Visual design principles','2024-10-16 12:19:41'),(284,126,'Creating design mockups','2024-10-16 12:19:41'),(285,127,'Understanding of popular frontend frameworks like React, Angular, or Vue','2024-10-16 12:19:41'),(286,127,'Implementing UI/UX design within frontend frameworks','2024-10-16 12:19:41'),(287,128,'Building real-world UI/UX projects','2024-10-16 12:19:41'),(288,128,'Collaborating with designers and developers','2024-10-16 12:19:41'),(289,128,'Receiving and implementing feedback','2024-10-16 12:19:41'),(290,129,'Proficiency in design tools like Sketch, Figma, or Adobe XD','2024-10-16 12:19:41'),(291,129,'Proficiency in prototyping tools like InVision or Marvel','2024-10-16 12:19:41'),(292,129,'Knowledge of version control systems like Git','2024-10-16 12:19:41');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `steps`
--

DROP TABLE IF EXISTS `steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `steps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path_id` int NOT NULL,
  `name` varchar(350) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `path_id` (`path_id`),
  CONSTRAINT `steps_ibfk_1` FOREIGN KEY (`path_id`) REFERENCES `path` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `steps`
--

LOCK TABLES `steps` WRITE;
/*!40000 ALTER TABLE `steps` DISABLE KEYS */;
INSERT INTO `steps` VALUES (1,6,'Get a Bachelor\'s degree in Computer Science or related field','2024-10-14 10:08:04'),(2,6,'Gain experience in IT or related field','2024-10-14 10:08:04'),(3,6,'Obtain relevant certifications','2024-10-14 10:08:04'),(4,6,'Continuously update skills and knowledge','2024-10-14 10:08:04'),(5,7,'Learn HTML, CSS, and JavaScript','2024-10-14 10:10:08'),(6,7,'Learn Node.js and Express.js for Backend Development','2024-10-14 10:10:08'),(7,7,'Learn React.js for Frontend Development','2024-10-14 10:10:08'),(8,7,'Learn MongoDB for Database Management','2024-10-14 10:10:08'),(9,7,'Combine all skills to build MERN stack applications','2024-10-14 10:10:08'),(10,8,'Learn a programming language','2024-10-14 10:12:09'),(11,8,'Understand databases','2024-10-14 10:12:09'),(12,8,'Learn about web servers and APIs','2024-10-14 10:12:09'),(13,8,'Gain experience with backend frameworks','2024-10-14 10:12:09'),(14,8,'Practice problem-solving and algorithm skills','2024-10-14 10:12:09'),(15,8,'Work on real-world projects','2024-10-14 10:12:09'),(16,11,'Step 1: Learn the Basics of Programming','2024-10-16 06:28:56'),(17,11,'Step 2: Study Data Structures and Algorithms','2024-10-16 06:28:56'),(18,11,'Step 3: Gain Experience with Software Development','2024-10-16 06:28:56'),(19,11,'Step 4: Pursue Formal Education or Certification','2024-10-16 06:28:56'),(20,11,'Step 5: Build a Strong Portfolio','2024-10-16 06:28:56'),(21,11,'Step 6: Stay Updated and Continuously Learn','2024-10-16 06:28:56'),(22,12,'Learn Programming Languages','2024-10-16 07:03:56'),(23,12,'Understand Version Control','2024-10-16 07:03:56'),(24,12,'Learn Continuous Integration/Continuous Deployment (CI/CD) tools','2024-10-16 07:03:56'),(25,12,'Understand Infrastructure as Code (IaC)','2024-10-16 07:03:56'),(26,12,'Learn Containerization','2024-10-16 07:03:56'),(27,12,'Develop Monitoring and Logging Skills','2024-10-16 07:03:56'),(28,12,'Gain Knowledge in Cloud Platforms','2024-10-16 07:03:56'),(29,12,'Work on Real-world Projects','2024-10-16 07:03:57'),(30,13,'Identify a problem worth solving','2024-10-16 07:04:45'),(31,13,'Develop a strong business plan','2024-10-16 07:04:45'),(32,13,'Build a prototype','2024-10-16 07:04:45'),(33,13,'Test and validate the prototype','2024-10-16 07:04:45'),(34,13,'Secure funding','2024-10-16 07:04:45'),(35,13,'Launch the product','2024-10-16 07:04:45'),(36,13,'Scale the business','2024-10-16 07:04:45'),(37,14,'Assess current fitness level','2024-10-16 07:07:02'),(38,14,'Set realistic weight loss goals','2024-10-16 07:07:02'),(39,14,'Consult with a fitness professional','2024-10-16 07:07:02'),(40,14,'Create a balanced workout plan','2024-10-16 07:07:02'),(41,14,'Develop a healthy eating plan','2024-10-16 07:07:02'),(42,14,'Track progress and make adjustments','2024-10-16 07:07:02'),(43,15,'Build a strong foundation in programming','2024-10-16 07:08:22'),(44,15,'Learn basic statistics and linear algebra','2024-10-16 07:08:22'),(45,15,'Understand machine learning concepts','2024-10-16 07:08:22'),(46,15,'Explore different machine learning algorithms','2024-10-16 07:08:22'),(47,15,'Practice using machine learning libraries','2024-10-16 07:08:22'),(48,15,'Work on real-world projects and challenges','2024-10-16 07:08:22'),(49,16,'Research barbering requirements in your state','2024-10-16 07:11:40'),(50,16,'Complete a barbering program or apprenticeship','2024-10-16 07:11:40'),(51,16,'Pass the barbering licensing exam','2024-10-16 07:11:40'),(52,16,'Gain hands-on experience','2024-10-16 07:11:40'),(53,16,'Build a client base','2024-10-16 07:11:40'),(54,17,'Step 1: Learn the basics of Python programming language','2024-10-16 07:19:07'),(55,17,'Step 2: Understand the fundamentals of statistics and linear algebra','2024-10-16 07:19:07'),(56,17,'Step 3: Dive into machine learning concepts','2024-10-16 07:19:07'),(57,17,'Step 4: Get hands-on experience with popular machine learning libraries','2024-10-16 07:19:07'),(58,17,'Step 5: Work on real-world projects and Kaggle competitions','2024-10-16 07:19:07'),(59,17,'Step 6: Stay updated with the latest trends in machine learning','2024-10-16 07:19:07'),(60,18,'Assess Current Fitness Level','2024-10-16 07:21:11'),(61,18,'Set Realistic Goals','2024-10-16 07:21:11'),(62,18,'Create a Balanced Diet Plan','2024-10-16 07:21:11'),(63,18,'Design a Workout Routine','2024-10-16 07:21:11'),(64,18,'Monitor Progress and Adjust','2024-10-16 07:21:11'),(65,18,'Stay Consistent and Motivated','2024-10-16 07:21:11'),(66,19,'Step 1: Introduction to Machine Learning','2024-10-16 07:21:58'),(67,19,'Step 2: Data Preprocessing','2024-10-16 07:21:59'),(68,19,'Step 3: Supervised Learning','2024-10-16 07:21:59'),(69,19,'Step 4: Unsupervised Learning','2024-10-16 07:21:59'),(70,19,'Step 5: Deep Learning','2024-10-16 07:21:59'),(71,19,'Step 6: Practical Projects and Real-world Applications','2024-10-16 07:21:59'),(72,20,'Identify a problem or need in the market','2024-10-16 07:23:20'),(73,20,'Develop a unique solution or product','2024-10-16 07:23:20'),(74,20,'Create a business plan','2024-10-16 07:23:20'),(75,20,'Build a prototype or MVP','2024-10-16 07:23:20'),(76,20,'Test and iterate on the product','2024-10-16 07:23:20'),(77,20,'Launch and market the product','2024-10-16 07:23:20'),(78,20,'Scale the business','2024-10-16 07:23:20'),(79,21,'Week 1-4: Introduction to Machine Learning','2024-10-16 07:24:42'),(80,21,'Week 5-8: Data Preprocessing and Feature Engineering','2024-10-16 07:24:42'),(81,21,'Week 9-12: Model Selection and Evaluation','2024-10-16 07:24:42'),(82,21,'Week 13-16: Deep Learning Fundamentals','2024-10-16 07:24:42'),(83,21,'Week 17-20: Advanced Topics in Machine Learning','2024-10-16 07:24:42'),(84,21,'Week 21-24: Real-world Applications and Projects','2024-10-16 07:24:42'),(85,22,'Identify a problem or opportunity','2024-10-16 07:25:54'),(86,22,'Create a business plan','2024-10-16 07:25:54'),(87,22,'Develop a prototype','2024-10-16 07:25:54'),(88,22,'Test and iterate','2024-10-16 07:25:54'),(89,22,'Build a team','2024-10-16 07:25:54'),(90,22,'Secure funding','2024-10-16 07:25:54'),(91,22,'Launch and market','2024-10-16 07:25:54'),(92,22,'Scale and grow','2024-10-16 07:25:54'),(93,23,'Step 1: Introduction to Machine Learning','2024-10-16 07:26:29'),(94,23,'Step 2: Mathematics for Machine Learning','2024-10-16 07:26:29'),(95,23,'Step 3: Programming Languages and Tools','2024-10-16 07:26:29'),(96,23,'Step 4: Data Preprocessing and Visualization','2024-10-16 07:26:29'),(97,23,'Step 5: Building Machine Learning Models','2024-10-16 07:26:29'),(98,23,'Step 6: Real-world Applications and Projects','2024-10-16 07:26:29'),(99,24,'Assess Current Fitness Level','2024-10-16 07:26:55'),(100,24,'Set Realistic Weight Loss Goals','2024-10-16 07:26:55'),(101,24,'Create a Balanced Workout Plan','2024-10-16 07:26:55'),(102,24,'Monitor Progress and Adjust Routine','2024-10-16 07:26:55'),(103,24,'Stay Consistent and Motivated','2024-10-16 07:26:55'),(104,25,'Identify a problem or opportunity','2024-10-16 07:27:24'),(105,25,'Develop a unique value proposition','2024-10-16 07:27:24'),(106,25,'Create a minimum viable product (MVP)','2024-10-16 07:27:24'),(107,25,'Test and iterate the MVP','2024-10-16 07:27:24'),(108,25,'Build a scalable technology infrastructure','2024-10-16 07:27:24'),(109,25,'Create a go-to-market strategy','2024-10-16 07:27:24'),(110,25,'Secure funding or investment','2024-10-16 07:27:24'),(111,25,'Scale the business and expand','2024-10-16 07:27:24'),(112,26,'Step 1: Learn the fundamentals of software development','2024-10-16 07:27:50'),(113,26,'Step 2: Gain experience in system administration','2024-10-16 07:27:50'),(114,26,'Step 3: Learn about continuous integration and continuous deployment (CI/CD)','2024-10-16 07:27:50'),(115,26,'Step 4: Develop skills in cloud computing','2024-10-16 07:27:50'),(116,26,'Step 5: Gain experience in security practices','2024-10-16 07:27:50'),(117,26,'Step 6: Obtain relevant certifications','2024-10-16 07:27:50'),(118,28,'Identify a problem or opportunity','2024-10-16 12:15:30'),(119,28,'Develop a business plan','2024-10-16 12:15:30'),(120,28,'Build a prototype or MVP','2024-10-16 12:15:30'),(121,28,'Test and iterate','2024-10-16 12:15:30'),(122,28,'Develop a go-to-market strategy','2024-10-16 12:15:30'),(123,28,'Scale and grow','2024-10-16 12:15:30'),(124,29,'Learn UI/UX Fundamentals','2024-10-16 12:19:41'),(125,29,'Learn UX Research','2024-10-16 12:19:41'),(126,29,'Learn UI Design','2024-10-16 12:19:41'),(127,29,'Learn Frontend Frameworks','2024-10-16 12:19:41'),(128,29,'Practice UI/UX Projects','2024-10-16 12:19:41'),(129,29,'Specialize in UI/UX Tools','2024-10-16 12:19:41');
/*!40000 ALTER TABLE `steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(350) NOT NULL,
  `points` text NOT NULL,
  `valid_till` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,'Premium','[\"Unlimited access\",\"Priority support\",\"Free updates\"]',365,100),(2,'Free','[\"Basic access\",\"100 API calls/month\",\"Community support\"]',365,0),(3,'Bronze','[\"Everything in Free\",\"1,000 API calls/month\",\"Email support\"]',365,10),(4,'Gold','[\"Everything in Bronze\",\"10,000 API calls/month\",\"Priority email support\"]',365,30),(5,'Platinum','[\"Everything in Premium\",\"100,000 API calls/month\",\"Dedicated account manager\"]',365,100),(6,'Enterprise','[\"Custom solutions\",\"Unlimited API calls\",\"24/7 premium support\"]',365,151);
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_subscription`
--

DROP TABLE IF EXISTS `user_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscription_id` int NOT NULL,
  `user_id` int NOT NULL,
  `expiry_date` datetime NOT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subscription_id` (`subscription_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_subscription_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`),
  CONSTRAINT `user_subscription_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subscription`
--

LOCK TABLES `user_subscription` WRITE;
/*!40000 ALTER TABLE `user_subscription` DISABLE KEYS */;
INSERT INTO `user_subscription` VALUES (1,1,1,'2024-10-17 00:00:00','pi_3QAqwcIILuhliL1z0n7PAHts','2024-10-17 10:28:43','2024-10-17 10:28:43'),(2,1,1,'2024-10-17 00:00:00','pi_3QAqwcIILuhliL1z0n7PAHts','2024-10-17 10:29:27','2024-10-17 10:29:27'),(3,1,1,'2024-10-17 00:00:00','pi_3QAqwcIILuhliL1z0n7PAHts','2024-10-17 10:29:35','2024-10-17 10:29:35');
/*!40000 ALTER TABLE `user_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otp_expiration` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `language` varchar(50) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `summary` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'talha_71x','syedtalha71x@gmail.com','4a85820211930568b2f8d5339f91e7ed0ab09e0164d988ab94722453cc83e4e2','k8d6cw','2024-10-13 11:04:17','2024-09-26 11:30:55','English',NULL,'Karachi','Pakistan','Junior Software Engineer','Syed Talha Hussain','2004-02-28','Hi, I’m Talha Hussain. I’m a full stack developer with a comprehensive skill set in frontend, backend, and database technologies. I specialize in the MERN stack, as well as in DevOps'),(2,'areeba','areeba@gmail.com','5c39042bad02538409cbb81b408b28b79061aba8e93a563ff762e42b67341b45',NULL,NULL,'2024-10-07 11:26:35',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'alishba','alishba@gmail.com','d291259afe84b01e265c8cdaed9f477982471047d5169c863f726a925bc46a76',NULL,NULL,'2024-10-07 11:29:42',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-17 11:29:25
