
/* =========================================
   BOOK CATALOGUE
   ZAYEN KAIRO — AUTHOR WEBSITE

   Add verified publication details here.
   ========================================= */

const books = [

  /* =====================================
     01. PYTHON SURVIVAL GUIDE
  ===================================== */

  {
    title: "Python Survival Guide",
    subtitle: "",
    category: "PROGRAMMING",

    description:
      "A practical introduction to Python concepts, examples and hands-on learning.",

    fullDescription: `
Python Survival Guide is designed to help readers build a strong foundation in Python programming.

Explore essential programming concepts, Python syntax, variables, data types, operators, conditional statements, loops, functions and other important topics.

The book provides a structured introduction to programming and helps readers develop the confidence to understand and write Python code.

Whether you are beginning your programming journey or strengthening your existing knowledge, this guide offers a practical starting point for learning Python.
`,

    cover: "images/books/python.jpeg",
    amazonUrl: "https://www.amazon.com/dp/B0H8MHVYDW",

    featured: true,

    formats: {
      Kindle: {
        price: 0.99,
        amazonUrl: "https://www.amazon.com/Linux-Beginners-Complete-Survival-Administration/dp/B0H8MHVYDW/ref=tmm_pap_swatch_0"
      },

      Paperback: {
        price: 17.99,
        amazonUrl: "https://www.amazon.com/dp/B0H8VP5M1D"
      },

      Hardcover: {
        price: "",
        amazonUrl: ""
      }
    },

    price: "",
    currency: "USD",
    format: "Paperback",
    releaseDate: "July 14, 2026",
    pages: "261",
    language: "English",
    isbn: "",
    publisher: "",
    edition: "1st"
  },



  /* =====================================
       02. LINUX FOR BEGINNERS
    ===================================== */

  {
    title: "Linux for Beginners",
    subtitle: "",
    category: "OPERATING SYSTEMS",

    description:
      "Tired of dense Linux textbooks that read like academic lectures? ",

    fullDescription: `
Linux for Beginners introduces readers to the essential skills required to work confidently with Linux systems.

Learn how to navigate the terminal, manage files and directories, understand permissions, work with users and groups, and perform everyday system administration tasks.

The guide focuses on practical Linux knowledge and helps readers understand the commands and workflows used when working with real Linux environments.

It is a useful starting point for aspiring Linux users, IT professionals and readers interested in building their technical skills.
`,

    cover: "images/books/linux.png",

    amazonUrl: "https://www.amazon.com/dp/B0GS2RWV71",

    featured: true,

    formats: {
      Kindle: {
        price: 0.99,
        amazonUrl: "https://www.amazon.com/Linux-Beginners-Complete-Survival-Administration/dp/B0GS8GWB78/ref=tmm_pap_swatch_0"
      },

      Paperback: {
        price: 17.99,
        amazonUrl: "https://www.amazon.com/dp/B0GS2RWV71"
      },

      Hardcover: {
        price: 39.99,
        amazonUrl: "https://www.amazon.com/Linux-Beginners-Complete-Survival-Administration/dp/B0GS7RSMM2/ref=tmm_hrd_swatch_0"
      }
    },

    currency: "USD",
    format: "Paperback",
    releaseDate: "March 10, 2026",
    pages: "170",
    language: "English",
    isbn: "B0GS8GWB78",
    publisher: "",
    edition: "1st"
  },



  /* =====================================
     03. COMPUTER NETWORKING MASTERY
  ===================================== */

  {
    title: "Computer Networking Mastery",
    subtitle: "",
    category: "NETWORKING",

    description:
      "Understand networking foundations, TCP/IP and real-world network concepts.",

    fullDescription: `
Computer Networking Mastery explores the foundations of modern computer networking and the technologies that connect today's digital infrastructure.

Understand networking fundamentals, TCP/IP, network architecture, routing, switching, cloud infrastructure, network security and troubleshooting concepts.

The book connects core networking principles with practical infrastructure scenarios to help readers develop a stronger understanding of how modern networks operate.

It is intended for learners and IT professionals who want to strengthen their networking knowledge and understand real-world networking environments.
`,

    cover: "images/books/cnm.jpeg",
    amazonUrl: "https://www.amazon.com/dp/B0HPYFWQSS",

    featured: true,

    formats: {
      Kindle: {
        price: 0.99,
        amazonUrl: "https://www.amazon.com/dp/B0HPYFWQSS"
      },

      Paperback: {
        price: 17.99,
        amazonUrl: "https://www.amazon.com/dp/B0HRQKQF3J"
      },

      Hardcover: {
        price: "",
        amazonUrl: ""
      }
    },

    price: "",
    currency: "USD",
    format: "Paperback",
    releaseDate: "November 14, 2026",
    pages: "203",
    language: "English",
    isbn: "",
    publisher: "",
    edition: "1st"
  },


  /* =====================================
     04. CLAUDE AI: BEYOND THE PROMPT
  ===================================== */

  {
    title: "Claude AI: Beyond the Prompt",

    // subtitle:
    //   "The Complete Practical Guide to Master Claude, Build AI Workflows, Automate Real Work, and 10X Your Productivity",

    category: "ARTIFICIAL INTELLIGENCE",

    description:
      "Explore practical ways to work with Claude, build AI workflows, automate tasks and turn AI capabilities into useful everyday processes.",

    fullDescription: `
Claude AI: Beyond the Prompt explores how to move beyond basic AI conversations and use Claude as a practical tool for getting real work done.

Discover how to write better prompts, organize projects, build repeatable AI workflows, work with agents, use Claude Code and apply AI to practical tasks.

The book focuses on real-world applications, helping readers understand how to structure tasks, improve productivity and integrate AI into everyday work.

Whether you are exploring Claude for the first time or looking to build more advanced workflows, this guide provides a practical path from basic prompting to productive AI-assisted work.
`,

    cover: "images/books/claude.png",
    amazonUrl: "https://www.amazon.com/dp/B0HMY82TQ8",

    featured: false,

    formats: {
      Kindle: {
        price: 0.99,
        amazonUrl: "https://www.amazon.com/dp/B0HMY82TQ8"
      },

      Paperback: {
        price: 21.99,
        amazonUrl: "https://www.amazon.com/dp/B0HMZDNTDJ"
      },

      Hardcover: {
        price: "Soon",
        amazonUrl: ""
      }
    },

    price: "",
    currency: "USD",
    format: "Paperback",
    releaseDate: "13 Octoberm 2026",
    pages: "244",
    language: "English",
    isbn: "",
    publisher: "",
    edition: "1st"
  },


  /* =====================================
     05. KALI LINUX GUIDE
  ===================================== */

  {
    title: "Kali Linux Guide",
    subtitle: "",
    category: "CYBERSECURITY",

    description:
      "A learning-focused guide to Kali Linux tools and security lab fundamentals.",

    fullDescription: `
Kali Linux Guide introduces readers to the Linux environment and technical foundations commonly used in cybersecurity learning.

Explore essential terminal commands, system navigation, networking concepts and the tools used in security testing environments.

The book provides a learning-focused introduction to Kali Linux and helps readers develop the foundational knowledge needed to understand ethical hacking and cybersecurity workflows.

It is intended for beginners who want to become familiar with Kali Linux and build a foundation for further cybersecurity study.
`,

    cover: "images/books/kali.png",
    amazonUrl: "https://www.amazon.com/dp/B0H6GTWLSZ",

    featured: false,

    formats: {
      Kindle: {
        price: 1.99,
        amazonUrl: "https://www.amazon.com/dp/B0H6GTWLSZ"
      },

      Paperback: {
        price: 15.99,
        amazonUrl: "https://www.amazon.com/dp/B0H6LXTNB2"
      },

      Hardcover: {
        price: "Soon",
        amazonUrl: ""
      }
    },

    price: "",
    currency: "USD",
    format: "Paperback",
    releaseDate: "June 23, 2026",
    pages: "271",
    language: "English",
    isbn: "",
    publisher: "",
    edition: "1st"
  }

];
