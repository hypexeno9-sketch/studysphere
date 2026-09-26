/* =========================================================
   STUDYSPHERE - CLASS 9
   DATA FILE
   Academic Session: 2026-27
   ========================================================= */

const STUDYSPHERE_CONFIG = {
    siteName: "StudySphere",
    className: "Class 9",
    session: "2026-27",
    version: "2.0",
    language: "English / Hinglish",
    quizQuestionsPerChapter: 10
};


/* =========================================================
   HELPER: CREATE QUIZ QUESTION
   ========================================================= */

function q(question, options, answer, explanation = "") {
    return {
        question,
        options,
        answer,
        explanation
    };
}


/* =========================================================
   SCIENCE
   ========================================================= */

const scienceChapters = [

    {
        id: "science-cell",
        number: 1,
        title: "Cell",
        icon: "🔬",
        description: "Cell is the basic structural and functional unit of life.",
        notes: `
            <h3>Cell - Quick Notes</h3>
            <p>Cell is the basic structural and functional unit of living organisms.</p>

            <h4>Important Points</h4>
            <ul>
                <li>Plant and animal cells are eukaryotic cells.</li>
                <li>Prokaryotic cells do not have a true nucleus.</li>
                <li>Nucleus controls many activities of the cell.</li>
                <li>Mitochondria are associated with energy release.</li>
                <li>Chloroplasts are present in plant cells and help in photosynthesis.</li>
                <li>Cell membrane controls movement of substances into and out of the cell.</li>
                <li>Cell wall provides support to plant cells.</li>
                <li>Osmosis is movement of water through a selectively permeable membrane.</li>
            </ul>
        `,
        questions: [
            "Differentiate between prokaryotic and eukaryotic cells.",
            "Explain the functions of nucleus and mitochondria.",
            "Why is the cell called the basic unit of life?",
            "Differentiate between diffusion and osmosis.",
            "Explain the importance of the cell membrane."
        ],
        quiz: [
            q(
                "Which organelle is commonly called the powerhouse of the cell?",
                ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"],
                "Mitochondria",
                "Mitochondria are the major site of cellular energy release."
            ),
            q(
                "Which structure controls the movement of substances into and out of the cell?",
                ["Cell wall", "Cell membrane", "Nucleus", "Chloroplast"],
                "Cell membrane"
            ),
            q(
                "Which type of cell lacks a true nucleus?",
                ["Plant cell", "Animal cell", "Prokaryotic cell", "Eukaryotic cell"],
                "Prokaryotic cell"
            ),
            q(
                "Which organelle is mainly responsible for photosynthesis?",
                ["Mitochondria", "Chloroplast", "Nucleus", "Vacuole"],
                "Chloroplast"
            ),
            q(
                "Osmosis mainly involves the movement of:",
                ["Proteins", "Water", "DNA", "Starch"],
                "Water"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+science+cell+one+shot",
        pdf: "assets/pdf/cell-chapter-notes.pdf"
    },


    {
        id: "science-tissues",
        number: 2,
        title: "Tissues",
        icon: "🧬",
        description: "Study of plant and animal tissues and their functions.",
        notes: `
            <h3>Tissues - Quick Notes</h3>

            <p>A tissue is a group of similar cells performing a specific function.</p>

            <h4>Plant Tissues</h4>
            <ul>
                <li>Meristematic tissue - actively dividing cells.</li>
                <li>Permanent tissue - cells that have generally lost the ability to divide.</li>
                <li>Parenchyma - storage and basic functions.</li>
                <li>Collenchyma - flexibility and support.</li>
                <li>Sclerenchyma - strength.</li>
                <li>Xylem - transports water and minerals.</li>
                <li>Phloem - transports food.</li>
            </ul>

            <h4>Animal Tissues</h4>
            <ul>
                <li>Epithelial tissue - covering and protection.</li>
                <li>Connective tissue - binding and support.</li>
                <li>Muscular tissue - movement.</li>
                <li>Nervous tissue - transmission of nerve impulses.</li>
            </ul>
        `,
        questions: [
            "What is a tissue?",
            "Differentiate between meristematic and permanent tissues.",
            "Compare xylem and phloem.",
            "Differentiate between striated, smooth and cardiac muscles.",
            "Explain the functions of connective tissue."
        ],
        quiz: [
            q(
                "Which tissue transports water in plants?",
                ["Phloem", "Xylem", "Parenchyma", "Collenchyma"],
                "Xylem"
            ),
            q(
                "Which tissue transports food in plants?",
                ["Xylem", "Phloem", "Sclerenchyma", "Epidermis"],
                "Phloem"
            ),
            q(
                "Which tissue is mainly responsible for movement in animals?",
                ["Nervous", "Muscular", "Epithelial", "Connective"],
                "Muscular"
            ),
            q(
                "Which tissue transmits nerve impulses?",
                ["Muscular", "Connective", "Nervous", "Epithelial"],
                "Nervous"
            ),
            q(
                "Which tissue provides flexibility to growing plant parts?",
                ["Sclerenchyma", "Collenchyma", "Xylem", "Phloem"],
                "Collenchyma"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+tissues+one+shot",
        pdf: ""
    },


    {
        id: "science-reproduction",
        number: 3,
        title: "Reproduction",
        icon: "🌱",
        description: "Study of asexual and sexual reproduction.",
        notes: `
            <h3>Reproduction - Quick Notes</h3>

            <ul>
                <li>Reproduction helps organisms produce new individuals.</li>
                <li>Asexual reproduction generally involves a single parent.</li>
                <li>Sexual reproduction involves fusion of gametes.</li>
                <li>Sexual reproduction creates genetic variation.</li>
                <li>In flowering plants, pollination transfers pollen to the stigma.</li>
                <li>Fertilisation leads to formation of a zygote.</li>
            </ul>
        `,
        questions: [
            "Differentiate between sexual and asexual reproduction.",
            "Explain why sexual reproduction creates variation.",
            "What is pollination?",
            "Differentiate between self-pollination and cross-pollination.",
            "Explain the role of fertilisation."
        ],
        quiz: [
            q(
                "Which process produces genetic variation more directly?",
                ["Sexual reproduction", "Binary fission", "Budding", "Fragmentation"],
                "Sexual reproduction"
            ),
            q(
                "Transfer of pollen from anther to stigma is called:",
                ["Fertilisation", "Pollination", "Germination", "Dispersal"],
                "Pollination"
            ),
            q(
                "Fusion of male and female gametes is called:",
                ["Pollination", "Fertilisation", "Germination", "Budding"],
                "Fertilisation"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+science+reproduction+one+shot",
        pdf: ""
    },


    {
        id: "science-diversity",
        number: 4,
        title: "Diversity",
        icon: "🌍",
        description: "Classification and diversity of living organisms.",
        notes: `
            <h3>Diversity - Quick Notes</h3>
            <ul>
                <li>Classification makes the study of organisms easier.</li>
                <li>Living organisms can be grouped according to their characteristics.</li>
                <li>The five-kingdom system includes Monera, Protista, Fungi, Plantae and Animalia.</li>
                <li>Binomial nomenclature gives organisms scientific names.</li>
                <li>Scientific names generally have two parts: genus and species.</li>
            </ul>
        `,
        questions: [
            "Why is classification necessary?",
            "Explain the five-kingdom classification.",
            "What is binomial nomenclature?",
            "Differentiate between unicellular and multicellular organisms.",
            "What are viruses?"
        ],
        quiz: [
            q(
                "Which kingdom contains bacteria?",
                ["Monera", "Fungi", "Plantae", "Animalia"],
                "Monera"
            ),
            q(
                "Scientific naming using two names is called:",
                ["Classification", "Binomial nomenclature", "Evolution", "Taxonomy"],
                "Binomial nomenclature"
            ),
            q(
                "Which group contains mushrooms?",
                ["Fungi", "Monera", "Animalia", "Plantae"],
                "Fungi"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+science+diversity+one+shot",
        pdf: ""
    },


    {
        id: "science-mixtures",
        number: 5,
        title: "Exploring Mixtures and their Separation",
        icon: "🧪",
        description: "Mixtures, solutions and methods of separation.",
        notes: `
            <h3>Mixtures and Separation - Quick Notes</h3>

            <ul>
                <li>Homogeneous mixtures have uniform composition.</li>
                <li>Heterogeneous mixtures do not have uniform composition.</li>
                <li>Solutions are homogeneous mixtures.</li>
                <li>Suspensions contain relatively large particles.</li>
                <li>Colloids have intermediate-sized particles.</li>
                <li>Filtration, distillation, crystallisation and chromatography are separation techniques.</li>
            </ul>
        `,
        questions: [
            "Differentiate between homogeneous and heterogeneous mixtures.",
            "Differentiate between solution, suspension and colloid.",
            "Explain distillation.",
            "What is chromatography?",
            "Why is crystallisation used?"
        ],
        quiz: [
            q(
                "A solution is generally a:",
                ["Homogeneous mixture", "Pure element", "Heterogeneous mixture", "Compound only"],
                "Homogeneous mixture"
            ),
            q(
                "Which method can separate substances based on differences in boiling points?",
                ["Filtration", "Distillation", "Sedimentation", "Handpicking"],
                "Distillation"
            ),
            q(
                "Which technique is useful for separating coloured substances?",
                ["Chromatography", "Filtration", "Decantation", "Sieving"],
                "Chromatography"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+science+mixtures+separation+one+shot",
        pdf: ""
    },


    {
        id: "science-atom",
        number: 6,
        title: "Structure of an Atom",
        icon: "⚛️",
        description: "Atomic structure, subatomic particles, isotopes and isobars.",
        notes: `
            <h3>Structure of an Atom - Quick Notes</h3>

            <ul>
                <li>Atoms contain protons, neutrons and electrons.</li>
                <li>Protons have positive charge.</li>
                <li>Electrons have negative charge.</li>
                <li>Neutrons have no charge.</li>
                <li>Atomic number = number of protons.</li>
                <li>Mass number = protons + neutrons.</li>
                <li>Isotopes have the same atomic number but different mass numbers.</li>
                <li>Isobars have the same mass number but different atomic numbers.</li>
            </ul>
        `,
        questions: [
            "Define atomic number and mass number.",
            "Differentiate between isotopes and isobars.",
            "Calculate the number of neutrons when atomic and mass numbers are given.",
            "Explain Bohr's model.",
            "What are valence electrons?"
        ],
        quiz: [
            q(
                "Atomic number is equal to the number of:",
                ["Neutrons", "Protons", "Shells", "Nucleons"],
                "Protons"
            ),
            q(
                "Mass number is equal to:",
                ["Protons + neutrons", "Electrons + neutrons", "Protons - electrons", "Only neutrons"],
                "Protons + neutrons"
            ),
            q(
                "Isotopes have the same:",
                ["Mass number", "Atomic number", "Number of neutrons", "Physical state"],
                "Atomic number"
            ),
            q(
                "Isobars have the same:",
                ["Atomic number", "Mass number", "Number of electrons", "Valency"],
                "Mass number"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+structure+of+atom+one+shot",
        pdf: ""
    },


    {
        id: "science-atoms-molecules",
        number: 7,
        title: "Atoms and Molecules",
        icon: "⚗️",
        description: "Laws of chemical combination, atoms, molecules and formulae.",
        notes: `
            <h3>Atoms and Molecules</h3>
            <ul>
                <li>Law of conservation of mass.</li>
                <li>Law of constant proportions.</li>
                <li>Dalton's atomic theory.</li>
                <li>Molecules are formed by atoms chemically combined.</li>
                <li>Ions may be positively or negatively charged.</li>
                <li>Molecular mass is calculated using atomic masses.</li>
            </ul>
        `,
        questions: [
            "State the law of conservation of mass.",
            "Explain Dalton's atomic theory.",
            "Differentiate between atom and molecule.",
            "What are ions?",
            "Calculate molecular mass of a simple compound."
        ],
        quiz: [
            q(
                "The law stating that mass is neither created nor destroyed in a chemical reaction is:",
                ["Law of conservation of mass", "Law of gravity", "Ohm's law", "Newton's law"],
                "Law of conservation of mass"
            ),
            q(
                "A positively charged ion is called:",
                ["Anion", "Cation", "Atom", "Molecule"],
                "Cation"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+atoms+molecules+one+shot",
        pdf: ""
    },


    {
        id: "science-earth",
        number: 8,
        title: "Earth as a System: Energy, Matter & Life",
        icon: "🌎",
        description: "Earth's interconnected systems, solar energy and cycles.",
        notes: `
            <h3>Earth as a System</h3>
            <ul>
                <li>Earth consists of interconnected spheres.</li>
                <li>Atmosphere contains gases surrounding Earth.</li>
                <li>Hydrosphere includes Earth's water.</li>
                <li>Biosphere includes regions where life exists.</li>
                <li>Solar radiation drives many Earth processes.</li>
                <li>Water, carbon, nitrogen and oxygen move through natural cycles.</li>
            </ul>
        `,
        questions: [
            "Explain the major spheres of Earth.",
            "Why is solar energy important?",
            "Explain the water cycle.",
            "What is the carbon cycle?",
            "How do humans affect Earth's systems?"
        ],
        quiz: [
            q(
                "Which sphere contains Earth's water?",
                ["Hydrosphere", "Atmosphere", "Biosphere", "Geosphere"],
                "Hydrosphere"
            ),
            q(
                "The main source of energy for Earth's surface is:",
                ["Moon", "Sun", "Wind", "Ocean"],
                "Sun"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+earth+as+a+system+one+shot",
        pdf: ""
    },


    {
        id: "science-motion",
        number: 9,
        title: "Motion",
        icon: "🏃",
        description: "Distance, displacement, velocity, acceleration and graphs.",
        notes: `
            <h3>Motion - Formula Sheet</h3>

            <p><b>Speed = Distance / Time</b></p>
            <p><b>Velocity = Displacement / Time</b></p>
            <p><b>Acceleration = Change in velocity / Time</b></p>

            <p>Equations of uniformly accelerated motion:</p>
            <ul>
                <li>v = u + at</li>
                <li>s = ut + ½at²</li>
                <li>v² - u² = 2as</li>
            </ul>
        `,
        questions: [
            "Differentiate distance and displacement.",
            "Differentiate speed and velocity.",
            "Explain acceleration.",
            "Derive the equations of motion.",
            "Interpret a velocity-time graph."
        ],
        quiz: [
            q(
                "The SI unit of velocity is:",
                ["m", "m/s", "m/s²", "km"],
                "m/s"
            ),
            q(
                "Acceleration is the rate of change of:",
                ["Distance", "Velocity", "Mass", "Time"],
                "Velocity"
            ),
            q(
                "If an object travels equal distances in equal intervals of time, its motion is:",
                ["Uniform", "Random", "Circular only", "Impossible"],
                "Uniform"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+motion+one+shot",
        pdf: ""
    },


    {
        id: "science-force",
        number: 10,
        title: "Force and Laws of Motion",
        icon: "💥",
        description: "Force, friction and Newton's laws of motion.",
        notes: `
            <h3>Force and Laws of Motion</h3>

            <ul>
                <li>Force can change the state of motion of an object.</li>
                <li>Balanced forces produce no change in motion when net force is zero.</li>
                <li>Newton's First Law is also related to inertia.</li>
                <li>Newton's Second Law gives F = ma.</li>
                <li>Newton's Third Law describes action and reaction.</li>
                <li>SI unit of force is Newton.</li>
            </ul>
        `,
        questions: [
            "State Newton's three laws of motion.",
            "Explain inertia with examples.",
            "Calculate force using F = ma.",
            "Differentiate balanced and unbalanced forces.",
            "Explain action and reaction."
        ],
        quiz: [
            q(
                "The SI unit of force is:",
                ["Joule", "Newton", "Watt", "Pascal"],
                "Newton"
            ),
            q(
                "According to Newton's second law:",
                ["F = ma", "P = VI", "v = u + at", "W = mg"],
                "F = ma"
            ),
            q(
                "Inertia is related to an object's:",
                ["Mass", "Colour", "Temperature", "Volume only"],
                "Mass"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+force+laws+motion+one+shot",
        pdf: ""
    },


    {
        id: "science-work-energy",
        number: 11,
        title: "Work, Energy and Simple Machines",
        icon: "⚙️",
        description: "Work, kinetic energy, potential energy, power and machines.",
        notes: `
            <h3>Work and Energy</h3>

            <p><b>Work = Force × Displacement</b></p>
            <p><b>Kinetic Energy = ½mv²</b></p>
            <p><b>Potential Energy = mgh</b></p>
            <p><b>Power = Work / Time</b></p>

            <p>Simple machines include levers, pulleys and inclined planes.</p>
        `,
        questions: [
            "Define work in scientific terms.",
            "Derive kinetic energy.",
            "Explain potential energy.",
            "State the law of conservation of energy.",
            "What is mechanical advantage?"
        ],
        quiz: [
            q(
                "The SI unit of work is:",
                ["Newton", "Joule", "Watt", "Metre"],
                "Joule"
            ),
            q(
                "The SI unit of power is:",
                ["Joule", "Watt", "Newton", "Pascal"],
                "Watt"
            ),
            q(
                "Kinetic energy depends on:",
                ["Mass and velocity", "Only mass", "Only height", "Only force"],
                "Mass and velocity"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+work+energy+simple+machines+one+shot",
        pdf: ""
    },


    {
        id: "science-sound",
        number: 12,
        title: "Sound",
        icon: "🔊",
        description: "Production, propagation and characteristics of sound.",
        notes: `
            <h3>Sound - Quick Notes</h3>

            <ul>
                <li>Sound is produced by vibrations.</li>
                <li>Sound needs a medium for propagation.</li>
                <li>Sound generally travels as a longitudinal wave.</li>
                <li>Frequency determines pitch.</li>
                <li>Amplitude is related to loudness.</li>
                <li>Wavelength is the distance between corresponding points of successive waves.</li>
            </ul>
        `,
        questions: [
            "How is sound produced?",
            "Why cannot sound travel through vacuum?",
            "Differentiate frequency and amplitude.",
            "What determines pitch?",
            "Explain longitudinal waves."
        ],
        quiz: [
            q(
                "Sound is produced by:",
                ["Vibrations", "Light", "Gravity", "Magnetism only"],
                "Vibrations"
            ),
            q(
                "Pitch mainly depends on:",
                ["Frequency", "Amplitude", "Speed", "Wavelength only"],
                "Frequency"
            ),
            q(
                "Sound cannot travel through:",
                ["Air", "Water", "Steel", "Vacuum"],
                "Vacuum"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+sound+one+shot",
        pdf: ""
    },


    {
        id: "science-13",
        number: 13,
        title: "Earth and Environment",
        icon: "🌿",
        description: "Earth processes, environment and interconnected natural systems.",
        notes: `
            <h3>Earth and Environment</h3>
            <ul>
                <li>Earth systems are interconnected.</li>
                <li>Atmosphere, hydrosphere, biosphere and geosphere interact continuously.</li>
                <li>Human activities can modify natural systems.</li>
                <li>Understanding Earth systems helps us study environmental changes.</li>
            </ul>
        `,
        questions: [
            "Explain interdependence of Earth's systems.",
            "How do human activities affect the environment?",
            "Explain the importance of natural cycles."
        ],
        quiz: [
            q(
                "Which system includes living organisms?",
                ["Biosphere", "Hydrosphere", "Atmosphere", "Geosphere"],
                "Biosphere"
            ),
            q(
                "Which factor provides most energy to Earth's surface?",
                ["Solar radiation", "Sound", "Friction", "Moonlight"],
                "Solar radiation"
            )
        ],
        video: "https://www.youtube.com/results?search_query=class+9+earth+environment+science+one+shot",
        pdf: ""
    }
];


/* =========================================================
   MATHEMATICS - 2026-27
   ========================================================= */

const mathematicsChapterNames = [
    "Number System",
    "Introduction to Polynomials",
    "Sequences and Progressions",
    "Exploring Algebraic Identities",
    "Linear Equations in Two Variables",
    "Coordinate Geometry",
    "Introduction to Euclid's Geometry: Axioms and Postulates",
    "Lines and Angles",
    "Triangles – Congruence Theorems",
    "4-gons (Quadrilaterals)",
    "Circles",
    "Area and Perimeter",
    "Surface Area and Volume",
    "Statistics",
    "Introduction to Probability"
];

const mathematicsChapters = mathematicsChapterNames.map((title, index) => {

    const id = `math-${index + 1}`;

    return {
        id,
        number: index + 1,
        title,
        icon: "📐",

        description: `Class 9 Mathematics - ${title}`,

        notes: `
            <h3>${title}</h3>

            <p>
                This chapter section is prepared for Class 9 revision.
                Detailed concept notes, solved examples and competency-based
                questions can be added here.
            </p>

            <h4>Study Strategy</h4>
            <ul>
                <li>Understand the concept first.</li>
                <li>Learn important definitions and formulas.</li>
                <li>Solve NCERT-style examples.</li>
                <li>Practice competency-based questions.</li>
                <li>Attempt the chapter quiz after revision.</li>
            </ul>
        `,

        questions: [
            `Explain the main concept of "${title}".`,
            `Write important definitions from "${title}".`,
            `Solve a competency-based problem from "${title}".`,
            `Mention important formulas or results from "${title}".`,
            `Give one real-life application of "${title}".`
        ],

        quiz: [
            q(
                `Which activity is most useful while studying "${title}"?`,
                [
                    "Only reading",
                    "Understanding concepts and practising questions",
                    "Skipping examples",
                    "Memorising without understanding"
                ],
                "Understanding concepts and practising questions"
            ),

            q(
                `For Class 9 Mathematics, a strong preparation strategy is to:`,
                [
                    "Avoid practice",
                    "Practise different types of problems",
                    "Learn only answers",
                    "Skip difficult questions"
                ],
                "Practise different types of problems"
            ),

            q(
                `A mathematical result should ideally be supported by:`,
                [
                    "Random guessing",
                    "Logical reasoning or calculation",
                    "Only handwriting",
                    "No working"
                ],
                "Logical reasoning or calculation"
            )
        ],

        video:
            `https://www.youtube.com/results?search_query=class+9+${encodeURIComponent(title)}+one+shot`,

        pdf: ""
    };
});


/* =========================================================
   SOCIAL SCIENCE
   =========================================================
   The chapter cards below are kept as editable data objects.
   Detailed chapter content can be expanded separately.
   ========================================================= */

const socialScienceChapterNames = [
    "History",
    "Geography",
    "Political Science",
    "Economics"
];

const socialScienceChapters = socialScienceChapterNames.map((title, index) => {

    return {
        id: `social-${index + 1}`,
        number: index + 1,
        title,
        icon: ["🏛️", "🌍", "⚖️", "💰"][index],

        description:
            `Class 9 Social Science - ${title}`,

        notes: `
            <h3>${title}</h3>

            <p>
                This section contains Class 9 Social Science revision material.
                Chapter-specific notes, maps, source-based questions and
                competency questions can be added here.
            </p>

            <h4>Preparation Points</h4>
            <ul>
                <li>Read the chapter carefully.</li>
                <li>Make short revision notes.</li>
                <li>Learn important terms and concepts.</li>
                <li>Practise source/case-based questions.</li>
                <li>Revise important examples and maps wherever applicable.</li>
            </ul>
        `,

        questions: [
            `Explain the important concepts of ${title}.`,
            `Write short notes on important topics from ${title}.`,
            `Answer a competency-based question from ${title}.`,
            `Explain one real-life connection with ${title}.`,
            `Write important terms related to ${title}.`
        ],

        quiz: [
            q(
                `Which approach is useful for studying ${title}?`,
                [
                    "Only memorising answers",
                    "Understanding concepts and practising questions",
                    "Skipping the chapter",
                    "Learning without revision"
                ],
                "Understanding concepts and practising questions"
            ),

            q(
                `Competency-based questions mainly test:`,
                [
                    "Application and understanding",
                    "Only handwriting",
                    "Only spelling",
                    "Only memorisation"
                ],
                "Application and understanding"
            )
        ],

        video:
            `https://www.youtube.com/results?search_query=class+9+${encodeURIComponent(title)}+one+shot`,

        pdf: ""
    };
});


/* =========================================================
   SUBJECT DATA
   ========================================================= */

const subjectsData = {

    science: {
        id: "science",
        name: "Science",
        shortName: "Science",
        icon: "🔬",
        color: "#4f46e5",
        description:
            "Physics, Chemistry, Biology and Earth Science through an integrated approach.",
        chapters: scienceChapters
    },

    mathematics: {
        id: "mathematics",
        name: "Mathematics",
        shortName: "Maths",
        icon: "📐",
        color: "#7c3aed",
        description:
            "Concepts, formulas, examples and competency-based mathematics practice.",
        chapters: mathematicsChapters
    },

    "social-science": {
        id: "social-science",
        name: "Social Science",
        shortName: "SST",
        icon: "🌍",
        color: "#0891b2",
        description:
            "History, Geography, Political Science and Economics.",
        chapters: socialScienceChapters
    }
};


/* =========================================================
   RANDOM QUESTIONS
   ========================================================= */

const randomQuestions = [

    {
        subject: "Science",
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        answer: "Newton"
    },

    {
        subject: "Science",
        question: "What is the SI unit of acceleration?",
        options: ["m/s", "m/s²", "N", "J"],
        answer: "m/s²"
    },

    {
        subject: "Science",
        question: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Chloroplast", "Vacuole"],
        answer: "Mitochondria"
    },

    {
        subject: "Science",
        question: "What is the formula for force?",
        options: ["F = ma", "F = m/a", "F = a/m", "F = mv"],
        answer: "F = ma"
    },

    {
        subject: "Science",
        question: "What is the SI unit of work?",
        options: ["Newton", "Joule", "Watt", "Metre"],
        answer: "Joule"
    },

    {
        subject: "Mathematics",
        question: "What is 5²?",
        options: ["10", "20", "25", "30"],
        answer: "25"
    },

    {
        subject: "Mathematics",
        question: "What is the value of 3 × 7?",
        options: ["18", "21", "24", "27"],
        answer: "21"
    },

    {
        subject: "Mathematics",
        question: "How many coordinates are required to locate a point in a plane?",
        options: ["1", "2", "3", "4"],
        answer: "2"
    },

    {
        subject: "Social Science",
        question: "Which subject studies Earth's physical features?",
        options: ["History", "Geography", "Economics", "Civics"],
        answer: "Geography"
    },

    {
        subject: "Social Science",
        question: "Which subject mainly studies government and political institutions?",
        options: ["Geography", "History", "Political Science", "Economics"],
        answer: "Political Science"
    }

];


/* =========================================================
   MOTIVATION
   ========================================================= */

const motivationQuotes = [

    "Small progress every day creates big results.",
    "Understand the concept, then practise it.",
    "Consistency beats last-minute pressure.",
    "One chapter at a time. Keep going.",
    "Difficult questions make you stronger.",
    "Your mistakes are part of learning.",
    "Study smart, revise regularly.",
    "Focus on progress, not perfection.",
    "Practice today, confidence tomorrow.",
    "Keep learning. Keep improving."
];


/* =========================================================
   DATA ACCESS FUNCTIONS
   ========================================================= */

function getAllSubjects() {
    return Object.values(subjectsData);
}


function getSubject(subjectId) {
    return subjectsData[subjectId] || null;
}


function getChapter(subjectId, chapterId) {

    const subject = getSubject(subjectId);

    if (!subject) {
        return null;
    }

    return subject.chapters.find(
        chapter => chapter.id === chapterId
    ) || null;
}


function getTotalChapterCount() {

    return getAllSubjects().reduce(
        (total, subject) => total + subject.chapters.length,
        0
    );
}


function searchChapters(searchTerm) {

    const term = String(searchTerm || "")
        .trim()
        .toLowerCase();

    if (!term) {
        return [];
    }

    const results = [];

    getAllSubjects().forEach(subject => {

        subject.chapters.forEach(chapter => {

            if (
                chapter.title.toLowerCase().includes(term) ||
                subject.name.toLowerCase().includes(term)
            ) {

                results.push({
                    subjectId: subject.id,
                    subjectName: subject.name,
                    chapter
                });

            }

        });

    });

    return results;
}


function getRandomQuestion() {

    if (!randomQuestions.length) {
        return null;
    }

    const index = Math.floor(
        Math.random() * randomQuestions.length
    );

    return randomQuestions[index];
}


function getRandomMotivation() {

    if (!motivationQuotes.length) {
        return "";
    }

    const index = Math.floor(
        Math.random() * motivationQuotes.length
    );

    return motivationQuotes[index];
}


/* =========================================================
   VALIDATION
   ========================================================= */

function validateStudyData() {

    const errors = [];

    Object.values(subjectsData).forEach(subject => {

        if (!subject.id) {
            errors.push("Subject ID missing.");
        }

        if (!subject.name) {
            errors.push("Subject name missing.");
        }

        if (!Array.isArray(subject.chapters)) {
            errors.push(
                `${subject.name}: chapters must be an array.`
            );
            return;
        }

        subject.chapters.forEach(chapter => {

            if (!chapter.id) {
                errors.push(
                    `${subject.name}: chapter ID missing.`
                );
            }

            if (!chapter.title) {
                errors.push(
                    `${subject.name}: chapter title missing.`
                );
            }

            if (!Array.isArray(chapter.quiz)) {
                errors.push(
                    `${subject.name} > ${chapter.title}: quiz missing.`
                );
            }

        });

    });

    if (errors.length) {

        console.warn(
            "StudySphere data validation errors:",
            errors
        );

        return false;
    }

    console.log(
        "StudySphere data validation passed."
    );

    return true;
}


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

window.STUDYSPHERE_CONFIG = STUDYSPHERE_CONFIG;
window.subjectsData = subjectsData;
window.randomQuestions = randomQuestions;
window.motivationQuotes = motivationQuotes;

window.getAllSubjects = getAllSubjects;
window.getSubject = getSubject;
window.getChapter = getChapter;
window.getTotalChapterCount = getTotalChapterCount;
window.searchChapters = searchChapters;
window.getRandomQuestion = getRandomQuestion;
window.getRandomMotivation = getRandomMotivation;
window.validateStudyData = validateStudyData;


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    validateStudyData();

    console.log(
        "StudySphere Data Loaded",
        {
            subjects: getAllSubjects().length,
            chapters: getTotalChapterCount(),
            session: STUDYSPHERE_CONFIG.session
        }
    );

});