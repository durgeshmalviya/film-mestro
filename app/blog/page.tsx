  "use client";

  import Navbar from "@/app/components/Nav";
  import Footer from "@/app/components/Footer";
  import ContactForm from "@/app/components/Footer";

  interface City {
    name: string;
    description: string;
    image: string;
  }

  const preWeddingCities: City[] = [
    {
      name: "Udaipur – The City of Lakes",
      description:
        "Udaipur offers a dreamy lakeside setting with its majestic Lake Palace and the intricate architecture of the City Palace, making it a popular choice for couples seeking a romantic backdrop.",
      image: "https://weddingphotographybysf.com/wp-content/uploads/2024/10/Pre-Wedding-Shoot-Locations-In-Udaipur-Ambrai-Ghat.webp",
    },
    {
      name: "Jaipur – The Pink City",
      description:
        "Known for its vibrant culture and stunning architecture, Jaipur provides a blend of royal heritage and contemporary charm. Iconic locations like Amer Fort and Jal Mahal add to its appeal.",
      image: "https://i.ibb.co/FbPpM5Gw/Untitled-design-100.jpg",
    },
    {
      name: "Goa – Beaches and Forts",
      description:
        "Goa's serene beaches and historical forts, such as Chapora Fort, offer a perfect blend of natural beauty and architectural grandeur for a pre-wedding shoot.",
      image: "https://i.ibb.co/Ld3T1WxF/DSC02197-1536x1024.jpg",
    },
    {
      name: "Agra – The Taj Mahal",
      description:
        "Home to the iconic Taj Mahal, Agra provides a timeless and romantic setting for couples looking to capture their love story against this world-renowned monument.",
      image: "https://i.ibb.co/0VYyWGJy/andbeyond-jehangir-mahal.jpg",
    },
    {
      name: "Kerala – Backwaters and Beaches",
      description:
        "Kerala's tranquil backwaters, lush greenery, and pristine beaches offer a serene and picturesque backdrop for a pre-wedding shoot.",
      image: "https://i.ibb.co/vvTZtXkr/34468456.jpg",
    },
    {
      name: "Jaisalmer – The Golden City",
      description:
        "With its golden sandstone architecture and vast desert landscapes, Jaisalmer provides a unique and exotic setting for couples seeking a distinctive pre-wedding shoot location.",
      image: "https://i.ibb.co/psmnLY3/book-pre-wedding-shoot-in-jaisalmer-with-trotters-tours.jpg",
    },
    {
      name: "Shimla – The Queen of Hills",
      description:
        "Shimla's colonial architecture, lush greenery, and pleasant weather make it an ideal location for couples looking to capture their love amidst the hills.",
      image: "https://i.ibb.co/Ck8zZwm/AD-4n-Xe8-M30-Ritdj-Wrga-Om-Iwa-A-MLRIc8l-Z-FO-p8j-G8g-Ey-Lzh2-Ddl-Dq8dw-FTN-Mac-VXOPUSZe-JXz-Y57-TZ.png",
    },
    {
      name: "Rishikesh – Spiritual Serenity",
      description:
        "Rishikesh offers a blend of natural beauty and spiritual serenity, with its scenic landscapes and tranquil atmosphere providing a peaceful setting for a pre-wedding shoot.",
      image: "https://i.ibb.co/ZzVFZfM2/Neergarh-Waterfall-1536x864.jpg",
    },
    {
      name: "Mumbai – Urban Elegance",
      description:
        "Mumbai's blend of modern architecture and historical landmarks offers a dynamic and vibrant backdrop for couples looking to capture their love in the heart of the city.",
      image: "https://i.ibb.co/whC7gZWQ/welcome-img.jpg",
    },
  ];

  export default function PreWeddingCitiesPage() {
    return (
      <>
        <Navbar />
         
        <section className="px-6 py-1 min-h-screen mt-10 bg-black text-white">
          
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-10">
              Best Cities Shoots in India
            </h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {preWeddingCities.map((city, index) => (
                <div
                  key={index}
                  className="bg-[#111] rounded-xl shadow hover:shadow-lg overflow-hidden transition"
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-48 object-cover  hover:grayscale-0 transition duration-300"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
                    <p className="text-gray-300">{city.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> 
        <Footer />
      </>
    );
  }
