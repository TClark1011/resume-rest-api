import supertest from "supertest";
import app from "../app";

const api = supertest(app);
describe("Basic routes", () => {
	it("Returns expected output for root 'GET' route", (done) => {
		api
			.get("/")
			.expect("Content-Type", /json/)
			.expect(200)
			.expect((res) => {
				expect(res.body.tone).toEqual("positive");
			})
			.end(() => done());
	});

	it("Throws error on bad request URL", (done) => {
		api
			.get("/badurl")
			.expect("Content-Type", /json/)
			.expect(404)
			.end(() => done());
	});
});
