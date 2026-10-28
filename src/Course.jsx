import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import level0Pic from "./assets/level-0.svg";
import level1Pic from "./assets/level-1.svg";
import level2Pic from "./assets/level-2.svg";
import level3Pic from "./assets/level-3.svg";
import level4Pic from "./assets/level-4.svg";
import kids1 from "./assets/kids-1.jpg";
import kids2 from "./assets/kids-2.png";
import math from "./assets/math.svg";
import english from "./assets/english2.png";
import science from "./assets/science.svg";

import RootLayout from "./RootLayout";

const fallbackComputerCourses = [
  { name: "Level 0", picture: level0Pic, fees: 3000 },
  { name: "Level 1", picture: level1Pic, fees: 3000 },
  { name: "Level 2", picture: level2Pic, fees: 3000 },
  { name: "Level 3", picture: level3Pic, fees: 3000 },
  { name: "Level 4", picture: level4Pic, fees: 3000 },
  { name: "Level 5", picture: level2Pic, fees: 3000 },
];

const fallbackTuitionCourses = [
  { name: "English", picture: english, fees: 2000 },
  { name: "Math", picture: math, fees: 2000 },
  { name: "Science", picture: science, fees: 2000 },
];

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        if (data.success) {
          setCourses(data.courses || []);
        }
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const resolveImage = (image) => {
    if (!image) return null;
    return image.startsWith('/uploads/') ? `http://localhost:5000${image}` : image;
  };

  const computerCourses = courses.length ? courses.slice(0, 6) : fallbackComputerCourses;
  const tuitionCourses = courses.length ? courses.slice(6, 9) : fallbackTuitionCourses;

  return (
    <RootLayout>
      {/* 🧑‍💻 Computer Courses */}
      <section className="py-24 px-8 max-w-7xl mx-auto min-h-screen">
        <h1 className="lg:text-4xl font-bold text-3xl text-center mb-16 -mt-[60px] text-gray-900">
          Computer Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {computerCourses.map((course, index) => {
            const title = course.title || course.name;
            const image = resolveImage(course.image || course.picture);
            const fee = course.fee || course.fees || 0;
            const message = encodeURIComponent(
              `Hi, I want to enroll in this course:\n\n*${title}*\nCourse Fee: ${fee}/month.`
            );
            const whatsappLink = `https://wa.me/923003477736?text=${message}`;

            return (
              <motion.div
                key={course._id || index}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img
                  src={image || course.picture}
                  alt={title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6 text-center">
                  <h2 className="font-semibold text-2xl mb-2">{title}</h2>
                  <p className="text-cyan-600 font-bold text-lg mb-6">
                    {fee} /Month
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 transition"
                  >
                    Enroll Now
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 👧 Kids Tuition */}
      <section className="lg:py-16 bg-white flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center mb-10 lg:-mt-[90px] -mt-[60px] text-gray-900">
          Kids Tuition
        </h1>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-full w-[300px] lg:max-w-5xl bg-gradient-to-r from-cyan-600 to-teal-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row justify-between items-center p-6"
        >
          {/* Left Image */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center mb-6 md:mb-0"
          >
            <img
              src={kids1}
              alt="Kid Left"
              className="w-64 md:w-80 h-[200px] rounded-xl shadow-md object-cover"
            />
          </motion.div>

          {/* Center Text */}
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center px-6"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Kids Tuition
            </h1>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              Small Steps, Big Dreams.
            </h2>
            <h1 className="text-white font-bold text-lg mb-6 mt-6">
              1000 / Month
            </h1>

            <button className="bg-white text-teal-600 px-6 py-2 rounded-full shadow hover:bg-teal-100 cursor-pointer font-bold">
              <Link to="/contact">Enroll Now</Link>
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center mt-6 md:mt-0"
          >
            <img
              src={kids2}
              alt="Kid Right"
              className="w-64 md:w-80 h-[200px] rounded-xl shadow-md object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 📚 General Tuition */}
      <section className="py-24 px-8 max-w-7xl mx-auto min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-13 text-gray-900 lg:-mt-[90px] -mt-[60px]">
          General Tuition
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {tuitionCourses.map((course, index) => {
            const title = course.title || course.name;
            const image = resolveImage(course.image || course.picture);
            const fee = course.fee || course.fees || 0;
            const message = encodeURIComponent(
              `Hi, I want to enroll in this course:\n\n*${title}*\nCourse Fee: ${fee}/month.`
            );
            const whatsappLink = `https://wa.me/923003477736?text=${message}`;

            return (
              <motion.div
                key={course._id || index}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img
                  src={image || course.picture}
                  alt={title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6 text-center">
                  <h2 className="font-semibold text-2xl mb-2">{title}</h2>
                  <p className="text-cyan-600 font-bold text-lg mb-6">
                    {fee} /Month
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 transition"
                  >
                    Enroll Now
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </RootLayout>
  );
};

export default Course;
