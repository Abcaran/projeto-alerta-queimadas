import React, {useState, useEffect} from 'react';

const Noticias = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("noticias.json")
            .then(async function(response) {
                const data = await response.json();
                setNews(data);
            })
    }, []);

    return (
        <>
        <div className="sectionTitle">
            Últimas notícias sobre queimadas no Brasil
        </div>
        {news.articles && news.articles.map(info => {
            console.log(info);
            return (
                <a className="noticiaCard" href={info.url} target="_blank">
                    <div className="image" style={{
                        background: `url(${info.urlToImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center' 
                    }}></div>
                    <div className="info">
                        <div className="title">{info.title}</div>
                        <div className="description">{info.description}</div>
                        <div className="footer">
                            <div className="author">{info.author}</div>
                            <div className="date">{info.publishedAt}</div>
                        </div>
                    </div>
                </a>
            )
        })}
        </>
    )
};

export default Noticias;