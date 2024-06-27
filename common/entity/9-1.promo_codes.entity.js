const { BaseEntity } = require("./base")

const Promo_codesMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                name: "VARCHAR(25) NOT NULL",
                                                code: "VARCHAR(25) NOT NULL",
                                                price: "NUMERIC(10, 2) NOT NULL",
                                                expire: "TIMESTAMP",
                                                active: "BOOLEAN DEFAULT FALSE",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    Promo_codesMigrateEntity,
}