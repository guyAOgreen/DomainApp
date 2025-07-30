import './LinksContent.css';

const LinksContent = () => {
    return (
        <div className="chess-links-container">
            <a href={`https://www.chess.com/member/wowthisguyisamazing`} className="chess-link" target="_blank" rel="noopener noreferrer">
                <img src={require("../../../assets/images/chesscom-icon.png")} alt="Chess.com Icon" className="chess-icon" />
                <span>WowThisGuyIsAmazing on Chess.com</span>
            </a>
            <a href={`https://lichess.org/@/guygreenInClassAtUCT`} className="chess-link" target="_blank" rel="noopener noreferrer">
                <img src={require("../../../assets/images/lichess-icon.png")} alt="Lichess Icon" className="chess-icon" />
                <span>GuyGreenInClassAtUCT on Lichess</span>
            </a>
        </div>
    );
};

export default LinksContent;
