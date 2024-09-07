import './HomePage.css';

const HomePage = () => {
  return (
    <div className='container'>
      <img className='image' src={require('../../assets/images/image1.jpg')}/>
      <img className='image' src={require('../../assets/images/image2.jpeg')}/>
      <img 
        className='image' 
        src={require('../../assets/images/image3.jpeg')}
      />
    </div>
  );
}

export default HomePage;