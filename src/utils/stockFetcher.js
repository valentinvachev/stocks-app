import { STOCK_API } from './stockAPI';
import { TOKEN } from './stockAPI';

//Function which fetches the current prices and updates our state with current prices and profit/loss
const stockFetcher = (stocks, setStocks, profitLossCalculator) => {
    stocks.forEach(async (s) => {
        try {
            const stockName = s.ticker.replace('', '');
            const response = await fetch(
                `${STOCK_API}/quote?symbol=${stockName}&token=${TOKEN}`
            );
            const data = await response.json();

            const profitLoss = profitLossCalculator(
                s.price,
                data.c,
                s.position,
                s.quantity
            );

            const stockWithPrice = {
                ...s,
                currentPrice: data.c.toFixed(2),
                profitLoss,
            };

            const indexOfStock = stocks.indexOf(s);
            setStocks((stocks) => [
                ...stocks.slice(0, indexOfStock),
                stockWithPrice,
                ...stocks.slice(indexOfStock + 1),
            ]);
        } catch (error) {
            /*The option how to handle the error is totally up to you. 
                Ideally, you can send notification to the user */
            console.log(error);
        }
    });
};

export default stockFetcher;
