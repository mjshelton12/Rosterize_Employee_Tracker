INSERT INTO department (department)
VALUES  ("Sales"),
        ("Marketing"),
        ("Operations Management"),
        ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Manager", 100000, 1),
        ("Sales Associate", 50000, 1),
        ("Head of Marketing", 150000, 2),
        ("Operations Manager", 75000, 3),
        ("Secretary", 45000, 3),
        ("Product Manager", 150000, 4),
        ("Engineer", 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Monica", "Geller-Bing", 1, null),
        ("Ross", "Geller", 2, 1),
        ("Rachael", "Green", 3, null),
        ("Gunther", "Smith", 4, null),
        ("Joey", "Tribbiani", 5, 4),
        ("Chandler", "Bing", 6, null),
        ("Phoebe", "Buffay", 7, 6);