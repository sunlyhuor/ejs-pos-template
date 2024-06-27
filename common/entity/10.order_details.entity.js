const { BaseEntity } = require("./base")

const Order_detailsMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                product_size_deatil_id: "INTEGER NOT NULL",
                                                order_id: "INTEGER NOT NULL",
                                                active: "BOOLEAN DEFAULT FALSE",
                                                user_id: "INTEGER NOT NULL",
                                                price: "NUMERIC(10, 2)",
                                                original_price: "NUMERIC(10, 2)",
                                                " FOREIGN": "KEY (product_size_deatil_id) REFERENCES product_size_details(id) ON DELETE CASCADE",
                                                "FOREIGN": "KEY (user_id) REFERENCES users(id) ON DELETE CASCADE",
                                                "FOREIGN KEY": "(order_id) REFERENCES orders(id) ON DELETE CASCADE",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    Order_detailsMigrateEntity,
}