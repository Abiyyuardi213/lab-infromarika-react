import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create() {
    const [values, setValues] = useState({
        title: "",
        body: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/post", values);
    }

    return (
        <>
            <h1>Buat post</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    value={values.title}
                    type="text"
                    onChange={handleChange}
                />
                <label htmlFor="body">Body:</label>
                <input
                    id="body"
                    value={values.body}
                    type="text"
                    onChange={handleChange}
                />
                <button type="submit">Buat</button>
            </form>
        </>
    );
}
