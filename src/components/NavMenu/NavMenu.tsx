import catGif from '../../assets/gifs/cat.gif';

const NavMenu = () => (
  <>
    <img 
        src={catGif} 
        alt="Jumping Cat" 
        className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900" 
    />
  <nav className="flex gap-6 text-lg">
    <a href="/" className="hover:text-blue-400 transition">Home</a>
    <a href="/about-me" className="hover:text-blue-400 transition">About</a>
    <a href="/cv" className="hover:text-blue-400 transition">CV</a>
    <a href="/chess" className="hover:text-blue-400 transition">Chess</a>
  </nav>
  </>
);

export default NavMenu;
