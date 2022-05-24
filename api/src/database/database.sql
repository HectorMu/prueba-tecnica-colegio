create database school;

use school;

create table users (
    id int primary key auto_increment,
    username varchar(100),
    email varchar(100),
    password varchar (255)
);

create table alumn(
    id int primary key auto_increment,
    name varchar(200),
    lastname varchar(200),
    gender varchar(50),
    birthday varchar(100)
);

create table professor (
    id int primary key auto_increment,
    name varchar(200),
    lastname varchar(200),
    gender varchar(50)
);

create table grade(
    id int primary key auto_increment,
    name varchar(200),
    fk_professor int,
    foreign key (fk_professor) references professor(id)
);

create table alumn_grade(
    id int primary key auto_increment,
    fk_alumn int,
    fk_grade int,
    foreign key (fk_alumn) references alumn (id),
    foreign key (fk_grade) references(grade) (id)
);




