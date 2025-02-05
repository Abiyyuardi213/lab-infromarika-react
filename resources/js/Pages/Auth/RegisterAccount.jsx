import { useState } from "react";
import {
    Input,
    Button,
    Card,
    Typography,
    Alert,
} from "@material-tailwind/react";
import { router } from "@inertiajs/react";

export default function RegisterAccount() {
    const [form, setForm] = useState({
        nama: "",
        npm: "",
        email: "",
        password: "",
        password_confirmation: "",
        telepon: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        try {
            await router.post("/register/praktikan", form, {
                onSuccess: () => setSuccessMessage("Registrasi berhasil!"),
                onError: (error) => setErrors(error),
            });
        } catch (error) {
            setErrors({
                general:
                    "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-2xl p-6">
                <Typography
                    variant="h4"
                    className="text-center mb-4 text-blue-500"
                >
                    Daftar Praktikan
                </Typography>

                {successMessage && (
                    <Alert color="green" className="mb-4">
                        {successMessage}
                    </Alert>
                )}
                {errors.general && (
                    <Alert color="red" className="mb-4">
                        {errors.general}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nama Lengkap"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        error={!!errors.nama}
                    />
                    {errors.nama && (
                        <Typography color="red" className="text-sm">
                            {errors.nama}
                        </Typography>
                    )}

                    <Input
                        label="npm"
                        name="npm"
                        value={form.npm}
                        onChange={handleChange}
                        error={!!errors.npm}
                    />
                    {errors.npm && (
                        <Typography color="red" className="text-sm">
                            {errors.npm}
                        </Typography>
                    )}

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    {errors.email && (
                        <Typography color="red" className="text-sm">
                            {errors.email}
                        </Typography>
                    )}

                    <Input
                        label="No. Telepon"
                        name="telepon"
                        value={form.telepon}
                        onChange={handleChange}
                        error={!!errors.telepon}
                    />
                    {errors.telepon && (
                        <Typography color="red" className="text-sm">
                            {errors.telepon}
                        </Typography>
                    )}

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                    />
                    {errors.password && (
                        <Typography color="red" className="text-sm">
                            {errors.password}
                        </Typography>
                    )}

                    <Input
                        label="Konfirmasi Password"
                        name="password_confirmation"
                        type="password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        error={!!errors.password_confirmation}
                    />
                    {errors.password_confirmation && (
                        <Typography color="red" className="text-sm">
                            {errors.password_confirmation}
                        </Typography>
                    )}

                    <Button type="submit" fullWidth color="blue" ripple={true}>
                        Daftar
                    </Button>
                </form>
            </Card>
        </div>
    );
}
