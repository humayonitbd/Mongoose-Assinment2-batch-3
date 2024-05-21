# Product and Order Management API Website

***This project is a simple API for managing products and orders. It includes functionalities for creating, updating, and fetching products and orders, as well as inventory management.

# Main content 

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [License](#license)

### Prerequisites

- Node.js ()
- npm ()
- typescript

### Clone the Repository

git clone https://github.com/humayonitbd/Mongoose-Assinment2-batch-3


## Install Dependencies

**npm install


## Environment Variables

Create a .env file in the root of the project

MONGO_URI=mongodb://localhost:27017/your-database
PORT=3000

## Run the Application

**npm run start:dev



## API Endpoints
Products
GET /api/products: Fetch all products
POST /api/products: Create a new product


Orders
GET /api/orders: Fetch all orders
POST /api/orders: Create a new order


## Validation

Using Zod
Zod is another library used for schema validation.


## Error Handling
404 Route Not Found

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found!' });
});


## Order Not Found
To handle cases where an order is not found, you can add a check in your service layer or controller:

if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }


    This README file provides clear instructions on setting up and running the application, as well as information on the API endpoints, validation, and error handling. Adjust the content as needed based on your specific project details.

