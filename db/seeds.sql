INSERT INTO department (name)
VALUES
    ('IT'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Network Engineer', 130000, 1),
    ('Security Engineer', 120000, 1),
    ('Mechanical Engineer', 150000, 2),
    ('Software Engineer', 110000, 2),
    ('Accountant', 125000, 3),
    ('Treasurer', 105000, 3),
    ('Counsel Lead', 275000, 4),
    ('Lawyer', 250000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Johnny', 'Cuero', 1, 3),
    ('Mike', 'Thompson', 2, 1),
    ('Carlos', 'Santana', 3, 0),
    ('Marlon', 'Brandon', 4, 3),
    ('Barack', 'Obama', 5, 0),
    ('John', 'Travolta', 6, 0),
    ('Cristiano', 'Ronaldo', 7, 6),
    ('Julio', 'Iglesias', 3, 7);