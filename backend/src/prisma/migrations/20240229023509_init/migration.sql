-- CreateTable
CREATE TABLE `User` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mobile_no` VARCHAR(191) NOT NULL,
    `email_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '123',
    `address` VARCHAR(191) NOT NULL,
    `pan_no` VARCHAR(191) NOT NULL,
    `aadhar_no` VARCHAR(191) NOT NULL,
    `photo_path` VARCHAR(191) NOT NULL,
    `certificate_path` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `uploaded_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
