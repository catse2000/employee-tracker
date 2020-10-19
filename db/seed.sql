INSERT INTO department (dept_name)
VALUES 
    ('Information Technology'),
    ('Media Services'),
    ('Purchasing'),
    ('Shipping & Receiving'),
    ('Distance Learning'),
    ('Counseling'),
    ('Advising'),
    ('Admissions');


INSERT INTO emp_role (title, salary, department_id)
VALUES
    ('Technical Specialist', 60000, 1),
    ('Technical Assistant', 45000, 1),
    ('Technician', 35000, 1),
    ('Media Services Technician', 35000, 2),
    ('Media Services Specialist', 45000, 2),
    ('Purchasing Specialist', 50000, 3),
    ('Shipment Receiver', 35000, 4),
    ('Instructional Designer', 45000, 5),
    ('Help Desk Assistant', 30000, 5),
    ('Counselor', 45000, 6),
    ('Counseling Secretary', 25000, 6),
    ('Advisor', 45000, 7),
    ('Advising Secretary', 25000, 7),
    ('Admissions Specialist', 45000, 8),
    ('Admissions Technician', 35000, 8);

INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
VALUES
    ('Maureen', 'Bailey', 1, null),
    ('Tristan', 'Sanchez', 2, 1),
    ('Tayler', 'Ray', 3, 2),
    ('Marlon', 'Jimenez', 3, 2),
    ('Tiah', 'Watt', 4, 5),
    ('Meera', 'Bowden', 5, null),
    ('Tyler', 'Howe', 4, 5),
    ('Emily-Jane', 'Rivers', 6, null),
    ('Abubakr', "O'Brian", 7, null),
    ('Skye', 'Jackson', 8, null),
    ('Evelyn', 'Wicks', 9, 8),
    ('Giselle', 'Bennet', 9, 8),
    ('Emme', 'Robson', 10, null),
    ('Travis', 'Higgins', 11, 10),
    ('Marcus', 'Wickens', 12, null),
    ('Ezmae', 'Wise', 13, 12),
    ('Rhianne', 'Alexander', 14, null),
    ('Hamid', 'Glenn', 15, 14),
    ('Ashton', 'Christian', 15, 14);

