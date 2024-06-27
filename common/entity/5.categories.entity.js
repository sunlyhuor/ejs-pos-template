const { BaseEntity } = require("./base")

const CategoriesMigrateEntity = Object.assign(   {},
                                            {
                                                    id: "SERIAL PRIMARY KEY",
                                                    name: "varchar(50)",
                                                    user_id: "INTEGER",
                                                    active: "BOOLEAN DEFAULT FALSE",
                                                    icon_url: "varchar(250)",
                                                    " FOREIGN": "KEY (user_id) REFERENCES users(id) ON DELETE SET NULL",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    CategoriesMigrateEntity,
}