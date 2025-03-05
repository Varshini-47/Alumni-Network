import userImage from "../assets/user.webp";
import "../index.css";
function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-11/12 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-10">
            CONTACT US
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <img
                src={userImage}
                alt="Prof. Jayant Krishna"
                class="w-32 h-32 object-cover rounded-md"
              />
              <p className="font-semibold mt-3">Prof. Jayant Krishna</p>
              <p className="text-sm">Dean Outreach</p>
              <p className="text-sm text-gray-600">
                Email:{" "}
                <a href="mailto:deanor@adm.nitc.ac.in" class="text-blue-600">
                  deanor@adm.nitc.ac.in
                </a>
              </p>
              <p className="text-sm text-gray-600">Ph. (O): 03222-282036</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={userImage}
                alt="Prof. Debashish Chakravarty"
                class="w-32 h-32 object-cover rounded-md"
              />
              <p className="font-semibold mt-3">Prof. Debashish Chakravarty</p>
              <p className="text-sm">
                Associate Dean, Alumni Affairs & Branding
              </p>
              <p className="text-sm text-gray-600">
                Email:{" "}
                <a href="mailto:adeanaa@adm.nitc.ac.in" class="text-blue-600">
                  adeanaa@adm.nitc.ac.in
                </a>
              </p>
              <p className="text-sm text-gray-600">Ph. (O): 03222-281019</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={userImage}
                alt="Mrs. Archana Biswas"
                class="w-32 h-32 object-cover rounded-md"
              />
              <p className="font-semibold mt-3">Mrs. Archana Biswas</p>
              <p className="text-sm">
                Senior Executive Officer, Alumni Affairs & International
                Relations
              </p>
              <p className="text-sm text-gray-600">
                Email:{" "}
                <a
                  href="mailto:archana.biswas@nitc.ac.in"
                  class="text-blue-600"
                >
                  archana.biswas@nitc.ac.in
                </a>
              </p>
              <p className="text-sm text-gray-600">Ph. (O): 03222-281858</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
