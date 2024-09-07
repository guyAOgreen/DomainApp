import './AboutMePage.css';

const AboutMePage = () => {
    return (
        <>
            <div className='title'>
                {"About me!"}
            </div>
            <div className='intro-text'>
                <div className='summary'>
                    {"TL;DR"}
                </div>
                <div className='text-box'>
                    {"My name is Guy Green and I am a fullstack software developer. I studied at UCT, where I majored in Applied Maths and Computer Science and completed my honours degree in Computer Science in 2018. In 2019, I started my first full-time job with ACI, where I worked in their in-store team. In April 2020, I moved to Oracle and have been working there ever since. I've worked within OCI, on \"Multicloud\" and on Edge Computing within Oracle."}
                </div>
            </div>
            <div className='par-text-box'>
                <p>
                    {"I really enjoy being active and outdoors. I enjoy both playing and spectating most sports. My main sports currently include Padel as well as a running! I am an ambassador for GreenPoint Virgin Active Padel. Other sports I enjoy include football, cricket, touch rugby and squash."}
                </p>
                <p>
                    {"In terms of sports I enjoy spectating, I'm an avid fan of F1 as well and have taken a liking to participating in the F1 Fantasy Game and currently aspiring to come first in South Africa. Other sports I enjoy spectating are test cricket, rugby, football, cycling and padel."}
                </p>
                <p>
                    {"I am a relatively strong chess player as well, having represented my province at junior level. I currently play for Observatory Chess Club in the Western Cape/ Cape Town League."}
                </p>
                <p>
                    {"When I'm not being active or doing any of the above, my favourite pasttimes are spending time with friends, quiz nights, go-karting as well as just relaxing in nature."}
                </p>
            </div>
            <div className='am-container'>
                <img className='am-image' src={require('../../assets/images/1.jpg')}/>
                <img className='am-image' src={require('../../assets/images/2.jpg')}/>
                <img className='am-image' src={require('../../assets/images/3.jpg')}/>
                <img className='am-image' src={require('../../assets/images/4.jpg')}/>
                <img className='am-image' src={require('../../assets/images/5.jpg')}/>
                <img className='am-image' src={require('../../assets/images/chessImage.jpg')}/>
            </div>
        </>
    );

};

export default AboutMePage;