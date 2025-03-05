import "../index.css";
function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-2/3 md:w-1/2 lg:w-1/3">
          <h1 className="text-2xl font-bold text-gray-800">ABOUT US</h1>
          <p className="text-gray-600 mt-3">
            Welcome to our platform! We are dedicated to connecting alumni and
            fostering meaningful relationships. An active and vibrant alumni
            forum is an asset for any Institute as well as for the Alumni
            fraternity and the students. As for our AlmaMater the Alumni body
            was 'RECCAA' - a forum confined to the institute without much
            connect with the Alumni fraternity and not able to contribute to the
            Alma mater, the way it was supposed to. Over time institutions
            transform and our alma mater also transformed from 'REC' to 'NIT'
            while the alumni forum remained as 'RECCAA' disconnected from the
            regional chapters. At the same time there existed another forum
            'World NITCAA Council' which was supposed to be the apex body of the
            alumni regional chapters, again just a concept formed by the
            regional chapters to organise the World NITCАА Meet once every two
            years. The issue was that RECCAA had the legal standing but with
            practically no connect with the regional Chapters and the World
            NITCAA Council, which did not have any legal structure but was well
            connected with the regional chapters.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
