const assert = require('assert');
 const GreetWithRespect = require('../greetFactory');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://bantu:s0ty@t0b@n2@localhost:5432/greeting_test';

const pool = new Pool({
    connectionString
});

describe('Greetings', async function(){

    const INSERT_QUERY = " INSERT INTO greeting(greeted_name, greet_counter) VALUES ($1, $2)";

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greeting;");
        
    });
    describe("enter the name of a user", async function() {
    it("should be able to greet a name", async function () {

		await pool.query(INSERT_QUERY, ["Snowy", 4]);
		await pool.query(INSERT_QUERY, ["Spotty", 7]);

		const results = await pool.query("select count(*) from greeting");
		
		// how many greeting should have been added?
		assert.equal(2, results.rows[0].count);

    });
    
    it("should be able to find all greetings made", async function () {

		await pool.query(INSERT_QUERY, ["Snowy", 4,]);
		await pool.query(INSERT_QUERY, ["Spotty", 3]);
		await pool.query(INSERT_QUERY, ["Kitty", 7]);

		const results = await pool.query("select count(*) from greeting");

		// how many greeting should be found?
		assert.equal(3, results.rows[0].count);
		
    });
    })

    describe("radio buttons", async function() {
        it ("should be able to greet any name in IsiXhosa.", async function () {
            
        })
    })
    
    after(function(){
        pool.end();
    })
});