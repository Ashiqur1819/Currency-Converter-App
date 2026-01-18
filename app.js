import https from "https";
import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const currencyConverter = () => {
  const api = "161be482a6bbf2e83ac9a7ff";
  const url = `https://v6.exchangerate-api.com/v6/${api}/latest/USD`;

  let data = "";

  https.get(url, (response) => {
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const rates = JSON.parse(data).conversion_rates;
      rl.question("Enter the amount in USD: ", (amount) => {
        rl.question(
          "Enter the target currency (e.g., BDT, EUR. NPR): ",
          (currency) => {
            const rate = rates[currency.toUpperCase()];

            if (rate) {
              const convertCurrency = (amount * rate).toFixed(2);
              console.log(
                chalk.green(
                  `${amount} USD is aproximately ${convertCurrency} ${currency}`,
                ),
              );
            } else {
              console.log("Invalid currency code!");
            }
            rl.close();
          },
        );
      });
    });

    response.on("error", (err) => {
      console.log("ERROR: ", err.message);
    });
  });
};

currencyConverter();
