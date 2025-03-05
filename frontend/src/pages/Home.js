import { Link } from "react-router-dom";
import nitcImage from "../assets/nitc_enhanced.png";
import achievement from "../assets/achievement.png";
import job from "../assets/job.png";
import leaderboard from "../assets/leaderboard.png";
import "../index.css";
function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}

      {/* Hero Section with Banner Image */}
      <div className="relative h-[500px]">
        <img
          src={nitcImage}
          alt="NITC Campus"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      <div className="mt-5 ml-40 mr-30 grid grid-cols-3 gap-15">
        {/* Achievements */}
        <div className=" flex flex-col items-center w-[250px] shadow-lg">
          <img
            src={achievement}
            alt="Achievements"
            className="w-full h-40 object-cover"
          />
          <div className="bg-gray-300 w-full py-4 flex justify-center">
            <Link to={"/achievements"}>
              <h3 className="text-xl font-semibold text-center">
                Achievements
              </h3>
            </Link>
          </div>
        </div>

        {/* Job Opportunities */}
        <div className="flex flex-col items-center w-[250px] shadow-lg">
          <img src={job} alt="Jobs" className="w-full h-40 object-cover" />
          <div className="bg-gray-300 w-full py-4 flex justify-center">
            <Link to={"/job-opportunities"}>
              <h3 className="text-xl font-semibold text-center">
                Job Opportunities
              </h3>
            </Link>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="flex flex-col items-center w-[250px] shadow-lg">
          <img
            src={leaderboard}
            alt="Leaderboard"
            className="w-full h-40 object-cover"
          />
          <div className="bg-gray-300 w-full py-4 flex justify-center">
            <Link to={"/leaderboard"}>
              <h3 className="text-xl font-semibold text-center">Leaderboard</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Members and Events Section */}
      <div className="container mx-auto py-12 grid grid-cols-2 gap-8">
        {/* Latest Members */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Latest Members</h3>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>

        {/* Events */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Events</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-white p-2 rounded">
                <div className="text-center">
                  <div className="text-sm">DEC</div>
                  <div className="text-xl font-bold">06</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">
                  Celebrating 25 years of language research at NIT
                </h4>
                <p className="text-sm text-gray-600">
                  National Institute of Technology calicut
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}

export default Home;
