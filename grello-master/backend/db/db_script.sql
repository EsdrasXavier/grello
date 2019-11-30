-- MySQL Workbench Synchronization
-- Generated: 2019-11-08 19:40
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: lab06

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `grello`.`project` 
DROP FOREIGN KEY `fk_project_user1`;

ALTER TABLE `grello`.`board` 
DROP FOREIGN KEY `fk_board_project1`,
DROP FOREIGN KEY `fk_board_user1`;

ALTER TABLE `grello`.`card` 
DROP FOREIGN KEY `fk_card_board1`,
DROP FOREIGN KEY `fk_card_user1`;

ALTER TABLE `grello`.`user_has_project` 
DROP FOREIGN KEY `fk_user_has_project_project1`,
DROP FOREIGN KEY `fk_user_has_project_roles1`,
DROP FOREIGN KEY `fk_user_has_project_user`;

ALTER TABLE `grello`.`user` 
DROP COLUMN `id`,
CHANGE COLUMN `email` `email` VARCHAR(120) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`email`);
;

ALTER TABLE `grello`.`project` 
DROP COLUMN `user_id`,
ADD COLUMN `user_email` VARCHAR(120) NOT NULL AFTER `created_on`,
DROP INDEX `fk_project_user1_idx` ,
ADD INDEX `fk_project_user1_idx` (`user_email` ASC) VISIBLE;
;

ALTER TABLE `grello`.`board` 
DROP COLUMN `user_id`,
ADD COLUMN `user_email` VARCHAR(120) NOT NULL AFTER `project_id`,
DROP INDEX `fk_board_user1_idx` ,
ADD INDEX `fk_board_user1_idx` (`user_email` ASC) VISIBLE;
;

ALTER TABLE `grello`.`card` 
DROP COLUMN `user_id`,
ADD COLUMN `user_email` VARCHAR(120) NOT NULL AFTER `board_id`,
DROP INDEX `fk_card_user1_idx` ,
ADD INDEX `fk_card_user1_idx` (`user_email` ASC) VISIBLE;
;

ALTER TABLE `grello`.`user_has_project` 
DROP COLUMN `user_id`,
ADD COLUMN `user_email` VARCHAR(120) NOT NULL FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`user_email`, `project_id`),
ADD INDEX `fk_user_has_project_user1_idx` (`user_email` ASC) VISIBLE,
DROP INDEX `fk_user_has_project_user_idx` ;
;

ALTER TABLE `grello`.`project` 
ADD CONSTRAINT `fk_project_user1`
  FOREIGN KEY (`user_email`)
  REFERENCES `grello`.`user` (`email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `grello`.`board` 
ADD CONSTRAINT `fk_board_project1`
  FOREIGN KEY (`project_id`)
  REFERENCES `grello`.`project` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_board_user1`
  FOREIGN KEY (`user_email`)
  REFERENCES `grello`.`user` (`email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `grello`.`card` 
ADD CONSTRAINT `fk_card_board1`
  FOREIGN KEY (`board_id`)
  REFERENCES `grello`.`board` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_card_user1`
  FOREIGN KEY (`user_email`)
  REFERENCES `grello`.`user` (`email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `grello`.`user_has_project` 
ADD CONSTRAINT `fk_user_has_project_project1`
  FOREIGN KEY (`project_id`)
  REFERENCES `grello`.`project` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_user_has_project_roles1`
  FOREIGN KEY (`roles_id`)
  REFERENCES `grello`.`roles` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_user_has_project_user1`
  FOREIGN KEY (`user_email`)
  REFERENCES `grello`.`user` (`email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
