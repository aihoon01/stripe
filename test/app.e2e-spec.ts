import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from 'pactum';
import { userDto } from "../src/auth/dto/user.dto";

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()
    await app.listen(3000)
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3000");
  })

  afterAll (() => {
    app.close()
  })

  describe("Auth", () => {
    describe('signup', () => {
      it("should throw an error if email is empty", () => {
        const dto: userDto = {
          email: "",
          password:"19ephenPK>"
        };

        return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(400)
      });

    it("should throw an error if password is empty", () => {
      const dto = {
        password: "",
        email: "stephen.aihoon@gmail.com"
      }

      return pactum
      .spec()
      .post('/auth/signup')
      .withBody(dto)
      .expectStatus(400)
    });

    it("Should throw an error if email is not valid", () => {
      const dto = {
        email: "stephengmail.com",
        password: "29rprhdp"
      }

      return pactum
      .spec()
      .post('/auth/signup')
      .withBody(dto)
      .expectStatus(400)
      .expectBodyContains({
        "statusCode": 400,
        "message": [
            "email must be an email"
        ],
        "error": "Bad Request"
    })
    })

    it("Should successfully create a new user", () => {
      const dto = {
        email: "stephen.aihoon@gmail.com",
        password: "2939ifosidj4"
      }

      return pactum
      .spec()
      .post('/auth/signup')
      .withBody(dto)
      .expectStatus(201)
      .expectBodyContains("apiKey")
      
    })
    })

    describe("signin", () => {
      it("signs a user, creates and stores token", () => {
        const dto = {
          email: "stephen.aihoon@gmail.com",
          password: "2939ifosidj4"
        }

        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .stores('userAt', 'access_token')
        .expectStatus(201)
        .expectBodyContains("access_token")
      })
    })

  })

  describe("Routes", () => {
    describe ("access", () => {
      it("Authorizes a user with a valid token", () => {
        return pactum
        .spec()
        .get('/access')
        .withHeaders({
          Authorization: `Bearer $S{userAt}`
        })
        .expectStatus(200)
        .expectBodyContains("apiKey")
        .expectBodyContains("id")
        .expectBodyContains("email")
      })
    })
  })
})