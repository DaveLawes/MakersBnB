# CRC Cards

## CRC for MVP

Class: User

| R   | C        |
| ------------- | -------------    |
| create_account          |   |
| log_in         |  |
| add_property       | Property  |



Class: Property

| R  | C        |
| ------------- | -------------    |
| create_property          | |
| all          |  |


## Database Model for MVP

Table name: Users

| Column name   | Data type        |
| ------------- | -------------    |
| id            | serial primary key  |
| name          | varchar(60)          |
| email          | varchar(60)          |
| password      | varchar(60)  |


Table name: Properties

| Column name   | Data type        |
| ------------- | -------------    |
| id            | serial primary key |
| user_id         | foreign key     |
| title       | varchar(60)          |
| description    | varchar(240)          |
| price per night     | varchar(60)          |
