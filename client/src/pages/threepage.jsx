import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { MeshWobbleMaterial } from "@react-three/drei";

const ThreePage = () => {
    return (
        <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {/* Navigation Bar */}
          <nav className="fixed top-0 left-0 w-full p-4 z-10 bg-transparent">
            <div className="flex justify-between items-center text-white font-bold text-lg">
              <div className="logo">School Management System</div>
              <ul className="flex space-x-8">
                <li className="hover:text-yellow-400 cursor-pointer">Home</li>
                <li className="hover:text-yellow-400 cursor-pointer">Features</li>
                <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
                <li className="hover:text-yellow-400 cursor-pointer">About</li>
              </ul>
            </div>
          </nav>
    
          {/* Hero Section */}
          <section className="h-screen w-full flex items-center justify-center text-center">
            <div className="z-10 text-white">
              <h1 className="text-6xl font-extrabold mb-4">Your 3D School Hub</h1>
              <p className="text-xl">Manage everything from students to staff in a beautiful 3D experience!</p>
              <button className="mt-8 px-6 py-3 bg-yellow-400 text-indigo-900 font-bold rounded-lg hover:bg-yellow-300">
                Get Started
              </button>
            </div>
          </section>
    
          {/* 3D Background */}
          <Canvas className="absolute top-0 left-0 w-full h-full z-0">
            {/* Adding 3D effects */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enableZoom={false} />
            <mesh position={[0, 0, 0]}>
              <icosahedronGeometry attach="geometry" args={[1, 0]} />
              <MeshWobbleMaterial
                attach="material"
                color="#f3f3f3"
                speed={1} // Animation speed
                factor={0.6} // Wobble intensity
              />
            </mesh>
          </Canvas>
    
          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Amazing Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg hover:scale-105 transform transition">
                  <h3 className="text-2xl font-bold mb-4">Attendance Tracking</h3>
                  <p>Track student attendance with precision using our intuitive system.</p>
                </div>
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg hover:scale-105 transform transition">
                  <h3 className="text-2xl font-bold mb-4">Performance Reports</h3>
                  <p>Generate comprehensive reports for students and staff in real-time.</p>
                </div>
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg hover:scale-105 transform transition">
                  <h3 className="text-2xl font-bold mb-4">Messaging</h3>
                  <p>Communicate with staff, students, and parents through a unified platform.</p>
                </div>
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg hover:scale-105 transform transition">
                  <h3 className="text-2xl font-bold mb-4">Grade Management</h3>
                  <p>Assign, review, and manage grades with an easy-to-use grading system.</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="w-full bg-indigo-900 text-white py-6 text-center">
            <p>&copy; {new Date().getFullYear()} School Management System. All Rights Reserved.</p>
          </footer>
        </div>
      );
};

export default ThreePage;
