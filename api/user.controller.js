
const https = require(`https`);

module.exports = {

  getRate : (req, res) => {


    let c = req.params.c
    c=c.toLowerCase();

    let current_rate, lowest_rate, highest_rate, lowest_date, highest_date;

    let url = `https://api.coindesk.com/v1/bpi/currentprice/${c}.json`;

    https.get(url,(resp) => {
      let body = "";


      if(resp.statusCode != 200){
        return res.status(resp.statusCode).json({
          success: 0,
          message: `Sorry, your requested currency ${c.toUpperCase()} is not supported or is invalid`
        });
      }

      resp.on("data", (chunk) => {
          body += chunk;
      });


      resp.on("end", () => {
          try {
            c=c.toUpperCase();
            let json = JSON.parse(body);
            current_rate= json.bpi[c].rate_float;
            


            //2nd part

            let today = new Date();


            let startday = new Date(today.getTime() - 30*24*60*60*1000);

            today = today.toISOString().slice(0,10);
            startday = startday.toISOString().slice(0,10);


            
            url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startday}&end=${today}&currency=${c}`;


            https.get(url,(resp) => {
              let body = "";


              // if(resp.statusCode != 200){
              //   return res.json({
              //     success: 0,
              //     data: "Not Supported"
              //   });
              // }

              resp.on("data", (chunk) => {
                  body += chunk;
              });

              resp.on("end", () => {
                  try {
                    let json = JSON.parse(body);
                    let rates = json.bpi;

                    let h=-999999999, l=999999999, hk, lk;
                    for (let key in rates) {
                    let value = rates[key];
                      if(value>h) {
                        h=value;
                        hk=key;
                      }
                      if(value<l) {
                        l=value;
                        lk=key;
                      }
                    }

                    lowest_rate=l
                    lowest_date = lk
                    highest_rate=h
                    highest_date = hk

                    return res.status(200).json({
                      success: 1,
                      current_rate: current_rate,
                      highest_rate: highest_rate,
                      highest_date: highest_date,
                      lowest_rate: lowest_rate,
                      lowest_date: lowest_date
                      
                    });
                    
                    
                  } catch (error) {
                      console.error(error.message);
                  };
              });

            }).on("error", (error) => {
                console.error(error.message);
            });
            
          } catch (error) {
              console.error(error.message);
          };
      });

    }).on("error", (error) => {
        console.error(error.message);
    });

    

  }

  
};