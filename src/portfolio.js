// --- 🎨 Site Styling ---

// Colors (recommendation: choose a color suitable for dark and light modes)
// Should be inputted as a hex value. Use https://g.co/kgs/XCcs7T for choosing colors with hex.
const colors = {
    buttonColor: "#4305ba",
    LinkHighlightColor: "#4305ba"
}

// Transitions
const transitions = {
    active: true, // activate for all sections
    onlyLanding: false, // activate only for initial load of landing page
    showOnce: true, // transition only once
    thresholdOption: 0.2 // indicates at what percentage of the sections visibility the transition should start
}

// Splash Screen
const splashScreen = true // recommended: for best behavior after refresh

// --- 👋 Greeting Section ---
const greeting = {
    intro: "Halo 👋, Ayo kenalan. Nama saya",
    name: "Mochammad Farhan Fansuri",
    // og: "I'm a computer science senior with hefty experience in app development. Previously worked as a web developer at my university, where I built tools to support both students and educators. Currently, I'm developing an educational AI tool aimed at redefining how college students interact with AI.",
    message: "Saya adalah seorang fresh graduate lulusan prodi Informatika. Saya memiliki beberapa minat di bidang IT. Saya memiliki minat di bidan Web development, AI, dan Cybersecurty yang didukung melalui beberapa project",
    basedLocation: "Malang, Indonesia",
    resumeLink: "https://drive.google.com/file/d/1BEiPuAOCQPWc1RVN5Bn_7KyxhR0HL_bv/view?usp=sharing", // recommended: google drive file share link (change to "anyone on the internet can view")
    logo: {
        link: "images/logo.png", // use relative path from  parent directory -> ex: images/image.ext
        custom: false // takes precedence over image logo and allows for custom HTML logo (./components/Navbar.vue)
    },
    portraitLink: 'images/profile.jpeg'
}

const socialMediaLinks = {
    github: "https://github.com/FarhanFansuri",
    linkedin: "https://www.linkedin.com/in/farhanfansuri2002",
    medium: "http://medium.com/@farhanfansuri2023",
} // to add any additional social media links check out the README.md or src/icons.js file

// --- 😎 About Section ---
const about = {
    autobiography: [
        "Lulusan Teknik Informatika dengan pengalaman langsung dalam beberapa proyek pengembangan perangkat lunak. Berpengalaman dalam memimpin tim kecil dan meraih penghargaan dalam kompetisi IT. Memiliki kemampuan analitis dan pemecahan masalah yang kuat, serta mampu beradaptasi dengan cepat terhadap teknologi baru. Saya yakin bahwa latar belakang dan pengalaman saya akan memungkinkan saya untuk berkontribusi secara efektif.",
        "Saat ini saya tengah memperdalam pemahaman saya soal AI dan Cybersecurity."
    ], // Separated items are paragraphs
    techStack: [
        "JavaScript",
        "PHP",
        "Laravel",
        "Node.js",
        "Vue.js",
        "Python",
        "Tensorflow",
        "MySQL",
    ],
    photo1Link: "images/photo2.jpg",
    photo2Link: "images/portrait2.jpeg",
    photo3Link: "images/portrait3.jpeg"
}

// --- 🛡️ Experience Section ---
const experiences = [
    {
        position: "Fullstack Web Developer Intern",
        company: {
            name: "Qwords",
            link: "https://ibm-zcouncil.com/venues/ibm-office-austin-tx/"
        },
        duration: "Desember 2023 - Januari 2024",
        content: [
            {
                sectionHeader: "",
                bulletPoints: [
                    "Building next-generation AI products and enterprise software solutions.",
                ]
            }
        ],
        hashtags: [
            "PHP",
            "Laravel",
            "HTML",
            "CSS",
            "Javascript",
            "HTML",
            "CSS",
            "Sass",
            "Bootstrap"
        ]
    },
]

// --- 💻 Work Section ---
const works = [
    {
        projectName: "Tiny React Toolbox",
        yearCompleted: "2025",
        description: "Developed a tiny open-source library of highly-reusable and malleable React components (+TS logic) for LAS public domain UI AI analytics project. Sections, toggleables, drop-downs, icons, graphs.",
        techStack: "TS, React.js, Tailwind.css",
        links: [
            {
                label: "",
                type: "git",
                url: "https://github.com/mimaishel/tiny-react-toolbox"
            },
        ],
        imageLink: "images/las_dashboard_pic.png",
        alignLeft: false
    },
    {
        projectName: "EduVaultAI",
        yearCompleted: "2024",
        description: "Lead the backend and frontend development of a smart study tool transforming course notes into personalized practice exams and study guides.",
        techStack: "Vue.js, JS, HTML, Tailwind.css, FastAPI, Python, MariaDB, Docker, Llama.ai",
        links: [
            {
                label: "",
                type: "external",
                url: "https://blog.eduvaultai.com"
            }
        ],
        imageLink: "images/eduvaultai_dash_pic.png",
        alignLeft: true
    },
    {
        projectName: "Open-Source Developer Portfolio",
        yearCompleted: "2023",
        description: "Designed and developed an open-sourced single page application template to help web developers create visually appealing personal portfolios, focusing on ease of use and customization. Built with Vue.js, JS, HTML, Tailwind CSS, the project achieved 27 stars and 14 forks on GitHub.",
        techStack: "Vue.js, JS, HTML, Tailwind.css",
        links: [
            {
                label: "",
                type: "git",
                url: "https://github.com/mimaishel/webdev_portfolio"
            },
            {
                label: "",
                type: "external",
                url: "https://maxshelepov.com"
            }
        ],
        imageLink: "images/webdevportfolio_pic.png",
        alignLeft: false
    },
    // {
    //     projectName: "TrackYourSubs IOS App",
    //     yearCompleted: "2022",
    //     description: "An IOS app to track you subscriptions and expenses, all the while presenting in a clean and professional look with a load of features. Some of the more evident features are: Budgeting (monthly / yearly option available), Current monthly & yearly total expense at a glance, Custom suggestions to meet budget, Organize (Categorization & Importance) and filter through subscriptions, Reminders via scheduled notifications, Stats page: pie chart visual, bar chart visual, and streak indicator.",
    //     techStack: "Swift, SwiftUI",
    //     links: [
    //         {
    //             label: "",
    //             type: "git",
    //             url: "https://github.com/mimaishel/TrackYourSubsDemo/"
    //         },
    //         {
    //             label: "",
    //             type: "external",
    //             url: "https://youtu.be/KsTx-F70OOk"
    //         }
    //     ],
    //     imageLink: "images/tracksubs_pic.png",
    //     alignLeft: false
    // },
    // {
    //     projectName: "Personal Portfolio App",
    //     yearCompleted: "2021",
    //     description: "Built a dynamic, live-editable personal portfolio website with an admin dashboard for real-time updates. Developed using Django (Python) for the backend, and HTML, CSS, and JavaScript for the frontend, following the MVC architecture, which enhanced my full-stack development skills.",
    //     techStack: "Django, Python, HTML, CSS, Bootstrap4, JS",
    //     links: [
    //         {
    //             label: "",
    //             type: "external",
    //             url: "https://site--maximshelepov--6tkhqqjrq9c5.code.run"
    //         }
    //     ],
    //     imageLink: "images/portfolio_pic.png",
    //     alignLeft: true
    // },
    // {
    //     projectName: "Sudoku Game & Solver",
    //     yearCompleted: "2021",
    //     description: "Built a Sudoku game UI incorporating the Java Swing library. Randomly generates a Sudoku puzzle and solves itself using the backtracking algorithm written in Java..",
    //     techStack: "Java",
    //     links: [
    //         {
    //             label: "",
    //             type: "git",
    //             url: "https://github.com/mimaishel/sudokusolver"
    //         },
    //         {
    //             label: "",
    //             type: "external",
    //             url: "https://youtu.be/lXOjOrjf5hU"
    //         }
    //     ],
    //     imageLink: "images/sudoku_pic.png",
    //     alignLeft: false
    // },
    // {
    //     projectName: "Trivia Quiz",
    //     yearCompleted: "2020",
    //     description: "Interested in taking a fun and interactive pop quiz? Using the HTML, CSS3, JavaScript, and jQuery I created a quiz that can be taken on numerous topics of your choice and gives instant feedback. The entire project is built mostly on JavaScript and all the functionality and events are controlled through functions such as ReadDisplay and Validate. The HTML portion of the online quiz only serves as the skeleton and template for elements that will be created via JS.",
    //     techStack: "JS, HTML, CSS",
    //     links: [
    //         {
    //             label: "",
    //             type: "git",
    //             url: "https://github.com/mimaishel/JS-API-Quiz"
    //         },
    //         {
    //             label: "",
    //             type: "external",
    //             url: "https://codepen.io/Max_the_coder/pen/yLXZOYL" //https://codepen.io/Max_the_coder/pen/yLXZOYL
    //         }
    //     ],
    //     imageLink: "images/trivia_pic.png",
    //     alignLeft: true
    // },
    // {
    //     projectName: "Coronavirus Report",
    //     yearCompleted: "2020",
    //     description: "Created a program that displays up-to-date COVID-19 data and shows results in a graphical / visual representation. Coded with the Python programming language and libraries such as Matplotlib, Requests, and CSV.",
    //     techStack: "Python",
    //     links: [
    //         {
    //             label: "",
    //             type: "git",
    //             url: "https://youtu.be/gw5kb1QKVp0"
    //         },
    //         {
    //             label: "",
    //             type: "external",
    //             url: "https://github.com/mimaishel/Covid-Cases-Visual"
    //         }
    //     ],
    //     imageLink: "images/covid_pic.png",
    //     alignLeft: false
    // }
]

const archiveLink = "https://github.com/mimaishel?tab=repositories"

// --- 📭 Contact Section ---
// 2 Options available - Choose 1
const contact = {
    externalLink: {
        shortTitle: "Get in Touch",
        note: [
            "Reach out if you have any questions or want to collaborate on a project.",
        ], // paragraph breaks will be entered after each item,
        link: {
            email: "farhanfansuri2023@gmail.com", // email takes precedance
            other: "https://forms.gle/W3MswTKsPWMxEbn58"
        },
        responseTimeMessage: ""
    },
    formEmbedLink: "" // inclusion of this link will take precedance
}

export default {
    colors,
    transitions,
    splashScreen,
    greeting,
    socialMediaLinks,
    about,
    experiences,
    works,
    archiveLink,
    contact
}