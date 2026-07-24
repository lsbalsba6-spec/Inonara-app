"""Iteration 12 expansion: architects + contemporary scientists.

Schema matches seed_figures.FIGURES.
"""

_IMG_A = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/cd856dce9d4cf5c71b306fa79ba1420d7d918092d25fc78b85217b73ddb7e2bc.png"
_IMG_B = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/3327733600bbae48c70dda8cc40686aada47907623da33062f2518a29af57ec5.png"
_IMG_C = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80"


EXTRA_FIGURES_V5 = [
    # --- Architects ---
    {
        "id": "david-adjaye", "name": "Sir David Adjaye", "category": "intellectuals",
        "era": "1966–", "region": "Ghana / United Kingdom",
        "summary": "Ghanaian-British architect whose Smithsonian National Museum of African American History and Culture (NMAAHC, 2016) reshaped the cultural-institution language of the United States.",
        "story": "Born in Dar es Salaam to Ghanaian diplomats, Adjaye founded Adjaye Associates in 2000. The three-tiered bronze corona of the NMAAHC was inspired by Yoruba caryatid columns and the Washington Monument's geometry — an explicit conversation between African and American architectural memory. Knighted in 2017.",
        "legacy": "Royal Gold Medal of the Royal Institute of British Architects (2021). Major works: Moscow School of Management Skolkovo, Sugar Hill (Harlem), the National Cathedral of Ghana (Accra, in progress).",
        "image_url": _IMG_B,
        "sources": ["Royal Institute of British Architects — Royal Gold Medal 2021 citation", "Smithsonian NMAAHC architectural brief"],
    },
    {
        "id": "francis-kere", "name": "Diébédo Francis Kéré", "category": "intellectuals",
        "era": "1965–", "region": "Burkina Faso / Germany",
        "summary": "First African architect to win the Pritzker Prize (2022) — celebrated for clay-and-eucalyptus structures that synthesize traditional Mossi building knowledge with modern engineering.",
        "story": "Born in Gando, a village without electricity or running water, Kéré won a scholarship to Berlin and returned to design Gando Primary School (2001) using locally-fired clay bricks and a passively-ventilated double roof — a radical departure from corrugated-iron classrooms. Subsequent works include Lycée Schorge, the Sarbalé Ke pavilion (Coachella 2019), and the Serpentine Pavilion (London, 2017).",
        "legacy": "Pritzker Prize (2022). His office in Berlin and Ouagadougou continues to win commissions across Africa, Europe, and the United States.",
        "image_url": _IMG_C,
        "sources": ["The Pritzker Architecture Prize 2022 — official citation"],
    },
    {
        "id": "lesley-lokko", "name": "Lesley Lokko", "category": "intellectuals",
        "era": "1964–", "region": "Ghana / Scotland",
        "summary": "Ghanaian-Scottish architect, novelist, and curator of the 18th International Architecture Exhibition of La Biennale di Venezia (2023) — the first such Biennale curated by an African woman.",
        "story": "Founder of the African Futures Institute in Accra (2020). Her Biennale, titled 'The Laboratory of the Future', centred African and African-diaspora practitioners and won the Golden Lion for best participation.",
        "legacy": "RIBA Royal Gold Medal (2024). Her novels (including 'Sundowners') are widely read; her academic work has reshaped architectural pedagogy in the UK, US, and South Africa.",
        "image_url": _IMG_C,
        "sources": ["La Biennale di Venezia — Mostra Internazionale di Architettura 2023 catalogue", "Royal Institute of British Architects — Royal Gold Medal 2024 citation"],
    },

    # --- Contemporary scientists ---
    {
        "id": "tebello-nyokong", "name": "Tebello Nyokong", "category": "scientists",
        "era": "1951–", "region": "Lesotho / South Africa",
        "summary": "Lesotho-born chemist at Rhodes University whose work on photodynamic therapy uses dye-and-light combinations to kill cancer cells without the systemic toxicity of conventional chemotherapy.",
        "story": "Trained at the National University of Lesotho, McMaster, and the University of Western Ontario, Nyokong holds the South African Research Chair in Medicinal Chemistry and Nanotechnology. Her group has published over 600 peer-reviewed papers on phthalocyanines and their photochemistry.",
        "legacy": "L'Oréal-UNESCO For Women in Science Laureate (2009). Order of Mapungubwe (South Africa). Member of the South African National Academy of Sciences.",
        "image_url": _IMG_A,
        "sources": ["L'Oréal-UNESCO For Women in Science — 2009 Laureates", "Rhodes University — Medicinal Chemistry research outputs"],
    },
    {
        "id": "hadiyah-nicole-green", "name": "Hadiyah-Nicole Green", "category": "scientists",
        "era": "1981–", "region": "United States",
        "summary": "Medical physicist developing laser-activated nanoparticle therapy that selectively targets and kills cancer tumors in mice — work funded by a $1.1M U.S. Veterans Affairs grant in 2016.",
        "story": "Orphaned at four and raised by relatives in St. Louis, Green earned her PhD in physics at the University of Alabama at Birmingham. Her nanoparticles bind to cancer-cell-specific antibodies; when illuminated by an infrared laser, they heat just enough to destroy tumor tissue while sparing healthy cells.",
        "legacy": "Founder of the Ora Lee Smith Cancer Research Foundation. The technology entered human-trial preparation in the early 2020s.",
        "image_url": _IMG_A,
        "sources": ["U.S. Department of Veterans Affairs — Research grant announcements", "PNAS — Targeted nanoparticle phototherapy reports"],
    },
    {
        "id": "mona-nemer", "name": "Mona Nemer", "category": "scientists",
        "era": "1957–", "region": "Lebanon / Canada",
        "summary": "Lebanese-Canadian molecular biologist who has served as Chief Science Advisor of Canada since 2017 — the country's senior scientific voice during the COVID-19 pandemic.",
        "story": "Nemer's lab at the University of Ottawa identified key transcription factors controlling heart development. As Chief Science Advisor she has shaped Canadian policy on open science, AI governance, and pandemic preparedness.",
        "legacy": "Officer of the Order of Canada (2015), Knight of the French Légion d'Honneur (2017). Multiple honorary doctorates across three continents.",
        "image_url": _IMG_B,
        "sources": ["Office of the Chief Science Advisor of Canada — biography", "Order of Canada — citation 2015"],
    },
    {
        "id": "mark-dean", "name": "Mark Dean", "category": "inventors",
        "era": "1957–", "region": "United States",
        "summary": "American computer engineer who led the team developing the IBM PC AT and co-invented the ISA bus — the foundation of the personal-computer industry. Holder of three of IBM's nine original PC patents.",
        "story": "Dean rose to be IBM Fellow (the company's highest technical honor) and Vice President of Performance for the RS/6000. He led the team that built the first one-gigahertz processor.",
        "legacy": "Inducted into the U.S. National Inventors Hall of Fame (1997). Among the first Black engineers honored at the founding-architect level of the PC industry.",
        "image_url": _IMG_A,
        "sources": ["U.S. National Inventors Hall of Fame — Mark Dean induction", "IBM Archives — Mark Dean biography"],
    },
    {
        "id": "lonnie-johnson", "name": "Lonnie Johnson", "category": "inventors",
        "era": "1949–", "region": "United States",
        "summary": "U.S. Air Force engineer and NASA alumnus who invented the Super Soaker water gun (1990) — sales of which funded a portfolio of clean-energy patents on lithium-ion batteries and thermo-electric generators.",
        "story": "Johnson worked on the stealth-bomber program and the Galileo Jupiter mission at the Jet Propulsion Laboratory. The Super Soaker emerged from a side project on heat-pump design. He now leads Johnson Energy Storage and Johnson Thermo-Electrochemical Converter Systems.",
        "legacy": "Holder of more than 100 patents. Inducted into the National Inventors Hall of Fame (2024).",
        "image_url": _IMG_A,
        "sources": ["U.S. Patent and Trademark Office — Lonnie Johnson portfolio", "National Inventors Hall of Fame — 2024 inductees"],
    },
]


EXTRA_FIGURE_CIVS_V5 = {
    # All v5 figures are modern; none map to a pre-modern civilization id.
}


EXTRA_FIGURE_WIKI_V5 = {
    "david-adjaye": "David Adjaye",
    "francis-kere": "Francis Kéré",
    "lesley-lokko": "Lesley Lokko",
    "tebello-nyokong": "Tebello Nyokong",
    "hadiyah-nicole-green": "Hadiyah-Nicole Green",
    "mona-nemer": "Mona Nemer",
    "mark-dean": "Mark Dean (computer scientist)",
    "lonnie-johnson": "Lonnie Johnson (inventor)",
}
