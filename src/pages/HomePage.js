import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { fetchSiteContent, fetchProducts } from '../api/mockApi';
import Button from '../components/common/Button';
import CustomerGallery from '../components/common/CustomerGallery';
import { FaCut, FaShoppingBag, FaCalendarCheck, FaArrowRight, FaStar } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Cosmic animation variants
const cosmicVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.2
    }
  }
};

const starFieldVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: [0, 1, 0],
    transition: {
      duration: 2 + Math.random() * 3,
      repeat: Infinity,
      delay: i * 0.1
    }
  })
};

const HomePage = () => {
  const [content, setContent] = useState({ heroImages: [], customerGalleryImages: [] });
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [siteContent, allProducts] = await Promise.all([
          fetchSiteContent(),
          fetchProducts()
        ]);
        setContent(siteContent);
        setFeaturedProducts(allProducts.filter(p => p.featured));
        
        // GSAP animations after content loads
        gsap.fromTo(".hero-title", 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.8, 
            ease: "power4.out",
            delay: 0.3
          }
        );
        
        gsap.to(".hero-subtitle", {
          text: "Experience fashion that transcends trends. Each piece a story, tailored for you.",
          duration: 2,
          ease: "none",
          delay: 0.8
        });

      } catch (error) {
        console.error("Failed to load page data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();

    // GSAP scroll animations
    gsap.utils.toArray(".service-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.2)"
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const heroImage = content.heroImages[0]?.src || '';

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-4xl font-serif">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-r-4 border-brand-primary rounded-full mr-4"
        />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          Crafting Cosmic Elegance...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={starFieldVariants}
            initial="hidden"
            animate="visible"
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* 1. Ultra Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-screen bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Parallax Background Layers */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            y: yPos
          }}
        />
        
        {/* Nebula Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Glowing Particles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-brand-primary filter blur-md"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/3 w-6 h-6 rounded-full bg-pink-500 filter blur-lg"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 z-10">
          <motion.div
            className="hero-title"
            initial={{ opacity: 0 }}
          >
            <h1 className="text-6xl md:text-9xl font-serif font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-primary to-white">
              <span className="inline-block">COSMIC</span>
              <span className="inline-block mx-4 text-brand-primary">ELEGANCE</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="hero-subtitle text-xl md:text-3xl mb-12 max-w-4xl mx-auto font-light"
            initial={{ opacity: 0 }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link to="/products">
              <Button variant="primary" className="text-lg group">
                <span className="flex items-center">
                  Begin Your Journey 
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-sm opacity-70">EXPLORE THE COSMOS</div>
            <div className="mx-auto w-px h-8 bg-white mt-2"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Galactic Services Section */}
      <motion.section 
        ref={servicesRef}
        className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cosmicVariants}
      >
        {/* Floating Nebula */}
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-blue-900/20 filter blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-purple-900/20 filter blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            variants={cosmicVariants}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-6">
              <span className="text-brand-primary">Celestial</span> Services
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-80">
              Our offerings are crafted with the precision of orbiting planets and the beauty of distant galaxies
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <FaShoppingBag size={64} />,
                title: "Acquire Stardust",
                description: "Own an exclusive piece from our interstellar collections, crafted with cosmic passion.",
                color: "text-blue-400"
              },
              {
                icon: <FaCalendarCheck size={64} />,
                title: "Borrow the Moon",
                description: "Wear celestial beauty for any occasion without permanent commitment.",
                color: "text-purple-400"
              },
              {
                icon: <FaCut size={64} />,
                title: "Tailored Constellations",
                description: "Custom creations aligned to your personal celestial coordinates.",
                color: "text-pink-400"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className={`service-card p-10 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:border-brand-primary transition-all duration-500 group ${index === activeService ? 'scale-105' : ''}`}
                onMouseEnter={() => setActiveService(index)}
                variants={cosmicVariants}
              >
                <motion.div 
                  className={`mb-8 ${service.color} group-hover:text-white transition-colors`}
                  whileHover={{ scale: 1.1 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-3xl font-serif mb-4 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-lg group-hover:text-white transition-colors">
                  {service.description}
                </p>
                <motion.div 
                  className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  <FaArrowRight className="inline-block" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Featured Nebula Collection */}
      <motion.section 
        className="py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={cosmicVariants}
      >
        {/* Animated Nebula Background */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 40% 50%, rgba(92, 32, 178, 0.8), rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 60% 50%, rgba(31, 117, 254, 0.8), rgba(0, 0, 0, 0) 70%)',
            backgroundSize: '200% 200%'
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            variants={cosmicVariants}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-6">
              <span className="text-brand-primary">Nebula</span> Collection
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-80">
              Each piece contains the essence of a different galaxy
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative"
                whileHover="hover"
                initial="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.03 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative overflow-hidden rounded-xl h-96">
                    <motion.img 
                      src={product.imageUrls[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.1 }
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-serif font-medium">{product.name}</h3>
                      <div className="text-xl font-medium text-brand-primary">
                        {product.price ? `$${product.price}` : `$${product.rentalPrice}/day`}
                      </div>
                    </div>
                    
                    <div className="flex mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < (product.rating || 5) ? 'text-yellow-400' : 'text-gray-600'} mr-1`} 
                          size={14}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/products">
              <Button variant="outline" className="text-lg group">
                <span className="flex items-center">
                  View All Cosmic Collections
                  <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4. Stellar Customer Gallery */}
      <motion.section
        className="py-32 bg-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cosmicVariants}
      >
        <div className="absolute -top-1/2 -left-1/4 w-full h-full rounded-full bg-blue-900/10 filter blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full bg-purple-900/10 filter blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            variants={cosmicVariants}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-6">
              <span className="text-brand-primary">Stellar</span> Testimonials
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-80">
              See how we've transformed ordinary moments into cosmic experiences
            </p>
          </motion.div>
          
          <CustomerGallery 
            photos={content.customerGalleryImages} 
            className="stellar-gallery"
          />
        </div>
      </motion.section>

      {/* Cosmic Call-to-Action */}
      <motion.section 
        className="py-40 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cosmicVariants}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://example.com/cosmic-pattern.png')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-8xl font-serif font-bold mb-8"
            variants={cosmicVariants}
          >
            Ready for Your <span className="text-brand-primary">Cosmic Transformation</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-90"
            variants={cosmicVariants}
          >
            Join our constellation of satisfied clients and experience fashion that's truly out of this world
          </motion.p>
          
          <motion.div
            variants={cosmicVariants}
          >
            <Link to="/contact">
              <Button variant="primary" size="xl" className="text-xl group">
                <span className="flex items-center">
                  Begin Your Cosmic Journey
                  <FaArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;