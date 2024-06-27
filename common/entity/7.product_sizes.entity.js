const { BaseEntity } = require("./base")

const Product_sizesMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                size: "varchar(3)",
                                                user_id: "INTEGER",
                                                active: "BOOLEAN DEFAULT FALSE",
                                                "FOREIGN": "KEY (user_id) REFERENCES users(id) ON DELETE SET NULL",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    Product_sizesMigrateEntity,
}