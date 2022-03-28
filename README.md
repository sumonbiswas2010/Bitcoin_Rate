# Bitcoin_Rate
 
This application will show the current bitcoin rate, highest and lowest for the last 30 days for any supported currencies. 
 
Example Links:
* **https://bitcoinrate.sumon.com.bd/api/getBitcoinInfo/currency=BDT** 
* **https://bitcoinrate.vercel.app/api/getBitcoinInfo/currency=usd**

* **This API returns** <br />
  * **The current Bitcoin rate, in the requested currency.** <br />
  * **The lowest Bitcoin rate in the last 30 days, in the requested currency.** <br />
  * **The highest Bitcoin rate in the last 30 days, in the requested currency.** <br />
 If the currency code provided is not supported by the API, it returns a 404 with a message.
 
* **Docker Informations** <br />
     * Dockerhub Link: https://hub.docker.com/r/sumonbiswas2010/bitcoin_rate/<br />
     * Docker Pull Command: docker pull sumonbiswas2010/bitcoin_rate:latest<br />
     * Docker Run Command: docker run -it -p 8000:5000 sumonbiswas2010/bitcoin_rate:latest  --> (App will run on localhost:8000)
----


* **URL**

  https://bitcoinrate.sumon.com.bd/api/getBitcoinInfo/currency=:currency

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `currency=[String with 3 or characters. In any case of a longer string, the API will use only the first three letters.]`

* **Data Params**

  None. As this is a GET method.

* **Success Response:**

  * **Code:** 200 OK / Successful <br />
    **Content:** 
    `{
    "success": 1,
    "current_rate": 44721.7733,
    "highest_rate": 44438.34,
    "highest_date": "2022-03-01",
    "lowest_rate": 37721.3933,
    "lowest_date": "2022-02-27"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    `{
    "success": 0,
    "message": "Sorry, your requested currency XYZ is not supported or is invalid"
    }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    `{"success":0,
    "message":"Sorry, your requested currency 123 cannot be a number"
    }`

* **Sample Call:**

  ```javascript
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://bitcoinrate.sumon.com.bd/api/getBitcoinInfo/currency=BDT", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  ```
  
* **Notes:**
* Postman Link : https://www.postman.com/sumonbiswas/workspace/sumon-s-public-workspace/collection/15584254-ef20b909-0f3f-4f85-9b67-bb877b2af6fd
