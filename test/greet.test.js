const assert = require('assert');
const GreetWithRespect = require('../greetFactory');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://bantu:s0ty@t0b@n2@localhost:5432/greeting_test';

const pool = new Pool({
  connectionString
});

describe('Greetings', function () {

  const INSERT_QUERY = " INSERT INTO greeting(greeted_name, greet_counter) VALUES ($1, $2)";

  beforeEach(async function () {
    // clean the tables before each test run
    await pool.query("delete from greeting");

  });


  it("should be able to enter  names ", async function () {

    var greetThem = GreetWithRespect(pool)
    await greetThem.insertFun("Bantu")
    await greetThem.insertFun("Chuma")
    await greetThem.insertFun("Sibo")

    const num = await greetThem.greetCounter();
    assert.equal(3, num);

  });

    it("should be able to count  greeted  names", async function () {

      var name = GreetWithRespect(pool)
      await name.insertFun("Bantu")
      await name.insertFun("Chuma")
      await name.insertFun("Sibo")
  
      const num = await name.getList();
      assert.deepEqual([
        {
          greeted_name: 'Bantu'
        },
        {
          greeted_name: 'Chuma'
        },
        {
          greeted_name: 'Sibo'
        }
      ], num);
  
    });

  it("should be able to greet any name in IsiXhosa.", async function () {

    var greetThem = GreetWithRespect(pool);
    await greetThem.greetingLanguages("IsiXhosa", "Bantu");
    const respe = await greetThem.greetingLanguages("IsiXhosa", "Bantu")
    assert.equal("Molo, Bantu", respe);

  });
  it("should be able to greet any name in English.", async function () {

    var greetThem = GreetWithRespect(pool);
    await greetThem.greetingLanguages("English", "Bantu");
    const respe = await greetThem.greetingLanguages("English", "Bantu")
    assert.equal("Hello, Bantu", respe);

  });
  it("should be able to greet any name in Afrikaans.", async function () {

    var greetThem = GreetWithRespect(pool);
    await greetThem.greetingLanguages("Afrikaans", "Bantu");
    const respe = await greetThem.greetingLanguages("Afrikaans", "Bantu")
    assert.equal("Halo, Bantu", respe);

  });


  after(function () {
    pool.end();
  })

})

