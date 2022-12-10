# CODE UPLOAD (BACKEND)

Code Upload is a platform where users can upload code easily from around the globe.

## Language Used

- javascript

## Framework / Packages Used

- NodeJs
- Express
- MongoDB
- dotenv
- mongoose
- body-parser

## API Reference

#### DB Schema

- By default nothing is **Required**.

```js
{
  username: String,
  password: String,
  login: String,
  codes: [
    {
      code: String,
      timestamp: String,
      language: String,
      assignment_no: String,
      q_no: String,
      q_title: String,
    },
  ],
}
```

#### Post Register/Login a user

```http
  POST /register
```

| FORM URL-Encoded | Type     | Description                 |
| :--------------- | :------- | :-------------------------- |
| `username`       | `string` | **Required**. Your Username |
| `password`       | `string` | **Required**. Your Password |

- If the given username is new to our DB. Then the server will create a new user.
- If the username is available in our DB. Then the server will check for the correct password.
- `200: Password Correct / User Created`
- `404: Password Incorrect / Error`

##### Example:

```js
const options = {
  method: "POST",
  body: new URLSearchParams({ username: "username", password: "password" }),
};

fetch("http://localhost:5000/register", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

###### Response

```json
{
  "status": 404,
  "message": "password is incorrect"
}
```

###### Response

```json
{
  "status": 200,
  "username": "username",
  "password": "password"
}
```

#### Get user's uploaded codes

```http
  GET /show-code/${username}/${password}
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your Username |
| `password` | `string` | **Required**. Your Password |

##### Example

```js
const options = { method: "GET" };

fetch("http://localhost:5000/show-code/${username}/${password}", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

###### Response

```json
{
  "_id": "6391f390a2f2244b668d16fe",
  "username": "username",
  "password": "password",
  "codes": [
    {
      "code": "public class Prog1 {\n\tpublic static void main(String[] args) {\n\t\t\n\t\t// Question 10\n\t\t\n\t\tString ruler1 = \"1\";\n\t\t\n\t\tSystem.out.println(ruler1);\n\t\t\n\t\truler1 = ruler1 + \"2\" + ruler1;\n\t\t\n\t\tSystem.out.println(ruler1);\n\t\t\n\t\truler1 = ruler1 + \"3\" + ruler1;\n\t\t\n\t\tSystem.out.println(ruler1);\n\t\t\n\t\truler1 = ruler1 + \"4\" + ruler1;\n\t\t\n\t\tSystem.out.println(ruler1);\n\t}\n\n}",
      "timestamp": "8/12/2022, 7:54:40 pm",
      "language": "java",
      "assignment_no": "1",
      "q_no": "1",
      "q_title": "test title",
      "_id": "6391f3a9a2f2244b668d1701"
    }
  ],
  "__v": 0,
  "login": "Sat Dec 10 2022 15:55:25 GMT+0000 (Coordinated Universal Time)"
}
```

#### Post Upload code

```http
  POST /upload-code
```

| FORM URL-Encoded | Type     | Description                     |
| :--------------- | :------- | :------------------------------ |
| `username`       | `string` | **Required**. Your Username     |
| `password`       | `string` | **Required**. Your Password     |
| `language`       | `string` | **Required**. Your Password     |
| `assignment_no`  | `string` | **Not Required**. Your Password |
| `q_no`           | `string` | **Not Required**. Your Password |
| `q_title`        | `string` | **Not Required**. Your Password |
| `timestamp`      | `string` | **Not Required**. Your Password |

##### Example

```js
const options = {
  method: "POST",
  body: new URLSearchParams({
    username: "anubhav12",
    password: "anubhav@143",
    timestamp: "",
  }),
};

fetch("http://localhost:5000/upload-code", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

###### Response

```json
{
  "status": 404,
  "message": "something went wrong"
}
```

###### Response

```json
{
  "status": 200,
  "message": "code uploaded successfully"
}
```

###### Response

```json
{
  "status": 404,
  "message": "user not found"
}
```

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`

## Authors

- [@SubhranshuChoudhury](https://www.github.com/subhranshuchoudhury)
