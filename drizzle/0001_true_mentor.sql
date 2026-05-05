CREATE TABLE `care_assessments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`email` varchar(320),
	`location` varchar(128) NOT NULL,
	`careType` varchar(128) NOT NULL,
	`urgency` varchar(64),
	`additionalDetails` text,
	`preferredContactTime` varchar(64),
	`relationship` varchar(64),
	`status` enum('new','contacted','in_progress','completed','cancelled') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `care_assessments_id` PRIMARY KEY(`id`)
);
