-- V1__create_reset_token_table.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE reset_token (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT fk_reset_token_user FOREIGN KEY (user_id)
        REFERENCES "users" (id) ON DELETE CASCADE
);

-- Optional index to quickly find token
CREATE UNIQUE INDEX idx_reset_token_token ON reset_token(token);
