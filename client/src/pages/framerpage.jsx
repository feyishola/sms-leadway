import { motion } from 'framer-motion';
import { useEffect } from 'react';

const starsEffect = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'transparent',
  overflow: 'hidden',
};

const generateStars = () => {
  const starElements = [];
  for (let i = 0; i < 100; i++) {
    const starStyle = {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      width: `${Math.random() * 3}px`,
      height: `${Math.random() * 3}px`,
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'absolute',
      animation: `move-stars ${Math.random() * 10 + 3}s linear infinite`,
    };
    starElements.push(<div style={starStyle} key={i} />);
  }
  return starElements;
};

const FramerPage = () => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes move-stars {
        from { transform: translateY(0); }
        to { transform: translateY(-100vh); }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-purple-800 via-blue-500 to-indigo-600 overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-between items-center p-6 bg-transparent text-white absolute top-0 w-full z-10"
      >
        <div className="text-3xl font-bold">Logo</div>
        <div className="space-x-8">
          <a href="#" className="hover:text-yellow-300">Home</a>
          <a href="#" className="hover:text-yellow-300">About</a>
          <a href="#" className="hover:text-yellow-300">Services</a>
          <a href="#" className="hover:text-yellow-300">Contact</a>
        </div>
      </motion.nav>

      {/* Background Stars */}
      <div style={starsEffect}>
        {generateStars()}
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col justify-center items-center min-h-screen text-white text-center space-y-8"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-transparent bg-clip-text">
          Welcome to the Galaxy!
        </h1>
        <p className="text-xl">
          Explore the beauty of animated stars and smooth transitions.
        </p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#ffbb33', color: '#000' }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-white text-indigo-700 rounded-lg shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen p-10 flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-white"
      >
        <h2 className="text-4xl mb-6 font-bold">About Us</h2>
        <p className="text-lg max-w-2xl text-center">
          We are passionate about creating beautiful and interactive web experiences.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen p-10 flex flex-col justify-center items-center bg-gradient-to-r from-red-400 to-yellow-500 text-white"
      >
        <h2 className="text-4xl mb-6 font-bold">Our Services</h2>
        <p className="text-lg max-w-2xl text-center">
          We offer cutting-edge web development services to make your project stand out.
        </p>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen p-10 flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white"
      >
        <h2 className="text-4xl mb-6 font-bold">Get in Touch</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 w-full rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 w-full rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="px-4 py-2 w-full rounded-lg"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-yellow-400 text-indigo-700 rounded-lg shadow-lg"
          >
            Submit
          </motion.button>
        </form>
      </motion.section>
    </div>
  );
};

export default FramerPage;
