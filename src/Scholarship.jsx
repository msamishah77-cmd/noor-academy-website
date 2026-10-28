import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RootLayout from "./RootLayout";
import scholarshipImg from "./assets/noor-scholarship.jpg";
import scholarshipmazhar from "./assets/scholarshipmazhar.jpg";
import scholarshipzain from "./assets/scholarshipzain.jpg";
import scholarshipsajida from "./assets/scholarshipsajida.jpg";
import shagufta from "./assets/sagfuta.jpg";
import afsana from "./assets/amsana.jpg";

const fallbackScholarships = [
  { name: "Mazhar Ali Janweri", picture: scholarshipmazhar, date: "August 2025" },
  {
    name: " Zain Raza Banhani",
    picture:scholarshipzain ,
    date: "September 2025",
  },
  {
    
    name: "Sajida Shaikh",
    picture:scholarshipsajida ,
    date: "October 2025",
  },
   {
    name: "Shagufta Janwrei",
    picture:shagufta,
    date: "November 2025",
  },
   {

    name: "Afsana Shaikh",
    picture:afsana,
    date: "November 2025",
  },
];

function Scholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/scholarships');
        const data = await response.json();
        if (data.success) setScholarships(data.scholarships || []);
      } catch (error) {
        console.error('Failed to load scholarships:', error);
      }
    };

    fetchScholarships();
  }, []);

  const resolveImage = (image) => {
    if (!image) return null;
    return image.startsWith('/uploads/') ? `http://localhost:5000${image}` : image;
  };

  const publicScholarships = scholarships.length ? scholarships : fallbackScholarships;

  return (
    <RootLayout>
      <section className="bg-white py-20 px-6 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left text area */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
            Noor Scholarship
          </h2>
          <h3 className="text-lg text-cyan-600 font-semibold mb-4">
            A Ray of Hope in Memory of the Great Teacher, Late Syed Nooruddin Shah
          </h3>

          <p className="text-gray-600 mb-6">
            A need-based scholarship awarded monthly to a deserving and hardworking
            student. Honoring Late Syed Nooruddin Shah’s lifelong dedication to
            education, this program keeps his mission to spread knowledge alive.
          </p>

          <ul className="text-gray-700 space-y-2 mb-8">
            <li>✅ 100% Free Education</li>
            <li>📚 Books & Study Materials</li>
            <li>🖊️ Free Exam & Test Fees</li>
            <li>🎓 Special Academic Guidance</li>
          </ul>

          <button className="bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-cyan-700 transition">
            <a href="https://docs.google.com/forms/d/1eZPhbrjiylS8nPqJJOYLt-nJJ2GCpxouCNiM_ML0lUw/edit">Apply Now</a>
          </button>
        </div>

        {/* Right image area */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src={scholarshipImg}
              alt="Scholarship"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Achievements Grid Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Scholarship Achievers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {publicScholarships.map((course, index) => (
            <motion.div
              key={course._id || index}
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={resolveImage(course.image || course.picture)}
                alt={course.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 text-center">
                <h2 className="font-semibold text-2xl mb-2">{course.name}</h2>
                <p className="text-sky-400 text-lg font-bold">{course.month || course.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </RootLayout>
  );
}

export default Scholarships;
