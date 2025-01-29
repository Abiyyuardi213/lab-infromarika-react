import React, { useState } from "react";
import { router } from "@inertiajs/react";
export default function Edit({ post }) {
    const [values, setValues] = useState({
        title: post.title,
        body: post.body,
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
        router.put(`/post/${post.id}`, values, {
            onSuccess: () => {
                router.visit("/post");
            },
        });
    }

    return (
        <>
            <h1>Edit Post</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Title:{" "}
                </label>
                <input
                    id="title"
                    value={values.title}
                    type="text"
                    onChange={handleChange}
                />

                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    value={values.body}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Update</button>
            </form>
        </>
    );
}
