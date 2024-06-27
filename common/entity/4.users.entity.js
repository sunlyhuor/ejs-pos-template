const { BaseEntity } = require("./base")

const UsersMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                username: "varchar(50)",
                                                role_id: "INTEGER NOT NULL",
                                                card_id: "INTEGER NOT NULL",
                                                password: "varchar(250) NOT NULL",
                                                dob: "DATE NOT NULL",
                                                profile_id: "INTEGER NOT NULL",
                                                salary: "NUMERIC(10, 2) NOT NULL",
                                                active: "BOOLEAN DEFAULT FALSE",
                                                store_id: "INTEGER NOT NULL",
                                                "FOREIGN ": "KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE",
                                                "FOREIGN KEY": "(card_id) REFERENCES files(id) ON DELETE CASCADE",
                                                " FOREIGN": "KEY (profile_id) REFERENCES files(id) ON DELETE CASCADE",
                                                "FOREIGN": "KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    UsersMigrateEntity,
}