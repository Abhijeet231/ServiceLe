import { Link } from "react-router-dom"
import { Search, Wrench, ShieldCheck, ArrowRight } from "lucide-react"

const Landing = () => {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find trusted local services
          <span className="text-amber-500"> instantly</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          ServiceLE helps you connect with reliable professionals for everyday
          services - from electricians and plumbers to cleaners and repairs.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/services"
            className="bg-amber-500 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-600 transition flex items-center gap-2"
          >
            Browse Services
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/customer/become-provider"
            className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:border-amber-500 hover:text-amber-500 transition"
          >
            Become a Provider
          </Link>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Popular Services
        </h2>

        <p className="text-gray-600 text-center mt-3">
          Book trusted professionals for your everyday needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">

          {[
            "Plumbing",
            "Electrical",
            "Cleaning",
            "AC Repair",
            "Painting",
            "Home Maintenance",
          ].map((service) => (
            <div
              key={service}
              className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition cursor-pointer"
            >
              <Wrench className="text-amber-500 mb-4" size={28} />
              <h3 className="font-semibold text-gray-900">{service}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Find verified professionals near you.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white border-y border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center text-gray-900">
            How ServiceLE Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-14 text-center">

            <div>
              <Search className="mx-auto text-amber-500 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900">
                Search Services
              </h3>
              <p className="text-gray-600 mt-2">
                Browse services and find professionals near your location.
              </p>
            </div>

            <div>
              <Wrench className="mx-auto text-amber-500 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900">
                Book a Provider
              </h3>
              <p className="text-gray-600 mt-2">
                Choose a service provider and book your job in seconds.
              </p>
            </div>

            <div>
              <ShieldCheck className="mx-auto text-amber-500 mb-4" size={40} />
              <h3 className="font-semibold text-gray-900">
                Get the Job Done
              </h3>
              <p className="text-gray-600 mt-2">
                Sit back while trusted professionals complete your work.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PROVIDER CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Are you a skilled professional?
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Join ServiceLE and connect with customers looking for your services.
          Grow your business and reach more people.
        </p>

        <Link
          to="/become-provider"
          className="inline-block mt-8 bg-amber-500 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-600 transition"
        >
          Become a Provider
        </Link>
      </section>

    </div>
  )
}

export default Landing