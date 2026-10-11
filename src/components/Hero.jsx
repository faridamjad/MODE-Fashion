import heroImage from "../assets/Logo.png";

export default function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">

        <div>
          <h1 className="text-4xl font-bold">
            MODE Fashion
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Temukan baju, celana, sepatu, dan jaket
            untuk melengkapi gaya sehari-hari.
          </p>

          <a
            href="#produk"
            className="inline-block bg-black text-white px-5 py-3 rounded-md mt-6 hover:bg-gray-800"
          >
            Lihat Produk
          </a>
        </div>

        <div>
          <img
            src={heroImage}
            alt="Koleksi fashion MODE"
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}
