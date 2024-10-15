import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaQuoteLeft } from 'react-icons/fa';

// Dummy illustration URLs
const heroImage = 'https://via.placeholder.com/600x400.png?text=School+Management+Illustration';
const featureImage1 = 'https://via.placeholder.com/400x400.png?text=Feature+1';
const featureImage2 = 'https://via.placeholder.com/400x400.png?text=Feature+2';
const featureImage3 = 'https://via.placeholder.com/400x400.png?text=Feature+3';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-indigo-200 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-indigo-700">EduSmart</div>
        <div className="space-x-6 text-indigo-600">
          <a href="#features" className="hover:text-indigo-900">Features</a>
          <a href="#testimonials" className="hover:text-indigo-900">Testimonials</a>
          <a href="#contact" className="hover:text-indigo-900">Contact</a>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Sign In</button>
          <button className="px-4 py-2 bg-transparent border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col-reverse md:flex-row justify-center items-center p-10"
      >
        <div className="space-y-6 text-center md:text-left max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800">
            Manage Your School Effortlessly
          </h1>
          <p className="text-lg text-gray-700">
            From student admissions to daily attendance, our system streamlines school operations for administrators, teachers, and students alike.
          </p>
          <div className="space-x-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700">Try for Free</button>
            <button className="px-6 py-3 bg-transparent border border-indigo-600 text-indigo-600 rounded-lg shadow-md hover:bg-indigo-600 hover:text-white">
              Learn More
            </button>
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          src={heroImage}
          alt="School management illustration"
          className="w-full md:w-1/2 h-auto object-cover"
        />
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-white text-indigo-700 p-6 rounded-lg shadow-lg"
          >
            <FaUserGraduate className="text-5xl mb-4 mx-auto text-indigo-700" />
            <h3 className="text-xl font-bold">Student Management</h3>
            <p className="mt-4">Manage student profiles, attendance, grades, and parent communications with ease.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-white text-indigo-700 p-6 rounded-lg shadow-lg"
          >
            <FaChalkboardTeacher className="text-5xl mb-4 mx-auto text-indigo-700" />
            <h3 className="text-xl font-bold">Teacher Tools</h3>
            <p className="mt-4">Simplify scheduling, grading, and lesson planning with our intuitive tools.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-white text-indigo-700 p-6 rounded-lg shadow-lg"
          >
            <FaSchool className="text-5xl mb-4 mx-auto text-indigo-700" />
            <h3 className="text-xl font-bold">School Administration</h3>
            <p className="mt-4">Automate administrative tasks, including fee collection, staff payroll, and reporting.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-16 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 text-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <FaQuoteLeft className="text-4xl text-indigo-700" />
            <p className="mt-4">
              "EduSmart has transformed the way we manage our school. It's easy to use, and our staff and students love it."
            </p>
            <h4 className="mt-6 font-bold">- Jane Doe, School Principal</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <FaQuoteLeft className="text-4xl text-indigo-700" />
            <p className="mt-4">
              "The student management features are incredibly helpful. I can now track grades and attendance with just a few clicks."
            </p>
            <h4 className="mt-6 font-bold">- John Smith, Teacher</h4>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer
        id="contact"
        className="bg-indigo-900 text-white py-12 text-center"
      >
        <h3 className="text-lg font-bold">Contact Us</h3>
        <p className="mt-2">123 Education Street, City, Country</p>
        <p className="mt-2">Email: info@edusmart.com | Phone: +123 456 789</p>
        <div className="mt-6 space-x-4">
          <a href="#" className="text-indigo-300 hover:text-indigo-500">Facebook</a>
          <a href="#" className="text-indigo-300 hover:text-indigo-500">Twitter</a>
          <a href="#" className="text-indigo-300 hover:text-indigo-500">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
