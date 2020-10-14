module.exports = function GreetWithRespect(pool) {

    async function checkNames(name) {
        var using = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        var check = await pool.query('SELECT greeted_name FROM greeting WHERE greeted_name=$1 ', [using]);
        return check;
    }


    async function insertFun(activeName) {
       
        var using = activeName.charAt(0).toUpperCase() + activeName.slice(1).toLowerCase()
        let query = await pool.query(`INSERT INTO greeting
     (greeted_name, greet_counter)
      VALUES ($1, $2)`, [using, 1]);
      return query

    }

    async function countUpdate(counting) {
        var using = counting.charAt(0).toUpperCase() + counting.slice(1).toLowerCase()
        var update = await pool.query('UPDATE greeting set greet_counter = greet_counter+1 WHERE greeted_name = $1', [using]);
        return update;
    }

    async function getList() {
        var list = await pool.query('SELECT greeted_name FROM greeting')
        return list.rows;
    }

    async function nameMessage(user) {
        var listing = await pool.query('SELECT greet_counter FROM greeting WHERE greeted_name=$1', [user]);
        // console.log(listing.rows)
        return listing.rows[0];
    }

    async function greetingLanguages(selectedLanguage, activeName) {
        var checking = await checkNames(activeName);
        var using = activeName.charAt(0).toUpperCase() + activeName.slice(1).toLowerCase()
        console.log(checking.rowCount )

        if (checking.rowCount > 0) {
            await countUpdate(using);
        } else {
            await insertFun(using);
        }

        if (selectedLanguage === "English") {
            return "Hello, " + using;
        }
        if (selectedLanguage === "Afrikaans") {
            return "Halo, " + using;
        }
        if (selectedLanguage === "IsiXhosa") {
            return "Molo, " + using;
        }

    }

    async function greetCounter() {
        var namesList = await pool.query('SELECT greet_counter FROM greeting')
        return namesList.rowCount;
    }

    async function reset() {
        var reseting = await pool.query('DELETE FROM greeting')
        return reseting
    }


    return {
        greetingLanguages,
        greetCounter,
        insertFun,
        getList,
        checkNames,
        countUpdate,
        reset,
        nameMessage

    }
}



























    // function regExpression(activeName) {
    //     var namesReg = /^[A-Za-z]+$/;
    //     var newInstanc = new RegExp(namesReg);
    //     var regexTest = newInstanc.test(activeName);
    //     console.log(regexTest);
    //     if (regexTest) {
    //         var nameFixed = activeName.charAt(0).toUpperCase() + activeName.slice(1).toLowerCase();
    //         return nameFixed;
    //     }

    // }