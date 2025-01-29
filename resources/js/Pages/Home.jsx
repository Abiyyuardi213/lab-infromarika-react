import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardBody,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";

const practiceData = [
    {
        id: 1,
        title: "Pemrograman Terstruktur",
        description: "Belajar dasar-dasar pemrograman dengan bahasa C",
        image: "/images/petruk-exemple.jpg",
    },
    {
        id: 2,
        title: "Pemrograman Berbasis Objek",
        description: "Memahami konsep OOP dengan Java",
        image: "/images/hero-image.png",
    },
    {
        id: 3,
        title: "Basis Data",
        description: "Mengelola dan mengorganisir data dengan SQL",
        image: "/images/hero-image.png",
    },
];

const Home = () => {
    const [isHovered, setIsHovered] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % practiceData.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + practiceData.length) % practiceData.length
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <motion.nav
                className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-gray-800">
                        Lab Informatika
                    </a>
                    <Button variant="gradient" color="blue">
                        Login
                    </Button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <motion.section
                className="pt-24 pb-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Typography
                                variant="h1"
                                color="blue-gray"
                                className="text-4xl md:text-6xl font-bold"
                            >
                                Selamat Datang di Lab Informatika
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Typography
                                variant="lead"
                                color="gray"
                                className="text-lg"
                            >
                                Tempat belajar dan mengembangkan keterampilan
                                pemrograman Anda
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button size="lg" variant="gradient" color="blue">
                                Mulai Belajar
                            </Button>
                        </motion.div>
                    </div>
                    <motion.div
                        className="flex-1"
                        initial={{ x: 50 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img
                            src="/images/hero-image.png"
                            alt="Hero"
                            className="w-full rounded-lg shadow-xl"
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Praktikum Section */}
            <motion.section
                className="py-16 px-4 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto">
                    <Typography
                        variant="h2"
                        color="blue-gray"
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Program Praktikum
                    </Typography>
                    <div className="relative">
                        <div className="flex overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${
                                        currentIndex * 100
                                    }%)`,
                                }}
                            >
                                {practiceData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="min-w-full md:min-w-[33.333%] p-2"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                        >
                                            <Card
                                                className="overflow-hidden cursor-pointer"
                                                onMouseEnter={() =>
                                                    setIsHovered(item.id)
                                                }
                                                onMouseLeave={() =>
                                                    setIsHovered(null)
                                                }
                                                onClick={() =>
                                                    (window.location.href = `/praktikum/${item.id}`)
                                                }
                                            >
                                                <CardBody className="p-0">
                                                    <div className="relative">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-[400px] object-cover"
                                                        />
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transform transition-all duration-300 ${
                                                                isHovered ===
                                                                item.id
                                                                    ? "translate-y-0"
                                                                    : "translate-y-[60%]"
                                                            }`}
                                                        >
                                                            <Typography
                                                                variant="h4"
                                                                color="white"
                                                                className="mb-2"
                                                            >
                                                                {item.title}
                                                            </Typography>
                                                            <Typography
                                                                color="white"
                                                                className="opacity-90"
                                                            >
                                                                {
                                                                    item.description
                                                                }
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            size="lg"
                            onClick={prevSlide}
                            className="!absolute top-1/2 left-4 -translate-y-1/2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </IconButton>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            size="lg"
                            onClick={nextSlide}
                            className="!absolute top-1/2 !right-4 -translate-y-1/2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </IconButton>
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                className="py-16 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <motion.div
                                key={item}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: item * 0.1 }}
                            >
                                <Card className="p-6">
                                    <CardBody>
                                        <Typography
                                            variant="h4"
                                            color="blue-gray"
                                            className="mb-4"
                                        >
                                            Fitur {item}
                                        </Typography>
                                        <Typography color="gray">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua.
                                        </Typography>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
