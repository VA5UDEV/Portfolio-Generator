import React from "react";

const ModernTemplate = ({ userData }) => {
  const profileImageSrc = userData.profileImageUrl || null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        id="portfolio-container"
        className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-10 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {profileImageSrc ? (
              <img
                src={profileImageSrc}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-28 h-28 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md">
                <span className="text-lg font-medium">Photo</span>
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {userData.name}
              </h1>
              <h2 className="text-xl font-medium mt-1 opacity-90">
                {userData.role}
              </h2>
            </div>
          </div>

          <div className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed">{userData.profile}</p>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.isArray(userData.skills)
                    ? userData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    : ""}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Education
                </h3>
                <ul className="space-y-3 mt-3">
                  {Array.isArray(userData.education)
                    ? userData.education.map((edu, index) => (
                        <li key={index} className="text-gray-700">
                          • {edu}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Experience
                </h3>
                <ul className="space-y-3 mt-3">
                  {Array.isArray(userData.experience)
                    ? userData.experience.map((exp, index) => (
                        <li key={index} className="text-gray-700">
                          • {exp}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Contact
                </h3>
                <div className="space-y-2 mt-3">
                  {(userData.contact?.email || userData.email) && (
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
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
                      {userData.contact?.email || userData.email}
                    </div>
                  )}
                  {(userData.contact?.phone || userData.phone) && (
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      {userData.contact?.phone || userData.phone}
                    </div>
                  )}
                  {(userData.contact?.address || userData.address) && (
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
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
                      {userData.contact?.address || userData.address}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
