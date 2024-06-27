const { BaseEntity } = require("./base")

const Product_size_detailsMigrateEntity = Object.assign(   {},
                                            {
                                                id: "SERIAL PRIMARY KEY",
                                                product_id: "INTEGER NOT NULL",
                                                product_size_id: "INTEGER NOT NULL",
                                                image_id: "INTEGER NOT NULL",
                                                price: "NUMERIC(10, 2) NOT NULL",
                                                original_price: "NUMERIC(10, 2) NOT NULL",
                                                active: "BOOLEAN DEFAULT FALSE",
                                                " FOREIGN": "KEY (product_id) REFERENCES products(id) ON DELETE CASCADE",
                                                "FOREIGN": "KEY (product_size_id) REFERENCES product_sizes(id) ON DELETE CASCADE",
                                                "FOREIGN KEY": " (image_id) REFERENCES files(id) ON DELETE CASCADE",
                                            },
                                            BaseEntity
                                        )

module.exports = {
    Product_size_detailsMigrateEntity,
}