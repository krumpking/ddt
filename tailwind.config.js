/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "royal-blue": "#4169e1",
      },
      fontFamily: {
        sans: ["Comfortaa", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "bg-swurl": "url('/images/bg-swurl.png')",
        carousel: "url('/images/carousel.png')",
      },
      screens: {
        xxs: "250px",
        xxsMD: "350px",
        xs: "375px",
        // => @media (min-width: 375px) { ... }

        xsMD: "400px",
        // => @media (min-width: 400px) { ... }

        smXS: "500px",
        // => @media (min-width: 500x) { ... }
        mini: "760px",
        // => @media (min-width: 760x) { ... }

        afterMini: "800px",
        // => @media (min-width: 780x) { ... }
      },
    },
    clipPath: {
      wave: "polygon(0% 0%, 0% 82.5%, 1.69492% 84.3293%, 3.38983% 86.1385%, 5.08475% 87.9078%, 6.77966% 89.6179%, 8.47458% 91.25%, 10.1695% 92.7862%, 11.8644% 94.2098%, 13.5593% 95.505%, 15.2542% 96.6578%, 16.9492% 97.6555%, 18.6441% 98.487%, 20.339% 99.1435%, 22.0339% 99.6176%, 23.7288% 99.9041%, 25.4237% 100%, 27.1186% 99.9041%, 28.8136% 99.6176%, 30.5085% 99.1435%, 32.2034% 98.487%, 33.8983% 97.6555%, 35.5932% 96.6578%, 37.2881% 95.505%, 38.9831% 94.2098%, 40.678% 92.7862%, 42.3729% 91.25%, 44.0678% 89.6179%, 45.7627% 87.9078%, 47.4576% 86.1385%, 49.1525% 84.3293%, 50.8475% 82.5%, 52.5424% 80.6708%, 54.2373% 78.8616%, 55.9322% 77.0922%, 57.6271% 75.3821%, 59.322% 73.75%, 61.017% 72.2138%, 62.7119% 70.7902%, 64.4068% 69.495%, 66.1017% 68.3422%, 67.7966% 67.3446%, 69.4915% 66.513%, 71.1864% 65.8565%, 72.8814% 65.3824%, 74.5763% 65.0959%, 76.2712% 65%, 77.9661% 65.0959%, 79.661% 65.3824%, 81.3559% 65.8565%, 83.0509% 66.513%, 84.7458% 67.3446%, 86.4407% 68.3422%, 88.1356% 69.495%, 89.8305% 70.7902%, 91.5254% 72.2138%, 93.2203% 73.75%, 94.9153% 75.3821%, 96.6102% 77.0922%, 98.3051% 78.8616%, 100% 80.6708%, 100% 0%); shape-outside: polygon(0% 0%, 0% 82.5%, 1.69492% 84.3293%, 3.38983% 86.1385%, 5.08475% 87.9078%, 6.77966% 89.6179%, 8.47458% 91.25%, 10.1695% 92.7862%, 11.8644% 94.2098%, 13.5593% 95.505%, 15.2542% 96.6578%, 16.9492% 97.6555%, 18.6441% 98.487%, 20.339% 99.1435%, 22.0339% 99.6176%, 23.7288% 99.9041%, 25.4237% 100%, 27.1186% 99.9041%, 28.8136% 99.6176%, 30.5085% 99.1435%, 32.2034% 98.487%, 33.8983% 97.6555%, 35.5932% 96.6578%, 37.2881% 95.505%, 38.9831% 94.2098%, 40.678% 92.7862%, 42.3729% 91.25%, 44.0678% 89.6179%, 45.7627% 87.9078%, 47.4576% 86.1385%, 49.1525% 84.3293%, 50.8475% 82.5%, 52.5424% 80.6708%, 54.2373% 78.8616%, 55.9322% 77.0922%, 57.6271% 75.3821%, 59.322% 73.75%, 61.017% 72.2138%, 62.7119% 70.7902%, 64.4068% 69.495%, 66.1017% 68.3422%, 67.7966% 67.3446%, 69.4915% 66.513%, 71.1864% 65.8565%, 72.8814% 65.3824%, 74.5763% 65.0959%, 76.2712% 65%, 77.9661% 65.0959%, 79.661% 65.3824%, 81.3559% 65.8565%, 83.0509% 66.513%, 84.7458% 67.3446%, 86.4407% 68.3422%, 88.1356% 69.495%, 89.8305% 70.7902%, 91.5254% 72.2138%, 93.2203% 73.75%, 94.9153% 75.3821%, 96.6102% 77.0922%, 98.3051% 78.8616%, 100% 80.6708%, 100% 0%)",
      incase:
        "polygon(0% 0%, 0% 82.5%, 1.69492% 84.3293%, 3.38983% 86.1385%, 5.08475% 87.9078%, 6.77966% 89.6179%, 8.47458% 91.25%, 10.1695% 92.7862%, 11.8644% 94.2098%, 13.5593% 95.505%, 15.2542% 96.6578%, 16.9492% 97.6555%, 18.6441% 98.487%, 20.339% 99.1435%, 22.0339% 99.6176%, 23.7288% 99.9041%, 25.4237% 100%, 27.1186% 99.9041%, 28.8136% 99.6176%, 30.5085% 99.1435%, 32.2034% 98.487%, 33.8983% 97.6555%, 35.5932% 96.6578%, 37.2881% 95.505%, 38.9831% 94.2098%, 40.678% 92.7862%, 42.3729% 91.25%, 44.0678% 89.6179%, 45.7627% 87.9078%, 47.4576% 86.1385%, 49.1525% 84.3293%, 50.8475% 82.5%, 52.5424% 80.6708%, 54.2373% 78.8616%, 55.9322% 77.0922%, 57.6271% 75.3821%, 59.322% 73.75%, 61.017% 72.2138%, 62.7119% 70.7902%, 64.4068% 69.495%, 66.1017% 68.3422%, 67.7966% 67.3446%, 69.4915% 66.513%, 71.1864% 65.8565%, 72.8814% 65.3824%, 74.5763% 65.0959%, 76.2712% 65%, 77.9661% 65.0959%, 79.661% 65.3824%, 81.3559% 65.8565%, 83.0509% 66.513%, 84.7458% 67.3446%, 86.4407% 68.3422%, 88.1356% 69.495%, 89.8305% 70.7902%, 91.5254% 72.2138%, 93.2203% 73.75%, 94.9153% 75.3821%, 96.6102% 77.0922%, 98.3051% 78.8616%, 100% 80.6708%, 100% 0%); shape-outside: polygon(0% 0%, 0% 82.5%, 1.69492% 84.3293%, 3.38983% 86.1385%, 5.08475% 87.9078%, 6.77966% 89.6179%, 8.47458% 91.25%, 10.1695% 92.7862%, 11.8644% 94.2098%, 13.5593% 95.505%, 15.2542% 96.6578%, 16.9492% 97.6555%, 18.6441% 98.487%, 20.339% 99.1435%, 22.0339% 99.6176%, 23.7288% 99.9041%, 25.4237% 100%, 27.1186% 99.9041%, 28.8136% 99.6176%, 30.5085% 99.1435%, 32.2034% 98.487%, 33.8983% 97.6555%, 35.5932% 96.6578%, 37.2881% 95.505%, 38.9831% 94.2098%, 40.678% 92.7862%, 42.3729% 91.25%, 44.0678% 89.6179%, 45.7627% 87.9078%, 47.4576% 86.1385%, 49.1525% 84.3293%, 50.8475% 82.5%, 52.5424% 80.6708%, 54.2373% 78.8616%, 55.9322% 77.0922%, 57.6271% 75.3821%, 59.322% 73.75%, 61.017% 72.2138%, 62.7119% 70.7902%, 64.4068% 69.495%, 66.1017% 68.3422%, 67.7966% 67.3446%, 69.4915% 66.513%, 71.1864% 65.8565%, 72.8814% 65.3824%, 74.5763% 65.0959%, 76.2712% 65%, 77.9661% 65.0959%, 79.661% 65.3824%, 81.3559% 65.8565%, 83.0509% 66.513%, 84.7458% 67.3446%, 86.4407% 68.3422%, 88.1356% 69.495%, 89.8305% 70.7902%, 91.5254% 72.2138%, 93.2203% 73.75%, 94.9153% 75.3821%, 96.6102% 77.0922%, 98.3051% 78.8616%, 100% 80.6708%, 100% 0%)",
    },
  },
  plugins: [require("tailwind-clip-path")],
};
