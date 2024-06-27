const { BaseEntity } = require("./base")

const StoresMigrateEntity= Object.assign( {}, {
                                                id: "SERIAL PRIMARY KEY",
                                                location: "varchar(50)",
                                                active: "BOOLEAN DEFAULT TRUE",
                                                description: "TEXT"
                                            },
                                            BaseEntity
                                        )

module.exports = {
    StoresMigrateEntity,
}