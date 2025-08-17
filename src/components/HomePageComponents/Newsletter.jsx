import React from "react";
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";


const useSubscribe = () => {
    return useMutation({
        mutationFn: async (email) => {
            const { data } = await axios.post("https://havenspace.vercel.app/api/subscribe", {
                email,
            });
            return data;
        },
        onSuccess: (data) => {
            Swal.fire({
                icon: "success",
                title: "Subscribed!",
                text: data?.message || "You have successfully subscribed 🎉",
                confirmButtonColor: "#48A6A7",
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data?.message || "Something went wrong. Try again.",
                confirmButtonColor: "#d33",
            });
        },
    });
};

const Newsletter = () => {
    const { mutate, isPending, isSuccess, isError, error } = useSubscribe();
    const handleSubscribe = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        console.log(email);
        mutate(email)
    }
    return (
        <section className=" py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#006A71] mb-4">
                    Stay Updated with HavenSpace
                </h2>
                <p className="text-gray-600 mb-8">
                    Subscribe to our newsletter and never miss the latest property updates,
                    exclusive offers, and real estate insights.
                </p>

                {/* Newsletter Form */}
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="relative w-full md:w-2/3">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#48A6A7] text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-[#006A71] transition duration-300"
                    >
                        Subscribe
                    </button>
                </form>

                {/* Disclaimer */}
                <p className="text-sm text-gray-500 mt-4">
                    We respect your privacy. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
