INSERT INTO `UserRole`
(
`user_role_name`,
`createdAt`,
`updatedAt`
)
VALUES
( "Vendor",now(),now()),
( "Buyer",now(),now())
;

INSERT INTO `User`
(
`user_name`,
`user_password`,
`user_role_id`,
`user_email_id`,
`user_addr_1`,
`user_addr_2`,
`user_addr_city`,
`user_addr_province`,
`user_addr_postal_code`,
`user_phone_no`,
`user_profile_pic`,
`createdAt`,
`updatedAt`
)
VALUES
('Walmart','abcd',1,NULL,'800 Matheson Blvd W',NULL,'Mississauga','Ontario','L5V 2N6',NULL,'https://ticker.tv/news/wp-content/uploads/2018/02/WMT-696x270.jpeg',now(),now()),
('Costco','abcd',1,NULL,'5900 Rodeo Dr',NULL,'Mississauga','Ontario','L5R 3S9',NULL,'https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg',now(),now()),
('Jane','abcd',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,now(),now()),
('Alex','abcd',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,now(),now()),
('Shopper''s Drug Mart','abcd',1,NULL,'1125 Bloor St E',NULL,'Mississauga','Ontario','L4Y 2N6',0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSKd6Ipxgi9Jqb2p54bj-zenMXjnK_XbtVsQLR3WnPO_gKqZsgGQ',now(),now()),
('LobLaws','abcd',1,NULL,'380 The East Mall',NULL,'Etobicoke','Ontario','M9B 6L5',0,'https://can-cdn.azureedge.net/logos/Loblaws.PNG',now(),now()),
('Food Basics','abcd',1,NULL,'4141 Dixie Rd',NULL,'Mississauga','Ontario','L4W 1V5',0,'http://community.mis.temple.edu/mday/files/2014/04/food-basics-logo.jpg',now(),now());



INSERT INTO `ProductCatalog`
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
('Apples','Red Apples','https://www.biggro.com/content/images/thumbs/0009245_apple_550.png','2019-10-20 00:00:00',1.0,100.0,100.0,1.0,'2019-09-26 00:00:00',NOW(),NOW()),
('Bananas','Yellow Bananas','https://5.imimg.com/data5/CI/VG/MY-59453495/yellow-banana-500x500.jpg','2019-10-20 00:00:00',1.0,100.0,100.0,1.0,'2019-09-26 00:00:00',NOW(),NOW()),
('Beef Chuck Roast','100% Natural; No artificial ingredients; No Preservatives; Minimally processed','https://images.heb.com/is/image/HEBGrocery/prd-small/h-e-b-beef-chuck-roast-bone-in-usda-select-000893606.jpg','2019-10-10 00:00:00',1.0,30.0,30.0,1.0,'2019-03-10 00:00:00',NOW(),NOW()),
('Canned Tomatoes','Diced Canned Tomatoes','https://i5.walmartimages.ca/images/Enlarge/118/040/118040.jpg','2019-12-31 00:00:00',1.0,100.0,0.0,2.0,'2019-09-26 00:00:00',NOW(),NOW()),
('Canned Tuna','Smoked Albacore Tuna','https://www.stjeans.com/wp-content/uploads/2014/05/can-smoked-tuna-100g2.jpg','2019-12-31 00:00:00',1.0,100.0,100.0,2.0,'2019-09-26 00:00:00',NOW(),NOW()),
('CHICKEN BLT SALAD, SMALL',NULL,'https://assets.shop.loblaws.ca/products_jpeg/20072865/en/20072865_lrg_1_@1x.jpg','2019-10-06 00:00:00',1.0,0.0,0.0,6,'2019-10-05 00:00:00',NOW(),NOW()),
('FREE RUN BROWN EGGS',NULL,'https://assets.shop.loblaws.ca/products_jpeg/20813628001/en/20813628001_lrg_1_@1x.jpg','2019-11-23 00:00:00',1.0,20.0,20.0,6,'2019-10-05 00:00:00',NOW(),NOW()),
('Fresh Iceberg Lettuce','Fresh Iceberg Lettuce','https://images.heb.com/is/image/HEBGrocery/prd-small/fresh-iceberg-lettuce-000319375.jpg','2019-10-12 00:00:00',1.0,25.0,25.0,1.0,'2019-03-10 00:00:00',NOW(),NOW()),
('Fresh Organic Bananas','USDA OrganicOne bunch contains approximately 5-7 bananasRipeness may vary from green to yellow color','https://images.heb.com/is/image/HEBGrocery/prd-small/fresh-bananas-sold-by-the-bunch-5-7-bananas--000377497.jpg','2019-10-15 00:00:00',1.0,100.0,100.0,1.0,'2019-03-10 00:00:00',NOW(),NOW()),
('Kirkland Signature Mixed Nuts, 1.13 kg ','Premium quality mixed nuts, Contains: cashews, almonds, pecans, Brazil nuts and macadamia nuts ;Roasted and salted','https://images.costco-static.com/ImageDelivery/imageService?profileId=12026539&itemId=771662-894&recipeName=680','2019-12-31 00:00:00',0.0,12.0,12.0,2.0,'2019-10-05 00:00:00',NOW(),NOW()),
('Kraft Smooth Peanut Butter, 2 kg','Peanut butter Smooth, rich peanut butter texture. Source of protein, niacin and magnesium. No artificial colours or flavours 2 kg','https://images.costco-static.com/ImageDelivery/imageService?profileId=12026539&itemId=71408-894&recipeName=680','2019-12-31 00:00:00',0.0,20.0,20.0,2.0,'2019-10-05 00:00:00',NOW(),NOW()),
('Nutella Spread 1 kg, 2-count','Hazelnut Spread','https://images.costco-static.com/ImageDelivery/imageService?profileId=12026539&itemId=1150701-894&recipeName=680','2019-12-31 00:00:00',0.0,15.0,15.0,2.0,'2019-10-05 00:00:00',NOW(),NOW()),
('Organics Whole Milk','Vitamin D. Grade A, pasteurized, homogenized. Produced without synthetic hormones, antibiotics, or pesticides. USDA organic. Certified organic by Quality Assurance International.','https://images.heb.com/is/image/HEBGrocery/prd-small/horizon-organic-whole-milk-000540143.jpg','2019-10-15 00:00:00',1.0,20.0,20.0,1.0,'2019-03-10 00:00:00',NOW(),NOW()),
('Rotisserie Chicken Salad Sandwich','Our H E B Meal Simple Rotisserie Chicken Salad includes white meat shredded chicken blended with a smoky dressing, Better Burger lettuce on whole wheat bread.','https://images.heb.com/is/image/HEBGrocery/prd-small/h-e-b-meal-simple-rotisserie-chicken-salad-sandwich-001436788.jpg','2019-10-05 00:00:00',1.0,5.0,5.0,1.0,'2019-03-10 00:00:00',NOW(),NOW()),
('SNACK CUP, GRAPES & CHEESE',NULL,'https://assets.shop.loblaws.ca/products_jpeg/20875291/en/20875291_lrg_1_@1x.jpg','2019-10-05 00:00:00',1.0,10.0,10.0,6,'2019-10-05 00:00:00',NOW(),NOW());


INSERT INTO `OrderHeader` 
(order_user_id
,order_supplier_id
,order_item_count
,order_status
,createdAt
,updatedAt)
VALUES 
(3,1,1,'Open',now(),now()),
(3,1,2,'Open',now(),now()),
(4,1,3,'Open',now(),now())
;

INSERT INTO `OrderDetail`
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

