INSERT INTO users (email, password, role, created_at, updated_at)
VALUES (
           'admin@gmail.com',
           '$2a$10$QPx/NTp19.QNiQz/gxVWS.JBr887k050yaMyseUobXvAn4NttAgxm', -- bcrypt hash
           'ADMIN',
           now(),
           now()
       );