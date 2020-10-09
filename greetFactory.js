module.exports = function GreetWithRespect(pool) {

    async function checkNames(name) {
        var check = await pool.query('SELECT greeted_name FROM greeting WHERE greeted_name=$1 ', [name]);
        return check;
    }


    async function insertFun(activeName) {
        let query = await pool.query(`INSERT INTO greeting
     (greeted_name, greet_counter)
      VALUES ($1, $2)`, [activeName, 1]);

    }

    async function countUpdate(counting) {
        var update = await pool.query('UPDATE greeting set greet_counter = greet_counter+1 WHERE greeted_name = $1', [counting]);
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
        console.log(checking.rowCount )

        if (checking.rowCount > 0) {
            await countUpdate(activeName);
        } else {
            await insertFun(activeName);
        }

        if (selectedLanguage === "English") {
            return "Hello, " + activeName;
        }
        if (selectedLanguage === "Afrikaans") {
            return "Goeie More, " + activeName;
        }
        if (selectedLanguage === "IsiXhosa") {
            return "Molo, " + activeName;
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