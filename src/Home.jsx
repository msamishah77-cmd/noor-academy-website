import RootLayout from "./RootLayout";
import { motion } from "framer-motion";
import Slider from "./Slider";
import level0Pic from "./assets/level-0.svg"
import level1Pic from "./assets/level-1.svg"
import level2Pic from "./assets/level-2.svg"
import level3Pic from "./assets/level-3.svg"
import level4Pic from "./assets/level-4.svg"
import { Link } from "react-router-dom";


const coursesData = [
  {
  name: "Level 0",
  picture: level0Pic,
  fees:500,

},
  {
  name: "Level 1",
  picture: level1Pic,
  fees:300,
},
  {
  name: "Level 2",
  picture: level2Pic,
  fees:300,
},


]

function Home() {
  return (
    <RootLayout>
      <>
        {/* Hero Section */}
       <section className="relative text-white text-center pt-32 pb-24 overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-400"></div>

  {/* Content */}
  <div className="relative z-10 px-6 sm:px-8 md:px-16">
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
      Welcome to Noor Academy
    </h2>
    <p className="text-base sm:text-lg max-w-3xl mx-auto mb-8 opacity-90">
      Where Knowledge Meets Technology – Learn from expert teachers, build skills, and grow.
    </p>
    <button className="bg-white text-sky-500 px-8 sm:px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-800 transition">
      <Link to="contact">Enroll Now </Link>      
    </button>
  </div>
</section>

        {/* Courses Section */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <h3 className="text-3xl xl:4xl font-bold text-center mb-14 text-blue-950">
            💻 Our Plan For You
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {coursesData.map((item, index) => (
              <motion.div
                key={index}
               
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img
                  src={item.picture}
                  alt={`Course ${item.name}`}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="font-semibold text-xl mb-2">{item.name}</h4>
                  <p className="text-cyan-600 font-bold text-lg mb-4">{item.fees} /month</p>
                  <button className="bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 transition">
                   <Link to="/course">View More</Link>                   </button>
                </div>
                
              </motion.div>
              
            ))}
          </div>
         <div className="flex justify-center mt-12">
  <button className="bg-blue-950 text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-800 transition">
    <Link to="/course">View all</Link>
  </button>
</div>

        </section>

        {/* Trust Section */}
        <section className="bg-gradient-to-r from-cyan-50 to-white py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "📖", title: "Expert Teachers", desc: "Learn from the best" },
              { icon: "💻", title: "Latest Courses", desc: "Emerging Tech & Innovation" },
              { icon: "⭐", title: "Quality Environment", desc: "Empowering Minds in a Culture of Excellence." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h4 className="text-3xl mb-3">{item.icon}</h4>
                <h4 className="text-xl font-bold mb-2 text-gray-900">
                  {item.title}
                </h4>
                <p className="opacity-80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
<Slider/>
      </>
      
    </RootLayout>
  );
}

export default Home;
