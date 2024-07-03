-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `people` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int(11) DEFAULT 'NULL',
	`birth_date` date DEFAULT 'NULL',
	`color` varchar(255) NOT NULL,
	`gender` char(1) NOT NULL,
	`admission_date` date NOT NULL DEFAULT 'current_timestamp()',
	`document` varchar(255) DEFAULT 'NULL',
	`addiction` varchar(255) DEFAULT 'NULL',
	`education` varchar(255) DEFAULT 'NULL',
	`deficiency` varchar(255) DEFAULT 'NULL',
	`chronic_disease` varchar(255) DEFAULT 'NULL',
	`checkout_reason` varchar(255) DEFAULT 'NULL',
	`checkout_date` date DEFAULT 'NULL',
	`admission_reason` varchar(255) DEFAULT 'NULL'
);

*/