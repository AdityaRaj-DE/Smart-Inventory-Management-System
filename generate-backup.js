import fs from "fs";
import archiver from "archiver";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const OUT = "./backup_data";
const ZIP = "backup.zip";

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

function csv(file, headers, rows) {
  const content =
    headers.join(",") +
    "\n" +
    rows
      .map((r) =>
        headers
          .map((h) => {
            let v = r[h] ?? "";
            v = String(v).replace(/,/g, " "); // avoid CSV break
            return v;
          })
          .join(",")
      )
      .join("\n");

  fs.writeFileSync(`${OUT}/${file}`, content);
}

function date() {
  return faker.date.past({ years: 2 }).toISOString();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

(async () => {

const users = [];
const categories = [];
const suppliers = [];
const customers = [];
const products = [];
const warehouses = [];
const inventory = [];
const purchaseOrders = [];
const purchaseOrderItems = [];
const salesOrders = [];
const salesOrderItems = [];

const password = await bcrypt.hash("password123",10);

const COUNT = {
  users: 10,
  categories: 20,
  suppliers: 30,
  customers: 150,
  products: 400,
  warehouses: 5,
  purchaseOrders: 600,
  salesOrders: 900
};

//////////////// USERS //////////////////

for (let i=1;i<=COUNT.users;i++){
  users.push({
    id:`u${i}`,
    email:`user${i}@test.com`,
    password,
    name:faker.person.fullName(),
    role:i===1?"ADMIN":"MANAGER",
    isActive:true,
    createdAt:date(),
    updatedAt:date()
  });
}

//////////////// CATEGORIES //////////////////

for (let i=1;i<=COUNT.categories;i++){
  categories.push({
    id:`c${i}`,
    name:`Category ${i}`,
    isActive:true,
    createdAt:date()
  });
}

//////////////// SUPPLIERS //////////////////

for (let i=1;i<=COUNT.suppliers;i++){
  suppliers.push({
    id:`s${i}`,
    name:`Supplier ${i}`,
    email:`supplier${i}@mail.com`,
    phone:`9${faker.number.int({min:100000000,max:999999999})}`,
    address:`City ${i}`,
    isActive:true,
    createdAt:date()
  });
}

//////////////// CUSTOMERS //////////////////

for (let i=1;i<=COUNT.customers;i++){
  customers.push({
    id:`cust${i}`,
    name:`Customer ${i}`,
    email:`customer${i}@mail.com`,
    phone:`8${faker.number.int({min:100000000,max:999999999})}`,
    address:`City ${i}`,
    createdAt:date()
  });
}

//////////////// WAREHOUSES //////////////////

for (let i=1;i<=COUNT.warehouses;i++){
  warehouses.push({
    id:`w${i}`,
    name:`Warehouse ${i}`,
    location:`City ${i}`,
    createdAt:date()
  });
}

//////////////// PRODUCTS //////////////////

for (let i=1;i<=COUNT.products;i++){

  const category = pick(categories);
  const supplier = pick(suppliers);

  products.push({
    id:`p${i}`,
    name:`Product ${i}`,
    description:`Product description ${i}`,
    basePrice:faker.number.int({min:100,max:80000}),
    sku:`SKU-${i}`,
    unit:"pcs",
    currency:"INR",
    categoryId:category.id,
    supplierId:supplier.id,
    isActive:true,
    createdAt:date(),
    updatedAt:date()
  });
}

//////////////// INVENTORY //////////////////

let invId=1;

for (const product of products){

  for (const warehouse of warehouses){

    inventory.push({
      id:`i${invId++}`,
      productId:product.id,
      warehouseId:warehouse.id,
      quantity:faker.number.int({min:20,max:200}),
      reservedQty:faker.number.int({min:0,max:10}),
      damagedQty:faker.number.int({min:0,max:3}),
      lowStockLevel:10,
      lastRestockedAt:date(),
      createdAt:date(),
      updatedAt:date()
    });

  }

}

//////////////// PURCHASE ORDERS //////////////////

let poi=1;

for (let i=1;i<=COUNT.purchaseOrders;i++){

  const supplier = pick(suppliers);
  const user = pick(users);

  const id=`po${i}`;

  let total=0;

  const items=faker.number.int({min:1,max:5});

  for (let j=0;j<items;j++){

    const product = pick(products);

    const qty=faker.number.int({min:10,max:100});
    const price=product.basePrice;

    purchaseOrderItems.push({
      id:`poi${poi++}`,
      orderId:id,
      productId:product.id,
      quantity:qty,
      price
    });

    total+=qty*price;
  }

  purchaseOrders.push({
    id,
    supplierId:supplier.id,
    status:"COMPLETED",
    totalAmount:total,
    currency:"INR",
    createdAt:date(),
    updatedAt:date(),
    approvedAt:date(),
    completedAt:date(),
    createdBy:user.id
  });

}

//////////////// SALES ORDERS //////////////////

let soi=1;

for (let i=1;i<=COUNT.salesOrders;i++){

  const customer = pick(customers);
  const user = pick(users);

  const id=`so${i}`;

  let total=0;

  const items=faker.number.int({min:1,max:4});

  for (let j=0;j<items;j++){

    const product = pick(products);

    const qty=faker.number.int({min:1,max:5});
    const price=product.basePrice;

    salesOrderItems.push({
      id:`soi${soi++}`,
      orderId:id,
      productId:product.id,
      quantity:qty,
      price,
      createdAt:date()
    });

    total+=qty*price;
  }

  salesOrders.push({
    id,
    customerId:customer.id,
    status:"COMPLETED",
    totalAmount:total,
    currency:"INR",
    createdAt:date(),
    updatedAt:date(),
    completedAt:date(),
    createdBy:user.id
  });

}

//////////////// WRITE CSV //////////////////

csv("users.csv",Object.keys(users[0]),users);
csv("categories.csv",Object.keys(categories[0]),categories);
csv("suppliers.csv",Object.keys(suppliers[0]),suppliers);
csv("customers.csv",Object.keys(customers[0]),customers);
csv("products.csv",Object.keys(products[0]),products);
csv("warehouses.csv",Object.keys(warehouses[0]),warehouses);
csv("inventory.csv",Object.keys(inventory[0]),inventory);
csv("purchase_orders.csv",Object.keys(purchaseOrders[0]),purchaseOrders);
csv("purchase_order_items.csv",Object.keys(purchaseOrderItems[0]),purchaseOrderItems);
csv("sales_orders.csv",Object.keys(salesOrders[0]),salesOrders);
csv("sales_order_items.csv",Object.keys(salesOrderItems[0]),salesOrderItems);

//////////////// ZIP //////////////////

const output = fs.createWriteStream(ZIP);
const archive = archiver("zip");

archive.pipe(output);

fs.readdirSync(OUT).forEach(f=>{
  archive.file(`${OUT}/${f}`,{name:f});
});

await archive.finalize();

console.log("backup.zip generated successfully");

})();