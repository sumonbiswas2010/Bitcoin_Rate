const https = require(`https`);
const sorted_array = require("../functions/sort");

module.exports = {

  getRate : (req, res) => {

    let current_rate, lowest_rate, highest_rate, lowest_date, highest_date;
    let currency = req.params.cur
    
    if(!isNaN(parseFloat(currency)) && !isNaN(currency - 0)){
      return res.status(400).json({
        success: 0,
        message: `Sorry, your requested currency ${currency} cannot be a number`
      });
    }
    else {
      currency = currency.toLowerCase();
      currency = currency.slice(0,3)
    }
    

    //getting the current price from here

    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;

    https.get(url,(resp) => {

      let body = "";
      if(resp.statusCode != 200){
        return res.status(resp.statusCode).json({
          success: 0,
          message: `Sorry, your requested currency ${currency.toUpperCase()} is not supported or is invalid`
        });
      }

      resp.on("data", (chunk) => {
          body += chunk;
      });


      resp.on("end", () => {
          try {

            currency=currency.toUpperCase();
            let json = JSON.parse(body);
            current_rate= json.bpi[currency].rate_float;
            
            //First part is completed here. Now getting the rates for last 30 days.

            let today = new Date();
            let startday = new Date(today.getTime() - 30*24*60*60*1000);

            today = today.toISOString().slice(0,10);
            startday = startday.toISOString().slice(0,10);

            url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startday}&end=${today}&currency=${currency}`;

            https.get(url,(resp) => {
              let body = "";

              if(resp.statusCode != 200){
                return res.status(resp.statusCode).json({
                  success: 0,
                  data: "Something Invalid or Not Supported"
                });
              }

              resp.on("data", (chunk) => {
                  body += chunk;
              });

              resp.on("end", () => {
                  try {
                    let json = JSON.parse(body);
                    let rates = json.bpi;
                    let sorted =[];
                    let sortedDate =[];
                    
                    let i=0;
                    for (let key in rates) {
                      sorted.push(rates[key])
                      sortedDate.push(key);
                    }

                    const results =sorted_array(sorted, sortedDate);
                    
                    lowest_rate=results[0]
                    lowest_date = results[2]
                    highest_rate=results[1]
                    highest_date = results[3]

                    return res.status(200).json({
                      success: 1,
                      current_rate,
                      highest_rate,
                      highest_date,
                      lowest_rate,
                      lowest_date
                    });
                    
                    
                  } catch (error) {
                      return res.status(400).json({
                        success: 0,
                        message: error.message
                      });
                  };
              });

            }).on("error", (error) => {
                return res.status(400).json({
                  success: 0,
                  message: error.message
                });
            });
            
          } catch (error) {
              return res.status(400).json({
                success: 0,
                message: error.message
              });
          };
      });

    }).on("error", (error) => {
        return res.status(400).json({
          success: 0,
          message: error.message
        });
    });  
  }
};