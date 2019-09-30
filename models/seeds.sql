INSERT INTO `foodbank_db`.`UserRole`
(
`user_role_name`,
`createdAt`,
`updatedAt`)
VALUES
( "Vendor",
now(),
now()
);

INSERT INTO `foodbank_db`.`UserRole`
(
`user_role_name`,
`createdAt`,
`updatedAt`)
VALUES
( "Buyer",
now(),
now()
);



INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`user_addr_1`,
`user_addr_city`,
`user_addr_province`,
`user_addr_postal_code`,
`createdAt`,
`updatedAt`)
VALUES
("Walmart",
 "abcd", 
 1,
 "800 Matheson Blvd W",
 "Mississauga",
"Ontario",
"L5V 2N6",
 now(), 
 now());

INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`user_addr_1`,
`user_addr_city`,
`user_addr_province`,
`user_addr_postal_code`,
`createdAt`,
`updatedAt`)
VALUES
("Costco", 
"abcd", 
1,
"5900 Rodeo Dr",
"Mississauga",
"Ontario",
"L5R 3S9",
now(), 
now());

INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`createdAt`,
`updatedAt`)
VALUES
("Jane", "abcd",2,now(), now());

INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`createdAt`,
`updatedAt`)
VALUES
("Alex", "abcd",2,now(), now());


INSERT INTO `foodbank_db`.`ProductCatalog`
(
`product_name`,
`product_description`,
`product_img`,
`product_expiry_date`,
`product_perishable`,
`product_original_qty`,
`product_current_qty`,
`supplier_id`,
`product_posted_date`,
`createdAt`,
`updatedAt`)
VALUES
(
"Bananas",
"Yellow Bananas",
"https://5.imimg.com/data5/CI/VG/MY-59453495/yellow-banana-500x500.jpg",
"2019-12-31",
1,
100,
100,
1,
"2019-09-26",
now(),
now()
);

INSERT INTO `foodbank_db`.`ProductCatalog`
(
`product_name`,
`product_description`,
`product_img`,
`product_expiry_date`,
`product_perishable`,
`product_original_qty`,
`product_current_qty`,
`supplier_id`,
`product_posted_date`,
`createdAt`,
`updatedAt`)
VALUES
(
"Apples",
"Red Apples",
"https://www.biggro.com/content/images/thumbs/0009245_apple_550.png",
"2019-12-31",
1,
100,
100,
1,
"2019-09-26",
now(),
now()
);

INSERT INTO `foodbank_db`.`ProductCatalog`
(
`product_name`,
`product_description`,
`product_img`,
`product_expiry_date`,
`product_perishable`,
`product_original_qty`,
`product_current_qty`,
`supplier_id`,
`product_posted_date`,
`createdAt`,
`updatedAt`)
VALUES
(
"Canned Tomatoes",
"Diced Canned Tomatoes",
"https://i5.walmartimages.ca/images/Enlarge/118/040/118040.jpg",
"2019-12-31",
1,
100,
100,
2,
"2019-09-26",
now(),
now()
);

INSERT INTO `foodbank_db`.`ProductCatalog`
(
`product_name`,
`product_description`,
`product_img`,
`product_expiry_date`,
`product_perishable`,
`product_original_qty`,
`product_current_qty`,
`supplier_id`,
`product_posted_date`,
`createdAt`,
`updatedAt`)
VALUES
(
"Canned Tuna",
"Smoked Albacore Tuna",
"https://www.stjeans.com/wp-content/uploads/2014/05/can-smoked-tuna-100g2.jpg",
"2019-12-31",
1,
100,
100,
2,
"2019-09-26",
now(),
now()
);



INSERT INTO `foodbank_db`.`OrderHeader` 
(order_user_id
,order_supplier_id
,order_item_count
,order_status
,createdAt
,updatedAt)
VALUES 
(3,1,1,'Open',now(),now()),
(3,1,2,'Open',now(),now()),
(4,1,3,'Open',now(),now());;
;

INSERT INTO `foodbank_db`.`OrderDetail`
(
	order_id,
    product_id,
    quantity,
    createdAt,
    updatedAt
)
VALUES 
(1,1,1,now(),now()),
(2,1,3,now(), now()),
(2,2,3,now(), now()),
(3,1,3,now(), now()),
(3,2,3,now(), now()),
(3,3,3,now(), now())
;

