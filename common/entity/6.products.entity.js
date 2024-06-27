const { BaseEntity } = require("./base")

const ProductsMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                name: "varchar(50)",
                                                user_id: "INTEGER",
                                                category_id: "INTEGER",
                                                active: "BOOLEAN DEFAULT FALSE",
                                                description: "TEXT",
                                                " FOREIGN": "KEY (user_id) REFERENCES users(id) ON DELETE SET NULL",
                                                "FOREIGN": "KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    ProductsMigrateEntity,
}