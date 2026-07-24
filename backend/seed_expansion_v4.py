"""Iteration 11 expansion (Feb 2026): more scientists/inventors/figures, places, and a long-form story.

Schema must match seed_figures.FIGURES, seed_expansion_v2.EXTRA_PLACES, and seed_data.STORIES.
"""

# Hand-picked default portraits/imagery already used elsewhere in the codebase
_IMG_FIGURE_A = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/cd856dce9d4cf5c71b306fa79ba1420d7d918092d25fc78b85217b73ddb7e2bc.png"
_IMG_FIGURE_B = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/3327733600bbae48c70dda8cc40686aada47907623da33062f2518a29af57ec5.png"
_IMG_FIGURE_C = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80"


# ===== NEW FIGURES (scientists / inventors / intellectuals / civil rights / artists) =====
EXTRA_FIGURES_V4 = [
    # --- Scientists ---
    {
        "id": "katherine-johnson", "name": "Katherine Johnson", "category": "scientists",
        "era": "1918–2020", "region": "United States", "lifespan": "1918–2020",
        "summary": "NASA mathematician whose orbital calculations made the first U.S. crewed spaceflights possible — including John Glenn's 1962 orbital mission and the Apollo 11 lunar landing.",
        "story": "Glenn personally requested that Johnson verify the IBM 7090's trajectory calculations before launch: 'If she says they're good, then I'm ready to go.' She co-authored the first NASA technical report by a woman (1960) and produced trajectory work for Apollo 11 and the Space Shuttle program.",
        "legacy": "Presidential Medal of Freedom (2015); the subject of Margot Lee Shetterly's 'Hidden Figures' (2016). NASA renamed its Independent Verification & Validation Facility for her.",
        "image_url": _IMG_FIGURE_A,
        "sources": ["Margot Lee Shetterly, 'Hidden Figures' (2016)", "NASA Technical Reports Server"],
    },
    {
        "id": "dorothy-vaughan", "name": "Dorothy Vaughan", "category": "scientists",
        "era": "1910–2008", "region": "United States", "lifespan": "1910–2008",
        "summary": "NASA's first Black supervisor — a self-taught FORTRAN expert who led the West Area Computing Unit and ensured Black women mathematicians had a path into the new computing era.",
        "story": "Promoted to head of West Computing in 1949, she anticipated that mechanical computers would replace human ones and taught herself and her staff FORTRAN before the transition. She placed her unit at the heart of NASA's Analysis & Computation Division.",
        "legacy": "Recipient (posthumous) of the Congressional Gold Medal in 2019; co-protagonist of 'Hidden Figures'.",
        "image_url": _IMG_FIGURE_A,
        "sources": ["Margot Lee Shetterly, 'Hidden Figures' (2016)"],
    },
    {
        "id": "thomas-mensah", "name": "Thomas Mensah", "category": "scientists",
        "era": "1950–2024", "region": "Ghana / United States",
        "summary": "Chemical engineer and pioneer of fiber-optic manufacturing whose patents — many filed at Corning Glass Works and AT&T Bell Labs — underpin modern long-distance telecommunications.",
        "story": "Holder of 14 patents (7 filed within 6 years of beginning fiber-optics work at Corning), Mensah led the team that scaled fiber-optic cable production speeds by a factor of fifty. He later worked on nanotechnology and superconductors.",
        "legacy": "Inducted into the U.S. National Academy of Inventors (2015). His memoir 'The Right Stuff Comes in Black, Too' (2007) is a touchstone of African STEM biography.",
        "image_url": _IMG_FIGURE_B,
        "sources": ["U.S. Patent and Trademark Office archives", "National Academy of Inventors"],
    },
    {
        "id": "ahmed-zewail", "name": "Ahmed Zewail", "category": "scientists",
        "era": "1946–2016", "region": "Egypt / United States", "lifespan": "1946–2016",
        "summary": "Egyptian-American chemist who won the 1999 Nobel Prize in Chemistry for inventing femtochemistry — the use of ultra-short laser pulses to film chemical reactions in real time.",
        "story": "Born in Damanhur in the Nile Delta, Zewail emigrated to the U.S. for graduate work and built his career at Caltech. His femtosecond spectroscopy let chemists watch atoms move during the breaking and forming of bonds — a 10⁻¹⁵-second timescale once thought unobservable.",
        "legacy": "Egypt's first Nobel laureate in a science discipline. Founded Zewail City of Science and Technology in Cairo (opened 2013) to seed a research culture in Egypt.",
        "image_url": _IMG_FIGURE_B,
        "sources": ["The Nobel Prize in Chemistry 1999 — official lecture", "Ahmed Zewail, 'Voyage Through Time' (2002)"],
    },

    # --- Inventors ---
    {
        "id": "lewis-latimer", "name": "Lewis Latimer", "category": "inventors",
        "era": "1848–1928", "region": "United States",
        "summary": "Draughtsman, inventor, and member of the Edison Pioneers who developed the carbon filament that made the incandescent light bulb commercially viable.",
        "story": "Son of a self-emancipated couple from Virginia, Latimer drafted the patent drawings for Alexander Graham Bell's telephone (1876). He patented an improved carbon filament for incandescent lamps in 1881 and supervised the installation of public electric lighting in New York, Philadelphia, Montreal, and London.",
        "legacy": "Among the first Black inventors elected to the Edison Pioneers. The Latimer-Norman House in Flushing, Queens, is a New York City landmark.",
        "image_url": _IMG_FIGURE_A,
        "sources": ["Bayyinah S. Jeffries, 'Lewis Howard Latimer' (2013)", "U.S. Patent 252,386"],
    },
    {
        "id": "garrett-morgan", "name": "Garrett Morgan", "category": "inventors",
        "era": "1877–1963", "region": "United States",
        "summary": "Inventor of an early three-position traffic signal (1923) and of a 'safety hood' breathing apparatus that became the prototype for the gas mask.",
        "story": "His safety hood saved the lives of trapped workers in the 1916 Cleveland Waterworks tunnel explosion — Morgan himself entered the smoke-filled tunnel to rescue them. He sold the rights to the traffic signal to General Electric for $40,000 in 1923.",
        "legacy": "U.S. Patents 1,090,936 (safety hood, 1914) and 1,475,024 (traffic signal, 1923). Both designs became infrastructural standards.",
        "image_url": _IMG_FIGURE_A,
        "sources": ["U.S. Patent and Trademark Office records", "Lisa Yount, 'Black Scientists' (1991)"],
    },
    {
        "id": "philip-emeagwali", "name": "Philip Emeagwali", "category": "inventors",
        "era": "1954–", "region": "Nigeria / United States",
        "summary": "Nigerian computer scientist whose 1989 Connection Machine calculation — 3.1 billion operations per second on a 65,536-processor system — won the Gordon Bell Prize and showcased massively parallel computing for oil-reservoir modelling.",
        "story": "Emeagwali emigrated from Onitsha to the U.S. on a scholarship in 1974. His parallel-computing demonstration was performed remotely on the Connection Machine at Los Alamos, modelling petroleum-reservoir flow at then-record speed.",
        "legacy": "Gordon Bell Prize (1989, IEEE). His work is cited as an early proof that parallel architectures could outperform vector supercomputers on real engineering problems.",
        "image_url": _IMG_FIGURE_B,
        "sources": ["IEEE Computer Society Gordon Bell Prize 1989 citation"],
    },

    # --- Intellectuals / writers ---
    {
        "id": "wole-soyinka", "name": "Wole Soyinka", "category": "intellectuals",
        "era": "1934–", "region": "Nigeria",
        "summary": "Yoruba playwright, poet, and essayist who became the first African to win the Nobel Prize in Literature (1986).",
        "story": "Educated at Ibadan and Leeds, Soyinka founded the 1960 Masks theatre company and produced 'A Dance of the Forests' for Nigerian independence. Imprisoned 22 months in solitary during the Biafran War, he wrote 'The Man Died' (1972) on toilet paper using a ballpoint refill.",
        "legacy": "Nobel Prize in Literature (1986). Founder figure of postcolonial African theatre; his essays remain core in world-literature curricula.",
        "image_url": _IMG_FIGURE_C,
        "sources": ["Wole Soyinka, 'Aké: The Years of Childhood' (1981)", "The Nobel Prize in Literature 1986 — official biography"],
    },

    # --- Civil rights ---
    {
        "id": "fannie-lou-hamer", "name": "Fannie Lou Hamer", "category": "civil_rights",
        "era": "1917–1977", "region": "United States (Mississippi)", "lifespan": "1917–1977",
        "summary": "Sharecropper-turned-organizer whose testimony at the 1964 Democratic National Convention forced national reckoning with disenfranchisement in the Jim Crow South.",
        "story": "Co-founder of the Mississippi Freedom Democratic Party. Her DNC testimony — broadcast live until President Johnson called a counter-press conference to pull TV cameras away — was rebroadcast that night in prime time. 'I am sick and tired of being sick and tired.' She survived the 1963 Winona jail beating that left her with permanent kidney damage.",
        "legacy": "Architect of voter-registration strategy in the Mississippi Delta; her 1971 founding of the Freedom Farm Cooperative pioneered Black land cooperatives.",
        "image_url": _IMG_FIGURE_A,
        "sources": ["Kay Mills, 'This Little Light of Mine' (1993)", "Library of Congress, Civil Rights History Project"],
    },

    # --- Athletes ---
    {
        "id": "abebe-bikila", "name": "Abebe Bikila", "category": "athletes",
        "era": "1932–1973", "region": "Ethiopia", "lifespan": "1932–1973",
        "summary": "Imperial Bodyguard soldier who ran the 1960 Rome Olympic marathon barefoot, winning in a world-record 2:15:16 — the first Black African to win a gold medal at an Olympics.",
        "story": "Bikila was a last-minute replacement on Ethiopia's marathon team. Adidas had no shoes that fit, so he ran the Appian Way without shoes, finishing past the Obelisk of Axum — taken from Ethiopia by Italy in 1937. He defended his title in Tokyo 1964 (in shoes), 40 days after an appendectomy.",
        "legacy": "Two consecutive Olympic marathon golds — the first runner ever to do so. A 1969 car accident left him paraplegic; he competed in archery and sled-dog racing at the 1970 Norway Paralympics.",
        "image_url": _IMG_FIGURE_C,
        "sources": ["Tim Judah, 'Bikila: Ethiopia's Barefoot Olympian' (2008)", "International Olympic Committee — Athlete Profile"],
    },
]


# Figure → civilization linkage (for the in-app figure↔civilization cross-links)
EXTRA_FIGURE_CIVS_V4 = {
    "ahmed-zewail": "egypt",
    "abebe-bikila": "ethiopia",
    # Diaspora/U.S. figures don't map to an African civilization; leave unset.
}


# Wikipedia titles (used by Atlas to deep-link to source articles)
EXTRA_FIGURE_WIKI_V4 = {
    "katherine-johnson": "Katherine Johnson",
    "dorothy-vaughan": "Dorothy Vaughan",
    "thomas-mensah": "Thomas Mensah",
    "ahmed-zewail": "Ahmed Zewail",
    "lewis-latimer": "Lewis Howard Latimer",
    "garrett-morgan": "Garrett Morgan",
    "philip-emeagwali": "Philip Emeagwali",
    "wole-soyinka": "Wole Soyinka",
    "fannie-lou-hamer": "Fannie Lou Hamer",
    "abebe-bikila": "Abebe Bikila",
}


# ===== NEW PLACES (sites of science, resistance, and memory) =====
EXTRA_PLACES_V4 = [
    {
        "id": "zewail-city", "name": "Zewail City of Science and Technology",
        "type": "site", "coords": [29.9930, 30.9333], "era": "2013 — present",
        "blurb": "Independent research university founded by Nobel laureate Ahmed Zewail on the outskirts of Cairo — a deliberate attempt to seed an Arab–African scientific commons.",
        "story": "Zewail conceived the City in 1999 around the principles of free inquiry and bench-to-market translation. The first cohort of 290 undergraduates enrolled in 2013. Today it hosts the Helmy Institute for Medical Sciences and Egypt's first dedicated nanotechnology centre.",
        "sources": ["Zewail City of Science and Technology — institutional charter"],
    },
    {
        "id": "ile-de-goree", "name": "Île de Gorée (Maison des Esclaves)",
        "type": "site", "coords": [14.6669, -17.3989], "era": "15th–19th c.",
        "blurb": "Small island off Dakar that served, with Saint-Louis, as a hub of European-controlled trade on the Senegambian coast — including the Atlantic slave trade. UNESCO World Heritage since 1978.",
        "story": "The Maison des Esclaves (1776) and its 'Door of No Return' have become a global pilgrimage site for the descendants of the enslaved. Historians (Ralph Austen, Abdoulaye Camara) emphasize that Gorée's actual volume in the slave trade was smaller than the symbol it now carries — and that the symbol matters precisely because it concentrates a continental memory in one threshold.",
        "sources": ["UNESCO World Heritage Centre — Island of Gorée", "Ralph Austen, 'The Slave Trade as History and Memory' (2001)"],
    },
    {
        "id": "kilwa", "name": "Kilwa Kisiwani",
        "type": "city", "coords": [-8.9577, 39.5040], "era": "9th–19th c.",
        "blurb": "The greatest of the medieval Swahili coral-stone city-states, on an island off southern Tanzania — UNESCO World Heritage, partly because of the Great Mosque and the Husuni Kubwa palace.",
        "story": "Ibn Battuta visited in 1331 and called it 'one of the most beautiful and well-constructed towns in the world'. Kilwa controlled the Sofala gold trade with Great Zimbabwe in the 13th–15th centuries. Portuguese sack in 1505 began its decline.",
        "sources": ["UNESCO World Heritage Centre — Ruins of Kilwa Kisiwani and Songo Mnara", "Ibn Battuta, Rihla"],
    },
    {
        "id": "tuskegee", "name": "Tuskegee Institute",
        "type": "site", "coords": [32.4304, -85.7072], "era": "1881 — present",
        "blurb": "Historically Black university founded by Booker T. Washington in Alabama — birthplace of George Washington Carver's agricultural research and of the Tuskegee Airmen training program (1941).",
        "story": "Carver developed crop-rotation systems and over 300 industrial uses for the peanut, transforming Southern agriculture. During WWII, the 332nd Fighter Group ('Red Tails') trained here; they flew over 15,000 sorties without losing a single bomber to enemy aircraft on certain escort missions, breaking the U.S. military's racial-integration logjam.",
        "sources": ["Tuskegee University Archives", "Daniel L. Haulman, 'The Tuskegee Airmen' (2011)"],
    },
]


# ===== NEW LONG-FORM STORY =====
EXTRA_STORIES_V4 = [
    {
        "id": "hidden-figures-of-nasa",
        "title": "The Hidden Figures of NASA",
        "civilization_id": None,
        "era": "1943–1972",
        "summary": "How a segregated typing pool of Black women mathematicians at Langley Research Center became indispensable to America's space program — and what their archive teaches about the politics of expertise.",
        "chapters": [
            {"heading": "West Computing", "body": "Wartime labor shortage forced the National Advisory Committee for Aeronautics (NACA) — NASA's predecessor — to hire women as 'human computers' from 1935 onwards. A 1941 executive order banning racial discrimination in federal hiring brought the first Black women into the workforce; under Virginia segregation laws, they were assigned to a separate unit at Langley known as West Computing. Dorothy Vaughan became its supervisor in 1949."},
            {"heading": "Trajectories", "body": "When NACA was reorganised into NASA in 1958, the human computers were absorbed into the new agency. Katherine Johnson was assigned to the Flight Research Division. Her calculations — Euler angles, geodetic-coordinate transformations, Earth-orbital insertion — were embedded in the trajectories of Mercury, Gemini, and Apollo. John Glenn famously asked her to verify the IBM 7090's numbers before his 1962 orbit: 'If she says they're good, then I'm ready to go.'"},
            {"heading": "The Transition to Machines", "body": "Vaughan saw electronic computers coming and taught herself and her staff FORTRAN before the agency's transition. Mary Jackson — who had to petition a Virginia court for permission to attend all-white evening classes — became NASA's first Black female engineer in 1958. Together they built a pipeline that survived the demise of the human-computer role."},
            {"heading": "Erasure and Recovery", "body": "Until the 2010s their names were almost absent from public NASA histories. Margot Lee Shetterly's 'Hidden Figures' (2016) and the 2017 film recovered them. Katherine Johnson received the Presidential Medal of Freedom in 2015; the Independent Verification & Validation Facility was renamed for her in 2019; Congressional Gold Medals were awarded in 2019. The recovery is also a critique of how institutional history is written."},
        ],
        "sources": [
            "Margot Lee Shetterly, 'Hidden Figures' (2016)",
            "NASA History Office, 'When the Computer Wore a Skirt' (oral histories)",
            "U.S. National Archives — NACA / NASA Langley personnel records",
        ],
    },
]
