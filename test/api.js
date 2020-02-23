const chai = require("chai");
const request = require("supertest");
const app = require("../src/config/server/server").default;
const UserModel = require("../src/components/User/model").default;
const HobbyModel = require("../src/components/Hobby/model").default;
const testUser = require("./fixtures/testUser.json");
const testHobby = require("./fixtures/testHobby.json");

chai.should();

/**
 * API tests
 */
describe("API", () => {
  it("get all users", done => {
    request(app)
      .get("/v1/users")
      .set("Authorization", global.bearerToken)
      .expect(res => {
        res.status.should.equal(200);
        res.body.should.be.an("array");
      })
      .end(done);
  });

  it("create new user", done => {
    request(app)
      .post("/v1/users")
      .send(testUser)
      .set("Authorization", global.bearerToken)
      .expect(res => {
        res.status.should.equal(201);
        res.body.should.have.property("email");
      })
      .end(done);
  });

  it("get created user", done => {
    let userId;
    UserModel.findOne({ email: testUser.email }, function(err, myUser) {
      userId = myUser._id;
      request(app)
        .get(`/v1/users/${userId}`)
        .set("Authorization", global.bearerToken)
        .expect(res => {
          res.status.should.equal(200);
          res.body.should.be.an("object");
        })
        .end(done);
    });
  });

  it("create new hobby", done => {
    request(app)
      .post("/v1/hobbies")
      .send(testHobby)
      .set("Authorization", global.bearerToken)
      .expect(res => {
        res.status.should.equal(201);
        res.body.should.have.property("name");
      })
      .end(done);
  });

  it("get created hobby and append it to created user", done => {
    let hobbyId;
    HobbyModel.findOne({ name: testHobby.name }, function(err, myHobby) {
      hobbyId = myHobby._id;
      let userId;
      UserModel.findOne({ email: testUser.email }, function(err, myUser) {
        userId = myUser._id;
        request(app)
          .put(`/v1/users/${userId}`)
          .send({ hobbies: [hobbyId] })
          .set("Authorization", global.bearerToken)
          .expect(res => {
            res.status.should.equal(201);
            res.body.should.have.property("hobbies").be.an("array");
          })
          .end(done);
      });
    });
  });
});

/**
 * clear database after tests
 */
after(async () => {
  try {
    await UserModel.collection.drop();
  } catch (error) {
    console.error(
      "Something went wrong after tests, seems your database doesnt cleaned"
    );
  }
});
