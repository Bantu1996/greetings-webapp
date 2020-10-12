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
        await pool.query("delete from greeting");
        
    });
    describe("Names entered", async function() {
    it("should be able to enter a name once and greet it more than once", async function () {

		await pool.query(INSERT_QUERY, ["Snowy", 4]);
	

		const results = await pool.query("select count(*) from greeting");
		
		// how many greeting should have been added?
		assert.equal(1, results.rows[0].count);

    });
    it("should be able to count  greeted  names", async function () {

		await pool.query(INSERT_QUERY, ["Snowy", 4]);
        await pool.query(INSERT_QUERY, ["Spotty", 3]);

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

                let greetThem = GreetWithRespect(pool);  
               
      
                await greetThem.greetingLanguages("IsiXhosa", "Bantu");
              const respe = await greetThem.greetingLanguages("IsiXhosa", "Bantu")
                assert.equal("Molo, Bantu", respe);
          
              });
              it ("should be able to greet any name in English.", async function () {
      
                let greetThem = GreetWithRespect(pool);  
               
      
                await greetThem.greetingLanguages("English", "Bantu");
              const respe = await greetThem.greetingLanguages("English", "Bantu")
                assert.equal("Hello, Bantu", respe);
          
              });
              it ("should be able to greet any name in Afrikaans.", async function () {
      
                let greetThem = GreetWithRespect(pool);  
               
      
                await greetThem.greetingLanguages("Afrikaans", "Bantu");
              const respe = await greetThem.greetingLanguages("Afrikaans", "Bantu")
                assert.equal("Halo, Bantu", respe);
          
              }); 
        })
    

        describe("Counter", async function() {
            it("should be able to count a greeted  name", async function () {
        
                await pool.query(INSERT_QUERY, ["Snowy", 4]);
            
        
                const results = await pool.query("select count(*) from greeting");
                
                // how many greeting should have been added?
                assert.equal(1, results.rows[0].count);
        
            });
            it("should be able to count  greeted  names", async function () {
        
                await pool.query(INSERT_QUERY, ["Snowy", 4]);
                await pool.query(INSERT_QUERY, ["Spotty", 3]);
        
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
    
    after(function(){
        pool.end();
    })
});