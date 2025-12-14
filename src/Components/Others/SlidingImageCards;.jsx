import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../useInView"; // Adjust the import path as necessary


const imageCards = [
  { id: 1, image: "/image-1137.webp", title: "Success Story 1" },
  { id: 2, image: "/image-1137-2.webp", title: "Success Story 2" },
  { id: 3, image: "/istockphoto_1055440762.webp", title: "Success Story 3" },
  { id: 4, image: "/istockphoto_2173063218-1.webp", title: "Success Story 4" },
  { id: 5, image: "/image-1137.webp", title: "Success Story 5" },
  { id: 6, image: "/image-1137-2.webp", title: "Success Story 6" },
  { id: 7, image: "/istockphoto_1055440762.webp", title: "Success Story 7" },
  { id: 8, image: "/istockphoto_2173063218-1.webp", title: "Success Story 8" },
];

const SlidingImageCards = () => {
  // const scrollRef = useRef();
  const [ref, isInView] = useInView({ threshold: 0.2 });


  return (
    <div className="bg-gray-900 py-12 px-4 w-full overflow-visible  ">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl mb-4 text-center font-bold">
        Success Stories
      </h1>
      <p className="text-center text-white text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Discover how we’ve helped clients achieve remarkable results.
      </p>

      <motion.div
        // ref={scrollRef}
        ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex overflow-x-auto no-scrollbar px-2"
        whileTap={{ cursor: "grabbing" }}
      >
        {imageCards.map((card) => (
          <motion.div
            key={card.id}
            className="relative group min-w-[250px] sm:min-w-[300px]  bg-white shadow-md"
            // whileHover={{ scale: 1.05 }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="md:h-ls h-100 w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300 p-4">
              <h3 className="font-semibold text-lg">{card.title}</h3>
              <p className="text-sm text-center">A brief description of the story.</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlidingImageCards;
