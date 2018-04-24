create database china_msp;
use china_msp;	
CREATE TABLE msp_user (
  id int(12) NOT NULL auto_increment,
  username varchar(50) default NULL,
  address varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  description varchar(500) NOT NULL,
  createDateTime DATETIME   NOT NULL,
  PRIMARY KEY  (id)
);


 msp_question | CREATE TABLE `msp_question` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `question` varchar(500) NOT NULL,
  `createDateTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ;