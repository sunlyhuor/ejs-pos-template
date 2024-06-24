const UsersMigrateEntity={
    id: "SERIAL PRIMARY KEY",
    name: "varchar(25)",
    age: "INTEGER",
    dob: "varchar(50)",
    role_id: "INTEGER NOT NULL",
    "FOREIGN": "KEY (role_id) REFERENCES role(id) ON DELETE CASCADE"
}

module.exports = {
    UsersMigrateEntity,
}