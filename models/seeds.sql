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

INSERT INTO `foodbank_db`.`User`
(
`user_name`,
`user_password`,
`user_role_id`,
`createdAt`,
`updatedAt`)
VALUES
("Walmart", "abcd", 1,now(), now());


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
)


