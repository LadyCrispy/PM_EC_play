## Run project:

To install project dependencies run command: 
    
    npm i
    
To run project execute command: 

    npm start

## Models:
    -Base:
        for shared methods as find, create, createMany, update, delete string to Mongo object id
    -Carts:
        items [], user, currency
    -Orders:
        items [], customer, paymentId, pGateway, card: , amount, currency
    -Products:
        name, price, currency
    -Users:
        name, surname, username, email, password
        overwrites create method for register with hashed pwd and returns token

## Controllers:
    -Base:
        for shared methods as find, create, updateById, deleteById. Returns response and status
    -Cart:
        overwrites create method and retrieves products info before cart creation.
        It has the buy method, to pay your cart items, delete cart and create an order with transaction info
    -Products
    -Users:
        Implements login method to check passwords and get token

## Modules:
    -JWT:
        generates token for given user with 60 days expiration time
    -Auth:
        checks if the user is allowed to make the request decoding the given token and revising expiration info
    -Payment:
        base class to implement payments providing payment name (ex. 'stripe'), client secret for payment platform, and method for make charges and reimburses.
        Expl.:
            Stripe can implement stripe.charges.pay() while PayPal uses paypal.transfer.pay()
        *p-gw-1 and pgw-2 are simulation of npm modules
        *pGW1 and pGW2 are possible payment gateways

## Routes:

    /carts
        Get '/':
            !token required
            get your own cart

        Post '/create':
            !token required
            set your own cart

            body: {
                "items": [
                    {
                        "product": "productId",
                        "quantity": "2",
                        "currency": "eur"
                    },
                    {
                        "product": "productId",
                        "quantity": "1",
                        "currency": "eur"
                    }
                ]
            }

        Post '/buy':
            !token required
            buy your own cart items
            body: {
                "cartId": "cartId",
                "paymentMethod": {
                    "type": "p-gateway-?", 
                    "card": "1234 1234 4321 4321"
                }
            }

    /products
        Get '/':
            get products list

        Post '/create':
            !token required
            create one or more products

            body: {
                "name": "deportivas",
                "price": 28,
                "currency": "eur"
            }

        Put '/updateById':
            !token required
            update product by _id

            body: {
                "_id": "productId",
                "updateInfo": {
                    "price": 20, 
                }
            }

        Put '/deleteById':
            !token required
            delete product by _id

            body: {
                "_id": "productId",
            }

    /users
        Post '/register':
            register an user

            body: {
                "name": "",
                "surname": "",
                "username": "",
                "email": "@gmail.com",
                "password": ""
            }
        
        Post '/login':
            login to retrieve token

            body: {
                "username": "",
                "password": ""
            }


