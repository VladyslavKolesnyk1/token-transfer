## API Documentation

### Overview
This API provides endpoints for sending tokens and retrieving token balances. It includes routes to transfer tokens and get the balance of a specific token for a user.

### Prerequisites
- Node.js must be installed on the host system to run the application and tests.

---

### Endpoints

#### 1. Transfer Tokens

**Route:** `POST {{host}}/tokens/transfer`

**Headers:**
- `Authorization: Bearer {{private key}}`

**Request Body:**
- `tokenAddress` (string): The address of the token.
- `userAddress` (string): The address of the user initiating the transfer.
- `recipientAddress` (string): The address of the recipient.
- `amount` (number): The amount of tokens to transfer.

**Response:**
- `200 OK`
  ```json
  {
    "hash": "string"
  }

#### 2. Get Token Balance

**Route:** `GET {{host}}/tokens/balance/:tokenAddress/:userAddress`

**Headers:**
- `Authorization: Bearer {{private key}}`

**Response:**
- `200 OK`
  ```json
  {
    "balance": "string"
  }

### Usage Notes

1. **Node.js Requirement:**
    - Ensure Node.js is installed on the host system to run the application and tests.

2. **Running Tests:**
    - To run tests, execute the following command in the root directory of the application:
      ```bash
      npm test
      ```

3. **Starting the Application:**
    - To start the application, execute the following command in the root directory of the application:
      ```bash
      npm start
      ```

4. **Environment Variables:**
    - Make sure to provide the required environment variables specified in the `.env.example` file.
