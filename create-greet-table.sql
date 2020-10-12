create table greeting(
    id serial not null primary key,
    greeted_name text not null,
    greet_counter int not null);
    
-- insert into greeting(greeted_name, greet_counter)
--      values ('$1', 0);