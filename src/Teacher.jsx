import React, { useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import img1 from "./assets/sirsami.jpg";
import img2 from "./assets/sirshoaib.jpg";
import img3 from "./assets/sabtain shah.jpg";
import img4 from "./assets/areeba1.jpg";
import img5 from "./assets/sirzeeshan.jpg";
import img6 from "./assets/sirhaneef.jpg";

const fallbackTeachers = [
  { name: "Sir Muhammad Shoaib Shah", subject: "Computer Teacher", image: img2 },
  { name: "Sir Muhammad Sami Shah", subject: "Computer Teacher", image: img1 },
  { name: "Sir Syed Sabtain Raza", subject: "Computer Teacher", image: img3 },
  { name: "Sir Zeeshan", subject: "Computer Teacher", image: img5 },
  { name: "Sir Haneef", subject: "Tution Teacher", image: img6 },
  { name: "Madam Areeba ", subject: "Tution Teacher", image: img4 },
];

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        const data = await response.json();
        if (data.success) setTeachers(data.teachers || []);
      } catch (error) {
        console.error('Failed to load teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const resolveImage = (image) => {
    if (!image) return null;
    return image.startsWith('/uploads/') ? `http://localhost:5000${image}` : image;
  };

  const publicTeachers = teachers.length ? teachers : fallbackTeachers;

  return (
    <RootLayout>
      <>
        <h2 className="lg:text-4xl text-3xl font-bold mb-3 text-center text-blue-950">Our Teachers</h2>
        <section className="container mx-auto px-6 py-20 grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {publicTeachers.map((teacher, index) => (
            <div
              key={teacher._id || index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
            >
              <img
                src={resolveImage(teacher.profilePicture || teacher.photo || teacher.image)}
                alt={teacher.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="lg:text-xl font-bold text-gray-800">{teacher.name}</h3>
              <p className="text-gray-600">{teacher.designation || teacher.subject || teacher.specialization || 'Teacher'}</p>
            </div>
          ))}
        </section>
      </>
    </RootLayout>
  );
}
export default Teachers;
