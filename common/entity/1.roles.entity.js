const { BaseEntity } = require("./base")

const RolesMigrateEntity= Object.assign( {}, {
                                                id: "SERIAL PRIMARY KEY",
                                                name: "varchar(25)",
                                                active: "BOOLEAN DEFAULT TRUE"
                                            },
                                            BaseEntity
                                        )

module.exports = {
    RolesMigrateEntity,
}