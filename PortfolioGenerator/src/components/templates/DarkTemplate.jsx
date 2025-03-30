import React from "react";

const DarkTemplate = ({ userData }) => {
  const profileImageSrc = userData.profileImageUrl || null;

  return (
    <div
      id="portfolio-container"
      className="w-full max-w-4xl mx-auto p-8 text-gray-100 bg-gradient-to-bl from-gray-900 to-gray-800 rounded-lg shadow-xl border border-gray-700"
    >
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="flex justify-center md:justify-start mb-6 md:mb-0">
          {profileImageSrc ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <img
                src={profileImageSrc}
                alt="Profile"
                className="relative w-32 h-32 rounded-full object-cover border-2 border-gray-700 shadow-lg"
              />
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-1 bg-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 border-2 border-gray-700 shadow-lg">
                <span className="text-xl font-semibold">Photo</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {userData.name || "Your Name"}
          </h1>
          <h2 className="text-xl font-medium text-gray-400 mt-1">
            {userData.role || "Your Role"}
          </h2>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {[1, 2, 3].map((_, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 text-gray-300 hover:bg-purple-500 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Social link {i + 1}</span>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
        <h3 className="text-lg font-semibold text-purple-400 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          About Me
        </h3>
        <p className="mt-2 text-gray-300 leading-relaxed">
          {userData.profile ||
            "Your professional profile goes here. Write a captivating description about yourself, your passions, and expertise."}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
          <h3 className="text-lg font-semibold text-purple-400 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Skills
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.isArray(userData.skills) && userData.skills.length > 0 ? (
              userData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400 italic">No skills listed</p>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
          <h3 className="text-lg font-semibold text-purple-400 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
            Education
          </h3>
          <div className="mt-3 space-y-2">
            {Array.isArray(userData.education) &&
            userData.education.length > 0 ? (
              userData.education.map((edu, index) => (
                <div key={index} className="pl-4 border-l-2 border-purple-500">
                  <p className="text-gray-300">{edu}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No education listed</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
        <h3 className="text-lg font-semibold text-purple-400 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          Experience
        </h3>
        <div className="mt-4 space-y-4">
          {Array.isArray(userData.experience) &&
          userData.experience.length > 0 ? (
            userData.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 pb-4">
                <div className="absolute top-0 left-0 h-full w-0.5 bg-gray-700">
                  <div className="absolute top-0 -ml-1 h-3 w-3 rounded-full bg-purple-500"></div>
                </div>
                <p className="text-gray-300">{exp}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No experience listed</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
        <h3 className="text-lg font-semibold text-purple-400 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          Contact Information
        </h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-100">Email</p>
                <p className="text-sm text-gray-300">
                  {userData.contact?.email ||
                    userData.email ||
                    "your.email@example.com"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-100">Phone</p>
                <p className="text-sm text-gray-300">
                  {userData.contact?.phone ||
                    userData.phone ||
                    "(123) 456-7890"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-100">Address</p>
                <p className="text-sm text-gray-300">
                  {userData.contact?.address ||
                    userData.address ||
                    "City, State, Country"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkTemplate;
