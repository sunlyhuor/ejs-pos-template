const { BaseEntity } = require("./base")

const OrdersMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                promo_code_id: "INTEGER",
                                                customer_name: "varchar(25)",
                                                active: "BOOLEAN DEFAULT FALSE",
                                                user_id: "INTEGER NOT NULL",
                                                discount: "NUMERIC(10,2)",
                                                " FOREIGN": "KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE SET NULL",
                                                "FOREIGN": "KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    OrdersMigrateEntity,
}