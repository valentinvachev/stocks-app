import { useState } from 'react';
import Portfolio from './components/Portfolio/Portfolio';
import PortfolioMonitor from './components/PortfolioMonitor/PortfolioMonitor';
import './App.css';

function App() {
    //State of the stocks
    const [stocks, setStocks] = useState([]);
    //State of Portfolio or PortfolioMonitor component to be shown
    const [isPortfolioReady, setIsPortfolioReady] = useState(false);

    return (
        <div className='App'>
            <header>
                <h1>Welcome to Stock Portfolio</h1>
                {/* This is the logo of our application */}
                <div className='header-logo'>$</div>
            </header>
            <div>
                 {/* If user is ready with portfolio shows PortfolioMonitor */}
                {!isPortfolioReady ? (
                    <div className='portfolio-configuration'>
                        <Portfolio stocks={stocks} setStocks={setStocks} />
                        <div className='portfolio-button-continue-wrapper'>
                            <button
                                className='portfolio-button-continue'
                                onClick={() => setIsPortfolioReady(true)}
                            >
                                <span>Continue</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='portfolio-monitor'>
                        <div className='portfolio-button-back-wrapper'>
                            <button
                                className='portfolio-button-back'
                                onClick={() => setIsPortfolioReady(false)}
                            >
                                <span>Go back to Portfolio</span>
                            </button>
                        </div>
                        <PortfolioMonitor
                            stocks={stocks}
                            setStocks={setStocks}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
