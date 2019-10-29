-- MySQL Workbench Synchronization
-- Generated: 2019-10-24 19:53
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: lab06

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `grello` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `grello`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(120) NULL DEFAULT NULL,
  `name` VARCHAR(120) NULL DEFAULT NULL,
  `password` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `grello`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `grello`.`project` (
  `id` INT(11) NOT NULL,
  `title` VARCHAR(60) NULL DEFAULT NULL,
  `created_on` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_project_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `grello`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `grello`.`board` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `position` INT(11) NULL DEFAULT NULL,
  `created_on` DATETIME NULL DEFAULT NULL,
  `project_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_board_project1_idx` (`project_id` ASC),
  INDEX `fk_board_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_board_project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `grello`.`project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_board_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `grello`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `grello`.`card` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(60) NULL DEFAULT NULL,
  `content` VARCHAR(510) NULL DEFAULT NULL,
  `position` INT(11) NULL DEFAULT NULL,
  `board_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_card_board1_idx` (`board_id` ASC),
  INDEX `fk_card_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_card_board1`
    FOREIGN KEY (`board_id`)
    REFERENCES `grello`.`board` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_card_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `grello`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `grello`.`user_has_project` (
  `user_id` INT(11) NOT NULL,
  `project_id` INT(11) NOT NULL,
  `roles_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `project_id`),
  INDEX `fk_user_has_project_project1_idx` (`project_id` ASC),
  INDEX `fk_user_has_project_user_idx` (`user_id` ASC),
  INDEX `fk_user_has_project_roles1_idx` (`roles_id` ASC),
  CONSTRAINT `fk_user_has_project_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `grello`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_project_project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `grello`.`project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_project_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `grello`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
