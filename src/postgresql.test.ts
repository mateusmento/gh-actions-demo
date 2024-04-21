import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';

describe("PostgreSQL testcontainers demo", () => {
  let database: StartedPostgreSqlContainer;
  let dataSource: DataSource;

  const TEST_TIMEOUT = 30000;

  beforeEach(async () => {
    database = await new PostgreSqlContainer("postgres:14")
      .withDatabase("demo")
      .withUsername("demo")
      .withPassword("demo")
      .start();

    dataSource = new DataSource({
      type: "postgres",
      host: database.getHost(),
      port: database.getPort(),
      database: database.getDatabase(),
      username: database.getUsername(),
      password: database.getPassword(),
      logging: true,
      logger: 'advanced-console',
      synchronize: true,
      entities: [Issue]
    })

    await dataSource.initialize();
  }, TEST_TIMEOUT);

  afterEach(async () => {
    await dataSource.destroy();
    await database.stop();
  });

  @Entity()
  class Issue {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    title!: string;
  }

  it("should persist an issue", async () => {
    const issueRepo = dataSource.getRepository(Issue);
    const ISSUE_TITLE = "Create issue";
    const issue = await issueRepo.save({ title: ISSUE_TITLE });
    expect(issue.title).toBe(ISSUE_TITLE);
  });
});
