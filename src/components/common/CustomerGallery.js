import { motion } from 'framer-motion';
import { FaInstagram, FaHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const galleryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            when: "beforeChildren"
        }
    }
};

const cosmicPhotoVariants = {
    hidden: { 
        opacity: 0, 
        y: 100,
        rotate: -5,
        scale: 0.8 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        rotate: 0,
        scale: 1, 
        transition: { 
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.5
        } 
    },
    hover: {
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)",
        transition: {
            duration: 0.3
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

const CustomerGallery = ({ photos = [] }) => {
    if (!photos.length) return null;

    return (
        <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
            {/* Cosmic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={starFieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                    />
                ))}
            </div>

            {/* Nebula Effect */}
            <div className="absolute -top-1/4 -left-1/4 w-full h-full rounded-full bg-purple-900/20 filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-full h-full rounded-full bg-blue-900/20 filter blur-3xl opacity-30"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-20"
                >
                    <motion.h2 
                        className="text-5xl md:text-7xl font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-primary"
                        variants={{ 
                            hidden: { opacity: 0, y: 50 }, 
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                transition: { 
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10
                                } 
                            } 
                        }}
                    >
                        Cosmic Couture
                    </motion.h2>
                    <motion.p 
                        className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto"
                        variants={{ 
                            hidden: { opacity: 0, y: 30 }, 
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                transition: { 
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10
                                } 
                            } 
                        }}
                    >
                        Our celestial creations brought to life by stardust-worthy clients across the galaxy
                    </motion.p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
                    variants={galleryContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {photos.map((photo, index) => (
                        <motion.div 
                            key={index} 
                            className="relative overflow-hidden rounded-xl shadow-2xl group"
                            variants={cosmicPhotoVariants}
                            whileHover="hover"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            
                            <img 
                                src={photo.src} 
                                alt={photo.alt} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            
                            {/* Instagram-style overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <div className="text-white text-center p-4">
                                    <FaInstagram className="mx-auto mb-2 text-2xl" />
                                    <p className="font-medium">@{photo.username || 'stellarshion'}</p>
                                </div>
                            </div>
                            
                            {/* Rating stars */}
                            <div className="absolute bottom-4 left-4 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                {[...Array(5)].map((_, i) => (
                                    i < (photo.rating || 5) ? 
                                    <FaStar key={i} className="text-yellow-400 mr-1" /> : 
                                    <FaRegStar key={i} className="text-white/50 mr-1" />
                                ))}
                            </div>
                            
                            {/* Like button */}
                            <button className="absolute top-4 right-4 p-2 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <FaHeart className="text-white group-hover:text-pink-500 transition-colors" />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-xl text-gray-400 mb-8">Join our interstellar fashion community</p>
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-medium hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
                        Share Your Cosmic Look
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CustomerGallery;