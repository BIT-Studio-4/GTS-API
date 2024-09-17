import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Users", () => {
    it("should not create user", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send({
            name: 34, //name should be a string (changed to num)
            password: "DavePassword!",
            money: 20
          })
        .end((req, res) => {
          console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
          chai.expect(res.body.msg).to.be.equal("Name should be a string");
          done();
        });
    });

    it("should create user", (done) => {
        chai
          .request(app)
          .post("/api/users")
          .send({
              name: "Bryan",
              password: "BryanPassword!",
              money: 20
            })
          .end((req, res) => {
            console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
            chai.expect(res.body.msg).to.be.equal("Name should be a string");
            done();
          });
      });

      it("should not create user", (done) => {
        chai
          .request(app)
          .post("/api/users")
          .send({
              name: 34,
              password: "DavePassword!",
              money: 20
            })
          .end((req, res) => {
            console.log(res.body); // This is useful for debugging. Make sure you remove it before you commit your code
            chai.expect(res.body.msg).to.be.equal("Name should be a string");
            done();
          });
      });

});