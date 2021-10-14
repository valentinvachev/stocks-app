import React from 'react';
import './StockNews.css';

export default function StockNews({ stockNews }) {
    //Redirects to the original source
    const handleRedirect = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className='monitor-news-wrapper'>
            <h2>Daily news for {Object.keys(stockNews)[0]}</h2>
            {Object.values(stockNews)[0].length ? (
                <div className='monitor-news'>
                    {Object.values(stockNews)[0].map((n, i) => {
                        return (
                            <div
                                className='monitor-single-news-wrapper'
                                key={`${n.id}${i}`}
                            >
                                <div className='monitor-source-wrapper'>
                                    {n.image ? (
                                        <img
                                            className='stock-news-image'
                                            src={n.image}
                                            alt={n.id}
                                        />
                                    ) : (
                                        <div className='header-logo'>$</div>
                                    )}
                                    <p>Source: {n.source}</p>
                                </div>
                                <h3>{n.summary}</h3>
                                <button
                                    className='source-redirect'
                                    onClick={() => handleRedirect(n.url)}
                                >
                                    <span>Read from source</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='monitor-news-empty'>
                    <p>No news today</p>
                </div>
            )}
        </div>
    );
}
