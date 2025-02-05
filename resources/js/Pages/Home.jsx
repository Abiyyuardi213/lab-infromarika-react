import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Card,
    CardBody,
    Button,
    Dialog,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { ChevronRight, Code, Database, Layout, ArrowRight } from "lucide-react";

const practiceData = [
    {
        id: 1,
        title: "Pemrograman Terstruktur",
        description:
            "Belajar dasar-dasar pemrograman dengan bahasa C untuk membangun fondasi yang kuat dalam pengembangan perangkat lunak.",
        icon: <Code className="w-6 h-6 text-gray-700" />,
    },
    {
        id: 2,
        title: "Struktur Data",
        description:
            "Pelajari konsep dasar dan implementasi struktur data seperti array, linked list, stack, queue, dan tree untuk mengelola data secara efisien.",
        icon: <Code className="w-6 h-6 text-gray-700" />,
    },
    {
        id: 3,
        title: "Pemrograman Berbasis Objek",
        description:
            "Memahami konsep OOP dengan Java untuk mengembangkan aplikasi yang lebih terstruktur dan mudah dipelihara.",
        icon: <Layout className="w-6 h-6 text-gray-700" />,
    },
    {
        id: 4,
        title: "Basis Data",
        description:
            "Mengelola dan mengorganisir data dengan SQL untuk membangun sistem informasi yang efisien dan scalable.",
        icon: <Database className="w-6 h-6 text-gray-700" />,
    },
];

const features = [
    {
        title: "Pembelajaran Terstruktur",
        description:
            "Kurikulum yang dirancang sistematis dengan pendekatan praktis dan berbasis industri",
        icon: "📚",
    },
    {
        title: "Bimbingan Profesional",
        description:
            "Tim pengajar berpengalaman dari akademisi dan praktisi industri",
        icon: "👨‍🏫",
    },
    {
        title: "Sertifikasi Kompetensi",
        description:
            "Sertifikat resmi yang diakui industri setelah menyelesaikan program",
        icon: "🎓",
    },
];

const Home = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [npm, setNpm] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false); // ✅ Tambahkan ini
    const [error, setError] = useState("");
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // const handleLogin = () => {
    //     if (npm.trim() === "" || password.trim() === "") {
    //         setError("NPM dan Password wajib diisi.");
    //         return;
    //     }
    //     // Simulasi login berhasil
    //     setError("");
    //     console.log("Login berhasil:", { npm, password });
    //     handleOpen(); // Menutup dialog setelah login
    // };

    const handleLogin = () => {
        router.post(
            "/login",
            {
                npm,
                password,
                remember,
            },
            {
                onError: (errors) => {
                    setError(errors.npm || errors.password || "Login gagal.");
                },
                onSuccess: () => {
                    setOpen(false); // Tutup dialog setelah login sukses
                },
            }
        );
    };
    return (
        <div className="min-h-screen bg-white">
            <Head title={`Laboratorium Informatika ITATS`} />
            {/* Navbar */}
            <motion.nav
                className="fixed w-full bg-white shadow-sm z-50"
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${Math.min(
                        scrollY / 200,
                        0.98
                    )})`,
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <motion.a
                        href="/"
                        className="text-xl font-semibold text-gray-800"
                        whileHover={{ scale: 1.02 }}
                    >
                        Lab Informatika
                    </motion.a>
                    <Button
                        onClick={handleOpen}
                        variant="outlined"
                        className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300"
                    >
                        Login
                    </Button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant="h1"
                                className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
                            >
                                Laboratorium Informatika
                                <span className="block text-gray-600">
                                    ITATS
                                </span>
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <Typography className="text-lg text-gray-600 leading-relaxed">
                                Mengembangkan kompetensi profesional dalam
                                bidang teknologi informasi melalui pembelajaran
                                praktis dan inovatif.
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex gap-4"
                        >
                            <Button
                                size="lg"
                                className="bg-gray-800 text-white hover:bg-gray-900 shadow-none hover:shadow-md transition-all duration-300"
                            >
                                Mulai Belajar
                            </Button>
                            <Button
                                size="lg"
                                variant="text"
                                className="text-gray-800 flex items-center gap-2"
                            >
                                Pelajari Lebih Lanjut{" "}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    </div>
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <img
                            src="/images/hero-image.png"
                            alt="Hero"
                            className="w-full rounded-lg"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Program Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Typography
                            variant="h2"
                            className="text-3xl font-bold text-gray-800 mb-4"
                        >
                            Program Praktikum
                        </Typography>
                        <Typography className="text-gray-600 max-w-2xl mx-auto">
                            Program praktikum yang dirancang untuk mempersiapkan
                            mahasiswa menghadapi tantangan industri teknologi
                            modern.
                        </Typography>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {practiceData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow duration-300">
                                    <CardBody className="p-6">
                                        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                                            {item.icon}
                                        </div>
                                        <Typography
                                            variant="h5"
                                            className="mb-2 text-gray-800"
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography className="text-gray-600 mb-4">
                                            {item.description}
                                        </Typography>
                                        <Button
                                            variant="text"
                                            className="flex items-center gap-2 text-gray-800"
                                        >
                                            Detail Program
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Typography
                            variant="h2"
                            className="text-3xl font-bold text-gray-800 mb-4"
                        >
                            Keunggulan Program
                        </Typography>
                        <Typography className="text-gray-600 max-w-2xl mx-auto">
                            Kami berkomitmen untuk memberikan pengalaman
                            pembelajaran terbaik dengan standar industri.
                        </Typography>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="bg-white">
                                    <CardBody className="p-6">
                                        <div className="text-3xl mb-4">
                                            {feature.icon}
                                        </div>
                                        <Typography
                                            variant="h5"
                                            className="mb-2 text-gray-800"
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography className="text-gray-600">
                                            {feature.description}
                                        </Typography>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" className="text-gray-800">
                            Masuk
                        </Typography>
                        <Typography className="text-gray-600">
                            Masukkan NPM dan Password untuk mengakses sistem.
                        </Typography>
                        <Input
                            label="NPM"
                            size="lg"
                            value={npm}
                            onChange={(e) => setNpm(e.target.value)}
                            className="!border-gray-300"
                            error={!!error && npm.trim() === ""}
                        />
                        <Input
                            label="Password"
                            type="password"
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="!border-gray-300"
                            error={!!error && password.trim() === ""}
                        />
                        <Checkbox label="Remember Me" />
                        {error && (
                            <Typography className="text-red-500 text-sm">
                                {error}
                            </Typography>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            onClick={handleLogin}
                            fullWidth
                            className="bg-gray-800 text-white hover:bg-gray-900"
                        >
                            Masuk
                        </Button>
                        <Typography
                            variant="small"
                            className="mt-4 text-center text-gray-600"
                        >
                            Belum Punya Akun?{" "}
                            <a
                                href="/register/praktikan"
                                className="font-semibold text-gray-800 hover:text-gray-900"
                            >
                                Daftar
                            </a>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    );
};

export default Home;
