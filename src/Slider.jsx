import React, { useState, useEffect } from "react";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import yasir from "./assets/yasir.jpg"
import sami from "./assets/wah.jpg"



// ✅ Testimonial Data
const testimonials = [
  {
    image: yasir,
    name: "Yasir",
    role: "Student",
    message:
      "Noor Academy helped me understand full-stack development deeply. I loved how interactive and real-world the projects were.",
  },
  {
    image: sami,
    name: "M Sami",
    role: "Python Programmer",
    message:
      "The instructors at Noor Academy are awesome! Their support and teaching style made learning Python really fun and effective.",
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Manual Controls
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const { image, name, role, message } = testimonials[index];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B5B] mb-3">
          Students Feedback
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Your Voice. Our Progress. Better Learning Together
        </p>
      </div>

      {/* ✅ Hoverable Card Container with Motion */}
      <motion.div
        className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto"
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 50 }}
      >
        {/* ✅ Image + Arrows */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={image}
              src={image}
              alt={name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="w-44 h-44 object-cover rounded-xl border-4 border-blue-500"
            />
          </AnimatePresence>

          {/* Arrows */}
          <div className="flex justify-between w-24 mt-4 text-blue-500 text-xl">
            <button onClick={prev} className="hover:text-blue-700">
              <FaArrowLeft />
            </button>
            <button onClick={next} className="hover:text-blue-700">
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* ✅ Text Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-700 text-lg italic mb-4 leading-relaxed">
                “{message}”
              </p>
              <div className="flex items-center mb-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Slider;
