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
`createdAt`,
`updatedAt`)
VALUES
("Walmart", "abcd", 1,now(), now());

INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`createdAt`,
`updatedAt`)
VALUES
("Costco", "abcd", 1,now(), now());

INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`createdAt`,
`updatedAt`)
VALUES
("Jane", "abcd",2,now(), now());


INSERT INTO `foodbank_db`.`ProductCatalog`
(
`product_name`,
`product_description`,
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
"2019-12-31",
1,
100,
100,
1,
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
VALUES (
2,
1,
1,
'Open',
now(),
now()
);

INSERT INTO `foodbank_db`.`OrderDetail`
(
	order_id,
    product_id,
    quantity,
    createdAt,
    updatedAt
)
VALUES (
	1,
    1,
    1,
    now(),
    now()
);

