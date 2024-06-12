import jwt from "jsonwebtoken";

const secret = "jsdfhafnsdfgd";

const payload = {
  id: 1,
  name: "John",
};

const token = jwt.sign(payload, secret, { expiresIn: "1h" });

const res = jwt.verify(token, secret);
console.log(res);
