const { BaseEntity } = require("./base")

const FilesMigrateEntity= Object.assign( {}, {
                                                id: "SERIAL PRIMARY KEY",
                                                name: "varchar(50) NOT NULL"
                                            },
                                            BaseEntity
                                        )

module.exports = {
    FilesMigrateEntity,
}