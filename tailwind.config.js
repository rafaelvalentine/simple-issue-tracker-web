/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "shortener-grey": {
                    DEFAULT: "#EFF2F6",
                    "100": "#EFF2F6",
                    "200": "#A8BACB",
                    "300": "#5F81A1",
                    "400": "#F6F7FA"
                },
                "shortener-blue": {
                    DEFAULT: "#78D1F9",
                    "100": "#A6C5E4",
                    "200": "#A6C5E4"
                }
            },
            fontFamily: {
                'bebas-neue': ['Bebas Neue', 'cursive'],
            },
        },
    },
    plugins: [],
};