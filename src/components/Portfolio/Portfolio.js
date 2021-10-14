import React, { useState, useEffect } from 'react';
import PortfolioForm from '../PortfolioForm/PortfolioForm';
//Importing the database endpoint as string to be used
import DATABASE from '../../utils/database';
import './Portfolio.css';

export default function Portfolio({ stocks, setStocks }) {
    const [inputVisibility, setInputVisibility] = useState(false);

    useEffect(() => {
        //GET request to the database to fetch the stock which are already in our portfolio
        const fetchData = async () => {
            try {
                const response = await fetch(`https://${DATABASE}.json`);
                const data = await response.json();

                //Validates that the database is not empty
                if (data) {
                    //If not empty modifies the data with fetched results and updates state
                    const dataModified = Object.keys(data).map((key) => ({
                        id: key,
                        ticker: data[key]['ticker'],
                        position: data[key]['position'],
                        quantity: data[key]['quantity'],
                        price: data[key]['price'],
                    }));
                    setStocks(dataModified);
                }
            } catch (error) {
                /*The option how to handle the error is totally up to you. 
                Ideally, you can send notification to the user */
                console.log(error);
            }
        };

        fetchData();
    }, [setStocks]);

    //Function that removes the stock from portfolio
    const handleRemoveStock = async (stockId) => {
        try {
            //DELETE request to the database to delete specific stock by id
            await fetch(`https://${DATABASE}/${stockId}.json`, {
                method: 'DELETE',
                'Content-Type': 'application/json',
            });

            //Updates state by removing this stock
            setStocks((stocks) => stocks.filter((s) => s.id !== stockId));
        } catch (error) {
            /*The option how to handle the error is totally up to you. 
            Ideally, you can send notification to the user */
            console.log(error);
        }
    };

    return (
        <div className='portfolio-page'>
            <div className='portfolio-main-row-wrapper'>
                <div className='portfolio-main-row'>Ticker</div>
                <div className='portfolio-main-row'>Position</div>
                <div className='portfolio-main-row'>Quantity</div>
                <div className='portfolio-main-row'>Price</div>
            </div>
            {/* For each stock in database renders a row with info */}
            {stocks.map((s) => {
                return (
                    <div className='portfolio-row-wrapper' key={s.id}>
                        <div className='portfolio-row'>{s.ticker}</div>
                        <div className='portfolio-row'>{s.position}</div>
                        <div className='portfolio-row'>{s.quantity}</div>
                        <div className='portfolio-row'>{s.price}</div>
                        <button
                            className='remove-stock-button'
                            onClick={() => handleRemoveStock(s.id)}
                        >
                            <span>-</span>
                        </button>
                    </div>
                );
            })}
            {/* Form to add new stock to the portfolio */}
            {inputVisibility ? (
                <PortfolioForm
                    setStocks={setStocks}
                    setInputVisibility={setInputVisibility}
                />
            ) : null}
            <button
                className='add-more-button'
                onClick={() => setInputVisibility(!inputVisibility)}
            >
                <span>ADD NEW STOCK</span>
            </button>
        </div>
    );
}
