/**
 * @file Automatic testing for the User controllers and routes using Mocha and Chai.
 * @author GTS
 */

import bcryptjs from "bcryptjs";
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

let token;
let userId;

// Initiates Mocha testing for 'Users'
describe("Users", () => {
  // Runs a test using Chai on a given endpoint.
  // E.g., calling '/auth/register' with the proper data provided should create a new user and respond with a correct success message.
  it("should register new user", (done) => {
    chai
      .request(app)
      .post("/auth/register")
      .send({
        name: "Jester",
        password: "RoyaltyNo1!",
        money: -10
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal(`User ${res.body.data.name} successfully created!`);
        done();
      });
  });

  it("should login user", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        name: "dave",
        password: "DavePassword!"
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal(`User ${res.body.data.name} successfully logged in!`);

        if (res.body.data.token) token = res.body.data.token;
        if (res.body.data.id) userId = res.body.data.id;

        done();
      });
  });

  it("should not create user", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .set({ "Authorization": `Bearer ${token}` }) // Sets the auth header required to make requests to the /api routes
      .send({
        name: 34, //name should be a string (changed to num)
        password: "DavePassword!",
        money: 20
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal("Name should be a string.");
        done();
      });
  });

  it("should create user", (done) => {
    let userData = {
      name: "Bryan",
      password: "BryanPassword!",
      money: 20
    };

    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(userData.password, salt);
    userData.password = hashedPassword;

    chai
      .request(app)
      .post("/api/users")
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        ...userData,
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal(`User ${res.body.data.name} successfully created!`);
        done();
      });
  });

  it("should read all users", (done) => {
    chai
      .request(app)
      .get("/api/users")
      .set({ "Authorization": `Bearer ${token}` })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should read user", (done) => {
    chai
      .request(app)
      .get(`/api/users/${userId}`)
      .set({ "Authorization": `Bearer ${token}` })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data.name).to.be.equal("dave");
        done();
      });
  });

  it("should update user", (done) => {
    chai
      .request(app)
      .put(`/api/users/${userId}`)
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        name: "hannah",
        password: "HannahNeedsNoPassword.",
        money: 2500
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data.name).to.be.equal("hannah");
        chai.expect(res.body.msg).to.be.equal(`User '${res.body.data.name}' successfully updated!`)
        done();
      });
  });

  it("should delete user", (done) => {
    chai
      .request(app)
      .delete(`/api/users/${userId}`)
      .set({ "Authorization": `Bearer ${token}` })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
  
});