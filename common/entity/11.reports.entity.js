const { BaseEntity } = require("./base")

const ReportsMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                file_id: "INTEGER NOT NULL",
                                                "FOREIGN": "KEY (file_id) REFERENCES files(id) ON DELETE CASCADE",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    ReportsMigrateEntity,
}