import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';
import { IEvent } from '../../types/coreTypes';
import { STATIC_URL } from '../../config/keys';

const colorSchemes = [
    {
        color_light: "#9C4EBE",
        color_dark: "#230033",
        btn_color: "#E27856",
    },
    {
        color_light: "#FF7191",
        color_dark: "#C60E38",
        btn_color: "#005165",
    },
    {
        color_light: "#71ECFF",
        color_dark: "#0091A7",
        btn_color: "#A72F68",
    },
    {
        color_light: "#53F0E3",
        color_dark: "#009286",
        btn_color: "#344B48",
    },
    {
        color_light: "#FFA3A1",
        color_dark: "#B00400",
        btn_color: "#230033",
    }
]

const Carousel = ({ eventData } : { eventData: IEvent[] }) => {
    const [currCaroEle, setcurrCaroEle] = useState(0);
    //const caroAnim = () => { 
    //    (currCaroEle < eventData.length - 1) ? setcurrCaroEle(currCaroEle + 1) : setcurrCaroEle(0); 
    //};
    //var caroTimer = setInterval(caroAnim, 5000); // start timer
    return (
        <div className="carousel">
            <button className="caro-left-btn" 
                onClick={() => { 
                    //clearInterval(caroTimer);
                    (currCaroEle > 0) ? setcurrCaroEle(currCaroEle - 1) : setcurrCaroEle(eventData.length - 1); 
                    //setTimeout(() => { caroTimer = setInterval(caroAnim, 5000); }, 10000); // restart timer
                }}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <div className="carotrackcontainer">
                <div className="carotrack" style={{ left: `${currCaroEle*-100}%` }}>
                    {
                        eventData.map((data, index) => {
                            const colorSchemesLen = colorSchemes.length;
                            const colorScheme = colorSchemes[index%colorSchemesLen];
                            return(
                                <div className="carocard" 
                                    style={{  
                                        backgroundImage: `radial-gradient(${colorScheme.color_light}, ${colorScheme.color_dark})`,
                                        top: `0`, 
                                        left: `${index*100}%` }} key={index}>
                                    <img src={STATIC_URL + data.imagePath} style={{ order: (index%2===0) ? 2 : 0 }} alt="caroimage" />
                                    <div className="carodesc">
                                        {
                                            data.tagLines.map((line) => {
                                                return <p>{line}</p>
                                            })
                                        }
                                        <Link to={data.ctaLink} style={{
                                            border: `${colorScheme.btn_color}`,
                                            backgroundColor: `${colorScheme.btn_color}`
                                        }}>Shop Now</Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <button className="caro-right-btn" 
                onClick={() => { 
                    //clearInterval(caroTimer);
                    (currCaroEle < eventData.length - 1) ? setcurrCaroEle(currCaroEle + 1) : setcurrCaroEle(0);
                    //setTimeout(() => { caroTimer = setInterval(caroAnim, 5000); }, 10000); // restart timer
                }}>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    )
};

export default Carousel;
