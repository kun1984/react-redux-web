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


CREATE TABLE `msp_question` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `compay` varchar(100) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `question` varchar(1000) NOT NULL,
  `createDateTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_name` (`phone`)
) ;