# quotes-service-node-express

A simple Node.js Express CRUD API for Quotes.

## Getting started

This project uses SQLite as a database. Ensure to have it installed and set up the database.

### Install Dependencies

```
npm install
```

### To run App

```
npm start
```

#### API Documentation

You can view a full documentation (OpenAPI Standard) (TODO)

The API supports the following requests:

- Create quote

  - Method: POST
  - URL: /api/quotes
  - Parameters:
    - quote: Quote in question (ex: 'Live life') (required)
    - author: Person who the quote belongs to (ex: 'Morgan Freeman') (required)
  - Responses:
    - 201: Quote created successfully
  - cURL example (localhost):
    ```cURL
    curl -H "Content-Type: application/json" --request POST http://localhost:3000/api/quotes -data '{"quote": "Some really cool quote", "author": "An Author"}'
    ```

- Get a list of all the quotes

  - Method: GET
  - URL: /api/quotes
  - Responses:
    - 200: Get all quotes successfully
  - cURL example (localhost):
    ```cURL
    curl --request GET http://localhost:3000/api/quotes
    ```

- Read details of a quote

  - Method: GET
  - URL: /api/quotes?id={id}
  - {id}: The id of the quote in question
  - Responses:
    - 200: Got quote successfully
    - 404: Quote does not exist
  - cURL example (localhost):
    ```cURL
    curl --request GET http://localhost:3000/api/quotes?id=1
    ```

- Update details of a quote

  - Method: PUT
  - URL: /api/quotes?id={id}
  - {id}: The id of the quote in question
  - Parameters:
    - quote: Quote in question (ex: 'Live life') (required if author_name not given)
    - author: Person who the quote belongs to (ex: 'Morgan Freeman') (required if quote not given)
  - Responses:
    - 200: Quote updated successfully
      - quote: holding details of the quote now updated
    - 404: Quote does not exist
  - cURL example (localhost):
    ```cURL
    curl -H "Content-Type: application/json" --request PUT http://localhost:3000/api/quotes?id=1 -data '{"quote": "Actually this is the quote", "author": "An Author"}'
    ```

- Delete a quote
  - Method: DELETE
  - URL: /api/quotes?id={id}
  - {id}: The id of the quote in question
  - Responses:
    - 200: Quote deleted successfully
    - 404: Quote does not exist
  - cURL example (localhost):
    ```cURL
    curl --request DELETE http://localhost:3000/api/quotes?id=1
    ```
