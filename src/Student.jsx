import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sabttainposition from "./assets/sabtainposition.jpg";
import siddiquePosition from "./assets/1stpositonsiddique.jpg";
import samiposition from "./assets/samiposition.jpg";
import jaleeposition from "./assets/jaleelposition.jpg";
import waheedposition from "./assets/1stpositionwaheed.jpg";
import rajaposition from "./assets/1stpositionraja.jpg";
import samipositioneat from "./assets/1stpositionsami.jpg";
import zamanshahposition from "./assets/1stpositionzamanshah.jpg";
import johnposition from "./assets/1stpositionjonh.jpg";
import parveenposition from "./assets/areeba.jpg";
import emaanposition from "./assets/emaan.jpg";
import sadiq from "./assets/sadiq.jfif";
import balqees from "./assets/balqees.jfif";
import RootLayout from "./RootLayout";

const fallbackStudents = [
  { position: "1st Positon in Grammar", name: "M Siddique Brohi", picture: siddiquePosition, date: "24 May 2025" },
  {
    position: "1st Position in Web Quiz",
    picture:sabttainposition ,
    name:"Syed Sabtain Raza",
    date: "24 May 2025"
  },
  {
    position: "1st Position in Web Project",
    picture:samiposition ,
    name:"M Sami Shah",
    date:"24 May 2025"
  },
  {
    position: "1st Positon in Typing",
    picture: jaleeposition,
    name:"Jaleel Ahmed",
    date: "24 May 2025"
  },
  {
    position: "1st Position in MS Word",
    picture: waheedposition,
    name:"Waheed Arijo",
    date: "22 May 2025" ,
  },
  {
    position: "1st Position in Make a Book",
    picture:rajaposition ,
    name:"Raja Hussain",
    date: "24 May 2025"
  },
   {
    position: "1st Position in Eat it all Game",
    picture:samipositioneat ,
    name:"M Sami Shah",
    date: "24 May 2025"
  },
  {
    position: "1st Position in Lodu Game",
    picture:zamanshahposition ,
    name:"Syed Zaman Shah",
    date: "24 May 2025"
  },
   {
    position: "1st Position in Chicken Invader Game",
    picture:johnposition ,
    name:"John Abbas Janweri",
    date: "24 May 2025"
  },
   {
    position: "1st Position in Writing",
    picture:parveenposition ,
    name:"Parveen",
    date: "23 Sep 2025"
  },
    {
    position: "1st Position in Drawing",
    picture:emaanposition ,
    name:"Ayatul Emaan ",
    date: "4 Oct 2025"
  }, {
    position: "1st Position in MS Word",
    picture:sadiq ,
    name:"Sadiq Abbasi  ",
    date: "22 Oct 2025"
  },
  {
    position: "1st Position in Math",
    picture:balqees ,
    name:"Baleeq Arijo ",
    date: "22 Oct 2025"
  },
  
];


function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        if (data.success) setStudents(data.students || []);
      } catch (error) {
        console.error('Failed to load students:', error);
      }
    };

    fetchStudents();
  }, []);

  const resolveImage = (image) => {
    if (!image) return null;
    return image.startsWith('/uploads/') ? `http://localhost:5000${image}` : image;
  };

  const publicStudents = students.length ? students : fallbackStudents;

  return (
  <RootLayout>
     <section className="py-24 px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className=" lg:text-4xl font-bold  text-3xl text-center lg:mb-16 mb-7 lg:-mt-[60px] -mt-[70px] text-blue-950">
        Top Students
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {publicStudents.map((student, index) => (
          <motion.div
            key={student._id || index}
            whileInView={{ opacity: 1, }}
            transition={{ duration: 0.6,}}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <img
              src={resolveImage(student.profilePicture || student.photo || student.picture)}
              alt={`Student ${student.name || student.title}`}
              className="w-full h-60 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="font-semibold lg:text-2xl text-[20px] mb-2">{student.position || student.batch || 'Student'}</h2>
              <p className="text-cyan-600 font-bold lg:text-[20px] mb-6">
                {student.name}
              </p>
              <p className="text-cyan-600 font-bold lg:text-lg mb-6 -mt-[20px]">
                {student.date || student.admissionDate || ''}
              </p>
             
            </div>
            
          </motion.div>
          
        ))}
      </div>
    </section>
  </RootLayout>
  );
}

export default Student;
