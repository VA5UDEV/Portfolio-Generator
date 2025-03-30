import React from "react";
import { Footer } from "@/components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <>
      <div className="min-h-[95vh] pt-26 flex flex-col items-center justify-center bg-white p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left section with text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Build Your <span className="text-blue-600">Professional</span>{" "}
              Portfolio Today
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Showcase your projects, skills, and experience with our intuitive
              portfolio generator. Stand out to potential employers and clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {authStatus ? (
                <Link to="/dashboard">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 w-full sm:w-auto">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 w-full sm:w-auto">
                      Log In
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg border border-blue-600 shadow-lg transition duration-300 w-full sm:w-auto">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 text-gray-500">
              <p>Trusted by professionals from companies like:</p>
              <div className="flex justify-center md:justify-start gap-8 mt-4 opacity-70">
                <div>Company 1</div>
                <div>Company 2</div>
                <div>Company 3</div>
              </div>
            </div>
          </div>

          {/* Right section with image or illustration */}
          <div className="md:w-1/2">
            <div className="bg-blue-100 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="text-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 8.5H8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 12H8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15.5H8"
                  />
                </svg>
                <p className="text-lg font-medium">Portfolio Preview</p>
                <p className="text-sm">
                  (Replace with actual portfolio preview image)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials or Features */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Our Portfolio Generator?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition duration-300">
              <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fast & Easy</h3>
              <p className="text-gray-600 text-sm">
                Build a complete portfolio in just minutes
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition duration-300">
              <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Professional Designs</h3>
              <p className="text-gray-600 text-sm">
                Choose from multiple professional templates
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition duration-300">
              <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fully Customizable</h3>
              <p className="text-gray-600 text-sm">
                Personalize every aspect of your portfolio
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition duration-300">
              <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Mobile Responsive</h3>
              <p className="text-gray-600 text-sm">
                Looks great on all devices and screen sizes
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
