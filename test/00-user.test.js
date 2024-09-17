import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

let token;

describe("Users", () => {
  it("should register new user", (done) => {
    chai
      .request(app)
      .post("/auth/register")
      .send({
        name: "Jester", //name should be a string (changed to num)
        password: "RoyaltyNo1!",
        money: -10
      })
      .end((req, res) => {
        console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
        chai.expect(res.body.msg).to.be.equal(`User ${res.body.data.name} successfully created!`);
        done();
      });
  });

  it("should login user", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        name: "dave", //name should be a string (changed to num)
        password: "DavePassword!"
      })
      .end((req, res) => {
        console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
        chai.expect(res.body.msg).to.be.equal(`User ${res.body.data.name} successfully logged in!`);

        if (res.body.data.token) token = res.body.data.token;

        done();
      });
  });

  it("should not create user", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        name: 34, //name should be a string (changed to num)
        password: "DavePassword!",
        money: 20
      })
      .end((req, res) => {
        console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
        chai.expect(res.body.msg).to.be.equal("Argument `name`: Invalid value provided. Expected String, provided Int.");
        done();
      });
  });

  it("should create user", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        name: "Bryan",
        password: "BryanPassword!",
        money: 20
      })
      .end((req, res) => {
        console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
        chai.expect(res.body.msg).to.be.equal(`User ${res.body.data.name} successfully created!`);
        done();
      });
  });

});