module.exports = function GreetWithRespect(saluted) {
    const greetedNames = saluted || {};


    function setName(activeName) {
        if (activeName) {
            if (greetedNames[activeName] === undefined) {
                greetedNames[activeName] = 0;
            }
            greetedNames[activeName];
        }

    }

    function greetingLanguages(selectedLanguage, activeName) {
        setName(activeName)
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

    function regExpression(activeName) {
        var namesReg = /^[A-Za-z]+$/;
        var newInstanc = new RegExp(namesReg);
        var regexTest = newInstanc.test(activeName);
      console.log(regexTest);
      if(regexTest) { 
      var nameFixed = activeName.charAt(0).toUpperCase() + activeName.slice(1).toLowerCase();
        return nameFixed; 
      }

    }
    function greetCounter() {
        var namesList = Object.keys(greetedNames)
        return namesList.length;
    }

    // function recorder(action) {
    //     let names = [];
    //         if (action === 'activeName') {
    //             names = activeName;
    //         }

    //         greetedNames.push({
    //             names
    //         });
    //     }



    function getName() {
        return greetedNames;
    }


    return {
        setName,
        greetingLanguages,
        greetCounter,
        regExpression,
        // recorder,
        getName,

    }
}