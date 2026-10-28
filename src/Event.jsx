import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RootLayout from "./RootLayout";

import sugraBirthday from "./assets/sugra birthday.jpg";
import eidGhadeer from "./assets/eid-e ghadeer.jpg";
import gameDay from "./assets/gamesDay.jpg";
import ahmedshahBirhtday from "./assets/syedAhmedBirhtday.jpg";
import iftarParty from "./assets/iftar party.jpg";
import motherday from "./assets/mother language day.jpg";
import syedNoorBirthday from "./assets/sainNoorbirthday.jpg";
import rajaBirhtday from "./assets/rajabirthday.jpg";
import independenceDay from "./assets/pak.jpg";
import eidmiladunnabi from "./assets/try.jpg";
import teacherday from "./assets/teacherday.jpg";
import sabtainbrithday from "./assets/sabtainbrithday.jpg";
import trip from "./assets/trip.jpg";
import sindhiday from "./assets/sindhiday.jpg";
import bonfire from "./assets/bonfire.jpg";
import poolparty from "./assets/poolparty.jpg";
import secondpoolparty from "./assets/2nd poolparty.jpg";
import pakday from "./assets/14 augest26.jpg";
import secondtrip from "./assets/trip2.jpg";

const fallbackEvents = [
  { title: "Mother Language Day", image: motherday, date: "2025-02-21" },
  { title: "Iftar Party", image: iftarParty, date: "2025-03-21" },
  { title: "Games Day", image: gameDay, date: "2025-05-24" },
  { title: "Eid e Ghadeer", image: eidGhadeer, date: "2025-06-16" },
  { title: "Independence Day", image: independenceDay, date: "2025-08-14" },
  { title: "Eid Milad un Nabi PBUH", image: eidmiladunnabi, date: "2025-09-23" },
  { title: "Teachers Day", image: teacherday, date: "2025-10-06" },
  { title: "Trip Moenjodaro and Soomro Safari Park Larkana", image: trip, date: "2025-11-08" },
  { title: "Sindhi Culture Day", image: sindhiday, date: "2025-12-08" },
  { title: "Bonfire Night", image: bonfire, date: "2026-1-11" },
  { title: "Pool Party", image: poolparty, date: "2026-5-5" },
  { title: "Second Pool Party", image: secondpoolparty, date: "2026-7-14" },
  { title: "Independence Day", image: pakday, date: "2026-8-14" },
  { title: "Khairpur Educational & Fun Tour", image: secondtrip, date: "2026-10-18" },
];

const fallbackBirthday = [
  { title: "Raja Hussain", image: rajaBirhtday, date: "2025-04-17" },
  { title: "Sir Ahmed Bukahri", image: ahmedshahBirhtday, date: "2025-05-16" },
  { title: "Sir Noor Shah", image: syedNoorBirthday, date: "2025-08-02" },
  { title: "Syed Sabtain Raza", image: sabtainbrithday, date: "2025-08-16" },
  { title: "Sugra Laar", image: sugraBirthday, date: "2025-08-29" },
];

function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        if (data.success) setEvents(data.events || []);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };

    fetchEvents();
  }, []);

  const resolveImage = (image) => {
    if (!image) return null;
    return image.startsWith('/uploads/') ? `http://localhost:5000${image}` : image;
  };

  const publicEvents = events.length ? events : fallbackEvents;
  const birthday = events.length ? events.filter((item) => item.title.toLowerCase().includes('birthday') || item.title.toLowerCase().includes('raja') || item.title.toLowerCase().includes('sugra')) : fallbackBirthday;
  return (
    <RootLayout>
      <section className="py-24 px-8 max-w-7xl mx-auto min-h-screen">
        <h1 className="lg:text-4xl text-3xl font-bold text-center lg:mb-16 mb-5 -mt-[70px] lg:-mt-[60px] text-gray-900">
          Our Events
        </h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {publicEvents.filter((item) => !item.title.toLowerCase().includes('birthday')).map((event, index) => (
            <motion.div
              key={event._id || index}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={resolveImage(event.image || event.picture)}
                alt={event.title || event.name}
                className="lg:w-full lg:h-60 object-cover"
              />
              <div className="p-6 text-center">
                <h2 className="font-semibold lg:text-2xl text-[20px] mb-2">{event.title || event.name}</h2>
                <p className="text-cyan-600 font-bold text-lg mb-6">
                  {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Birthday Section */}
        <h1 className="lg:text-4xl font-bold  text-3xl text-center lg:mb-16 mb-5 mt-[50px] text-gray-900">
          Birthdays
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {(events.length ? events.filter((item) => item.title.toLowerCase().includes('birthday') || item.title.toLowerCase().includes('raja') || item.title.toLowerCase().includes('sugra')) : fallbackBirthday).map((value, index) => (
            <motion.div
              key={value._id || index}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={resolveImage(value.image || value.picture)}
                alt={value.title || value.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 text-center">
                <h2 className="font-semibold text-2xl mb-2">{value.title || value.name}</h2>
                <p className="text-cyan-600 font-bold text-lg mb-6">
                  {new Date(value.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </RootLayout>
  );
}

export default Event;
