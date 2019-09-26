DROP DATABASE IF EXISTS foodbank_db;
CREATE DATABASE foodbank_db;

USE foodbank_db;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `user_email_id` varchar(45) DEFAULT NULL,
  `user_addr_1` varchar(45) DEFAULT NULL,
  `user_addr_2` varchar(45) DEFAULT NULL,
  `user_addr_city` varchar(45) DEFAULT NULL,
  `user_add_province` varchar(45) DEFAULT NULL,
  `user_add_postal_code` varchar(45) DEFAULT NULL,
  `user_phone_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_id_idx` (`user_role_id`),
  CONSTRAINT `user_role_id` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`id`)
) ;


CREATE TABLE `product_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `product_description` varchar(200) DEFAULT NULL,
  `product_expiry_date` date NOT NULL DEFAULT '9999-12-31',
  `product_perishable` tinyint(4) NOT NULL,
  `product_original_qty` int(11) NOT NULL,
  `product_current_qty` int(11) NOT NULL DEFAULT '0',
  `supplier_id` int(11) NOT NULL,
  `product_posted_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id_idx` (`supplier_id`),
  CONSTRAINT `supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `user` (`id`)
) ;

CREATE TABLE `user_cart_header` (
  `id` int(11) NOT NULL,
  `cart_owner_id` int(11) NOT NULL,
  `cart_status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_owner_id_UNIQUE` (`cart_owner_id`),
  KEY `cart_owner_id_idx` (`cart_owner_id`),
  CONSTRAINT `cart_owner_id` FOREIGN KEY (`cart_owner_id`) REFERENCES `user` (`id`)
) ;

CREATE TABLE `user_cart_detail` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `user_cart_header` (`id`)
) ;

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_user_id` int(11) NOT NULL,
  `order_supplier_id` int(11) NOT NULL,
  `order_item_count` int(11) NOT NULL,
  `order_status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_user_id_idx` (`order_user_id`),
  CONSTRAINT `order_user_id` FOREIGN KEY (`order_user_id`) REFERENCES `user` (`id`)
) ;


CREATE TABLE `order_history_detail` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `order_history` (`id`)
) ;


