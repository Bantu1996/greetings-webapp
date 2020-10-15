module.exports = function routes(greetings){

   
    const getting = async function (req, res) {
        try {
          let greet = {
            count: await greetings.greetCounter(),
            //insertFun:  greetings.insertFun(activeNames)
          }
          res.render('index', {
            greet
      
          })
        } catch (error) {
          console.log(error);
        }
      }
       
      const poster =  async function (req, res) {
        try {
          var activeNames = req.body.activeName
          var lang = req.body.greetRadio
          var count = req.body.theNumber
          if (activeNames === "" && lang === undefined) {
            req.flash('error', 'Please enter name and select a language')
          }
          else if (activeNames === "") {
            req.flash('error', 'Please enter name')
          }
          else if (lang === undefined) {
            req.flash('error', 'Please select language')
          } else {
            var s = await greetings.greetingLanguages(lang, activeNames)
            var cow = await greetings.greetCounter(count)
            // greetings.insertFun(activeNames)
          }
      
          let greet = {
            name: s,
            count: await greetings.greetCounter(),
            //insertFun:  greetings.insertFun(activeNames)
          }
            ;
          res.render('index', {
            greet, greetings
      
          });
        } catch (error) {
          console.log(error);
      
        }
      }
      
      const resetBtt = async function (req, res) {
        try {
          await greetings.reset(),
            res.redirect('/')
        } catch (error) {
          console.log(error);
      
        }
      }
       
      const greeter =  async function (req, res) {
        try {
          var list = await greetings.getList();
          console.log(list);
      
          res.render('greeted', { greeted: list })
        } catch (error) {
          console.log(error);
      
        }
      
      }

      const homePage = async function (req, res) {
        res.render('index')
      }

      const namer = async function (req, res) {
        try {
          let activeName = req.params.activeName;
          var county = await greetings.nameMessage(activeName);
          for (const key in county) {
      
            var element = county[key];
      
          }
          console.log(element)
          var msg = "Awe, " + activeName + " you have been greeted " + element + " time/s" + "!"
          res.render('counter', {
            message: msg
          })
        } catch (error) {
          console.log(error);
      
        }
      }
    return{
        getting, 
        poster,
        resetBtt,
        greeter,
        homePage,
        namer

    }
}