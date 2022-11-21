# Building API's with Express and Prisma

## Entities

Following are the different entities in the system:

### Users

Two types: buyers and sellers
A user can sign up as a buyer or as a seller

### Catalogs

A catalog belongs to a seller
One seller can have one catalog
A catalog consists of Products

### Products

A product has a name and a price

### Orders

An order can be created by a buyer to purchase items from a seller's catalog
An order consists of a list of products

## APIs

Following are a few examples of the API endpoints you should expose.

### Auth APIs

`POST /api/auth/register`

Register a user (accept username, password, type of user - buyer/seller)

`POST /api/auth/login`

Let a previously registered user log in (e.g. retrieve authentication token)

### APIs for buyers

`GET /api/buyer/list-of-sellers`

Get a list of all sellers

`GET /api/buyer/seller-catalog/:seller_id`

Get the catalog of a seller by seller_id

`POST /api/buyer/create-order/:seller_id`

Send a list of items to create an order for seller with id = seller_id

### APIs for sellers

`POST /api/seller/create-catalog`

Send a list of items to create a catalog for a seller

`GET /api/seller/orders`

Retrieve the list of orders received by a seller
