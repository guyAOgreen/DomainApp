import './HomePage.css';

const HomePage = () => {
  return (
    <div className='container'>
      <img className='image1' src={require('../../assets/images/image1.jpg')}/>
      <img className='image2' src={require('../../assets/images/image2.jpeg')}/>
      <img 
        className='image3' 
        src={require('../../assets/images/image3.jpeg')}
      />
    </div>
  );
}

export default HomePage;