import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

describe("PostgreSQL testcontainers demo", () => {
  let database: StartedPostgreSqlContainer;

  beforeEach(async () => {
    database = await new PostgreSqlContainer("postgres:14")
      .withDatabase("demo")
      .withUsername("demo")
      .withPassword("demo")
      .start();
  });

  afterEach(async () => {
    await database.stop();
  });
});
