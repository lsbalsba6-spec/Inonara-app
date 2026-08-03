"""Iteration 15 — 'Vérités Cachées' expansion based on the two AfroAtlas inventory PDFs.

Implements EVERYTHING in Part 2 of both documents:
  • Forgotten civilizations / decentralized societies
  • Diaspora beyond the Atlantic (Indian Ocean, Asia, Spanish America)
  • Shadow-hero figures (scientists, scholars, non-military resistance, maritime pioneers)
  • Indigenous peoples & knowledge (San, Khoikhoi, Pygmies, metallurgy, mathematics)
  • Country-by-country 'hidden truths' (Mexico, Argentina, India/Pakistan, Iraq, Spain, France)
  • Precolonial writing systems (Nsibidi, Vai, Ge'ez, Meroitic, Ajami)
  • Precolonial sciences (Haya steel, fractals, Mancala-as-algorithm, Ugandan cesareans,
    Onesimus / variolation, Nabta Playa, Dogon cosmogony)
"""

_IMG_A = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/cd856dce9d4cf5c71b306fa79ba1420d7d918092d25fc78b85217b73ddb7e2bc.png"
_IMG_B = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/3327733600bbae48c70dda8cc40686aada47907623da33062f2518a29af57ec5.png"
_IMG_C = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80"
_IMG_LAND = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80"


# ===== FORGOTTEN CIVILIZATIONS =====
EXTRA_CIVILIZATIONS_V7 = [
    {
        "id": "dhar-tichitt", "name": "Dhar Tichitt",
        "region": "West Africa", "modern_locations": ["Mauritania"],
        "era_start": -2000, "era_end": -300,
        "coords": [18.4500, -9.5000],
        "summary": "One of the oldest stone-built urban civilizations in West Africa — predating Ghana by over two millennia. A network of dry-stone walled towns on the southern edge of the Sahara, built by Soninké ancestors.",
        "political_structure": "Confederation of fortified hilltop towns (notably Dhar Tichitt, Dhar Nema, Dhar Walata) with shared material culture and ritual practices. Likely lineage-based councils rather than centralized monarchy.",
        "economy_and_trade": "Pearl-millet agriculture (one of the earliest cereal domestications in West Africa), pastoralism, copper-working, and trans-Saharan exchange with the Maghreb.",
        "science_and_knowledge": "Sophisticated dry-stone masonry without mortar, granary architecture, early West African ceramics with geometric motifs that recur 3,000 years later in Soninké material culture.",
        "art_and_culture": "Rock engravings depicting cattle, giraffes, and human figures — testifying to a once-green Sahara within human memory.",
        "key_figures": [{"name": "Anonymous Soninké ancestors", "role": "Builders of the dry-stone urban tradition"}],
        "timeline": [
            "c. 2000 BCE — earliest sedentary villages in the Dhar",
            "c. 1500 BCE — full network of stone towns",
            "c. 300 BCE — climatic desiccation ends the civilization",
        ],
        "image_url": _IMG_C,
        "sources": [
            "Augustin Holl, 'The Dhar Tichitt Tradition' (2009)",
            "Kevin MacDonald & Roderick McIntosh, 'West African Archaeology' (various)",
        ],
    },
    {
        "id": "ijebu-eredo", "name": "Ijebu Kingdom (Sungbo's Eredo)",
        "region": "West Africa", "modern_locations": ["Nigeria"],
        "era_start": 800, "era_end": 1892,
        "coords": [6.8200, 3.9170],
        "summary": "The Yoruba kingdom of Ijebu built Sungbo's Eredo — a 160 km earthwork of bank-and-ditch fortifications enclosing roughly 1,400 km², longer than the Great Wall of China and the largest single pre-modern monument in Africa.",
        "political_structure": "Centralized kingdom of the Ijebu, a Yoruba sub-group; the Awujale ruled from Ijebu-Ode. The Eredo encircled a vast capital district.",
        "economy_and_trade": "Cloth weaving (Ijebu cloth was a major regional currency), kola-nut and palm-oil trade, control of routes between the Atlantic coast and Yorubaland.",
        "science_and_knowledge": "Earthwork engineering on a sub-continental scale: archaeological estimates suggest 3.5 million person-days of labour, organized over a single dynastic project (10th–11th c.).",
        "art_and_culture": "Yoruba beadwork, drumming traditions, and Ifá divination; the legendary builder Bilikisu Sungbo is locally identified with the biblical Queen of Sheba.",
        "key_figures": [
            {"name": "Bilikisu Sungbo", "role": "Legendary founder (10th–11th c.)"},
            {"name": "Awujale of Ijebu", "role": "Title of the Ijebu monarch"},
        ],
        "timeline": [
            "c. 10th–11th c. — construction of Sungbo's Eredo",
            "1892 — British conquest of Ijebu-Ode",
            "1999 — Patrick Darling's archaeology brings global attention",
        ],
        "image_url": _IMG_C,
        "sources": [
            "Patrick Darling, 'Sungbo's Eredo, Southern Nigeria' (1997)",
            "Akin Ogundiran, 'The Yoruba: A New History' (2020)",
        ],
    },
    {
        "id": "rwanda-kingdom", "name": "Kingdom of Rwanda",
        "region": "East Africa", "modern_locations": ["Rwanda"],
        "era_start": 1081, "era_end": 1961,
        "coords": [-1.9441, 30.0619],
        "summary": "A highly centralized pre-colonial monarchy of the Great Lakes — with elaborate court rituals, an iron-working economy, and a written-like oral chronicle (the 'ibitéekerezo') that preserved nine centuries of dynastic history.",
        "political_structure": "Sacred kingship (mwami) ruling through three parallel administrative hierarchies — cattle chiefs, land chiefs, and army chiefs — designed to prevent power concentration.",
        "economy_and_trade": "Cattle-pastoralism (the inka system), banana cultivation, ironworking at Buhanga and elsewhere, regional trade with Burundi and Buganda.",
        "science_and_knowledge": "Cosmological calendar tied to bovine cycles; ubwiru ritual code memorized verbatim across generations; precolonial steel produced in high-temperature furnaces (forerunner of the Haya technology to the south).",
        "art_and_culture": "Intore warrior dance, imigongo cow-dung geometric painting, royal drums (kalinga) as material embodiment of dynastic continuity.",
        "key_figures": [
            {"name": "Mwami Ruganzu II Ndori", "role": "17th-century territorial expansion"},
            {"name": "Mwami Yuhi V Musinga", "role": "Reign during the German and Belgian colonial impositions"},
            {"name": "Mwami Mutara III Rudahigwa", "role": "Last reigning mwami (r. 1931–1959)"},
        ],
        "timeline": [
            "c. 1081 — traditional foundation by Gihanga",
            "17th–19th c. — territorial expansion to current borders",
            "1899 — German colonial protectorate imposed",
            "1959–1961 — abolition of the monarchy",
        ],
        "image_url": _IMG_LAND,
        "sources": [
            "Jan Vansina, 'Antecedents to Modern Rwanda' (2004)",
            "Alexis Kagame, 'Un abrégé de l'ethno-histoire du Rwanda' (1972)",
        ],
    },
    {
        "id": "luba-empire", "name": "Luba Empire",
        "region": "Central Africa", "modern_locations": ["Democratic Republic of the Congo"],
        "era_start": 1585, "era_end": 1889,
        "coords": [-7.2700, 25.0000],
        "summary": "One of the great pre-colonial states of Central Africa — based in the Upemba Depression of present-day Katanga (DRC), with a sophisticated political theology, mnemonic boards (lukasa) used as portable archives, and far-reaching trade networks.",
        "political_structure": "Sacred kingship (mulopwe) supported by a council of dignitaries (bambudye) initiated into the mnemonic guild. Power legitimated through ancestor cult and the lukasa memory boards.",
        "economy_and_trade": "Iron and copper metallurgy (the famous Katanga copper crosses served as currency across Central Africa), ivory, salt, and palm oil.",
        "science_and_knowledge": "The lukasa — a wooden plank inlaid with beads and pins — functioned as a mnemonic device encoding genealogies, geographies, and legal precedent, read by initiated bambudye specialists. A genuine indigenous information technology.",
        "art_and_culture": "Royal stools, kifwebe masks, and the visual grammar of Luba sculpture (one of the canonical traditions in African art history).",
        "key_figures": [
            {"name": "Mulopwe Kongolo Mwamba", "role": "Founder of the Luba state (c. 1585)"},
            {"name": "Mulopwe Ilunga Sungu", "role": "Consolidator of Luba sacred kingship"},
        ],
        "timeline": [
            "c. 1585 — foundation by Kongolo Mwamba",
            "17th–18th c. — territorial peak",
            "1889 — collapse under Swahili-Arab slaving raids and Belgian colonization",
        ],
        "image_url": _IMG_LAND,
        "sources": [
            "Mary Nooter Roberts & Allen Roberts, 'Memory: Luba Art and the Making of History' (1996)",
            "Thomas Q. Reefe, 'The Rainbow and the Kings' (1981)",
        ],
    },
    {
        "id": "lunda-empire", "name": "Lunda Empire",
        "region": "Central Africa", "modern_locations": ["Democratic Republic of the Congo", "Angola", "Zambia"],
        "era_start": 1665, "era_end": 1887,
        "coords": [-9.4500, 23.0833],
        "summary": "A sprawling Central African empire of trade and tributary politics that controlled the upper Kasai and Zambezi basins, exporting copper, slaves, and ivory across both Atlantic and Indian Ocean networks.",
        "political_structure": "The Mwaant Yaav ('Lord of Vipers') ruled through positional succession and perpetual kinship — an institution that allowed dignitaries' titles to outlive any individual occupant, creating administrative continuity rare in pre-modern states.",
        "economy_and_trade": "Long-distance caravan trade: copper crosses, salt, and ivory toward Luanda and the Atlantic; slaves and ivory toward the Indian Ocean via the Yao and the Swahili coast.",
        "science_and_knowledge": "Positional succession (a single name passes down a chain of office-holders, each inheriting the kin relationships of the original) is studied today by political scientists as a remarkable solution to dynastic instability.",
        "art_and_culture": "Lunda dance and ritual music, royal mask traditions, ironwork and copperwork.",
        "key_figures": [
            {"name": "Mwaant Yaav Mwaaku", "role": "Founder (c. 1665)"},
            {"name": "Mwaant Yaav Naweej II", "role": "Imperial expansion in the 18th century"},
        ],
        "timeline": [
            "c. 1665 — foundation under Mwaant Yaav Mwaaku",
            "18th c. — territorial peak from the Kasai to the upper Zambezi",
            "1887 — Belgian and Portuguese partition",
        ],
        "image_url": _IMG_LAND,
        "sources": [
            "Joseph C. Miller, 'Way of Death: Merchant Capitalism and the Angolan Slave Trade' (1988)",
            "Jeffrey Hoover, 'The Seduction of Ruwej' (1978)",
        ],
    },
]


# ===== SHADOW-HERO FIGURES =====
EXTRA_FIGURES_V7 = [
    {
        "id": "abbas-ibn-firnas", "name": "Abbas Ibn Firnas", "category": "scientists",
        "era": "810–887 CE", "region": "Northeast Africa", "lifespan": "810–887 CE",
        "summary": "Andalusian polymath of Berber North African origin — astronomer, engineer, chemist, and aviation pioneer. Attempted a powered flight from a hill near Córdoba in 875, six centuries before Leonardo's sketches.",
        "story": "Born in Ronda (then under the Umayyad Caliphate of Córdoba), Ibn Firnas designed a water clock, the first wing-equipped flight apparatus (recorded by 17th-century chronicler al-Maqqari), an armillary sphere, and a method for cutting rock crystal. His flight reportedly stayed aloft 'for a length of time' before he crash-landed and injured his back — a failure he attributed to forgetting a tail for steering.",
        "legacy": "A crater on the Moon, a Baghdad airport bridge, and a Tripoli airport all bear his name. He is the canonical reference for the deep African and Arab roots of aeronautics.",
        "image_url": _IMG_B,
        "sources": [
            "Lynn Townsend White Jr., 'Eilmer of Malmesbury, an Eleventh-Century Aviator' (1961) — extended discussion of Ibn Firnas",
            "al-Maqqari, 'Nafh al-Tib' (17th c.)",
        ],
    },
    {
        "id": "ahmed-baba", "name": "Ahmed Baba al-Massufi", "category": "intellectuals",
        "era": "1556–1627", "region": "West Africa", "lifespan": "1556–1627",
        "summary": "The greatest scholar of Timbuktu's intellectual golden age — author of more than 40 surviving works on Islamic law, biography, lexicography, and the legal status of enslaved Africans.",
        "story": "Born in Araouane in the Sahara to a Sanhaja Berber family settled in Timbuktu, Ahmed Baba taught at the Sankoré Madrasa until the 1591 Moroccan invasion. He was deported to Marrakesh and held there 14 years; the Sa'di sultan Ahmad al-Mansur paid him to teach in chains. His treatise 'Mi'raj al-Su'ud' (1615) condemned the enslavement of free Muslim West Africans — a foundational document in early African legal critique of the trans-Saharan slave trade.",
        "legacy": "The Institut Ahmed Baba in Timbuktu (founded 1973) preserves over 20,000 manuscripts. His treatises are still studied in Maliki law faculties from Mauritania to Saudi Arabia.",
        "image_url": _IMG_B,
        "sources": [
            "Mahmoud Zouber, 'Ahmad Bābā de Tombouctou: sa vie et son œuvre' (1977)",
            "John Hunwick, 'Jews of a Saharan Oasis' (2006) — extended on Mi'raj al-Su'ud",
        ],
    },
    {
        "id": "aline-sitoe-diatta", "name": "Aline Sitoé Diatta", "category": "civil_rights",
        "era": "1920–1944", "region": "West Africa", "lifespan": "1920–1944",
        "summary": "Diola prophetess and anti-colonial resistance leader from Casamance — sometimes called 'the Joan of Arc of Senegal'. Called for civil disobedience, refused French requisitions of rice and cattle, and was deported to Timbuktu where she died of scurvy at 24.",
        "story": "Born in Kabrousse (Lower Casamance), Aline Sitoé began having spiritual visions in 1941 telling her to lead the Diola people against French requisitions for the war effort. She forbade the cultivation of peanuts (the colonial cash crop), called for the return of traditional rice farming, and organized a tax strike. France arrested her in January 1943, sentenced her to ten years' exile, and deported her — first to Kayes, then to Timbuktu — where she died on 22 May 1944.",
        "legacy": "The Aline Sitoé Diatta stadium in Ziguinchor, a major ferry on the Dakar–Casamance route, and university residences across Senegal bear her name. Recognized in 1985 as a national heroine.",
        "image_url": _IMG_A,
        "sources": [
            "Christian Roche, 'Histoire de la Casamance' (1985)",
            "Robert Baum, 'West Africa's Women of God' (2015)",
        ],
    },
    {
        "id": "kimpa-vita", "name": "Kimpa Vita (Dona Beatriz)", "category": "civil_rights",
        "era": "1684–1706", "region": "Central Africa", "lifespan": "1684–1706",
        "summary": "Kongolese prophetess who founded the Antoinianist movement — an Africanized Christianity claiming Jesus and the saints were Black and born in the Kongo. Burned alive for heresy at 22; one of the earliest figures of indigenous theological resistance to European Christianity.",
        "story": "Born in the Kingdom of Kongo during its civil-war collapse, Kimpa Vita declared in 1704 that she had died and been reincarnated as St. Anthony of Padua. She preached that Christ, Mary, and the apostles were Kongolese, condemned the slave trade, and called on King Pedro IV to reunify the kingdom from the abandoned capital of São Salvador (Mbanza Kongo). Tens of thousands followed her. The Capuchin missionaries Bernardo da Gallo and Lorenzo da Lucca persuaded the king to arrest her; she was burned at the stake on 2 July 1706.",
        "legacy": "A foundational figure of Africanized Christianity studied alongside Kongolese cosmology by Linda Heywood, John Thornton, and others. Her story prefigures the entire history of African-initiated churches.",
        "image_url": _IMG_LAND,
        "sources": [
            "John K. Thornton, 'The Kongolese Saint Anthony: Dona Beatriz Kimpa Vita and the Antonian Movement, 1684–1706' (1998)",
        ],
    },
    {
        "id": "aboubakri-ii", "name": "Mansa Aboubakari II", "category": "royalty",
        "era": "r. c. 1310–1312", "region": "West Africa",
        "summary": "Mansa of Mali who, according to a fourteenth-century Egyptian source, abdicated his throne in around 1312 to lead a fleet of 2,000 ships across the Atlantic — almost two centuries before Columbus.",
        "story": "The Egyptian historian al-'Umari, writing in the 1340s, recorded the testimony of Mansa Musa during his 1324 Cairo stay. According to Musa, his predecessor 'did not believe the ocean was without end' and outfitted two successive expeditions: a first of 200 ships, of which one returned; then a second of 2,000 ships led by Aboubakari himself, who left the throne to Musa as regent and never returned. The historicity remains debated (the only source is al-'Umari), but the story exemplifies the imperial ambition of 14th-century Mali — and forces a reconsideration of who first attempted Atlantic crossings.",
        "legacy": "Subject of major works by Ivan Van Sertima ('They Came Before Columbus', 1976) and continuing archaeological debate. Independent of historicity, the textual evidence proves that Mali's court openly imagined trans-Atlantic exploration in 1312.",
        "image_url": _IMG_B,
        "civilization_id": "mali",
        "sources": [
            "al-'Umari, 'Masalik al-Absar fi Mamalik al-Amsar' (c. 1340)",
            "Nehemia Levtzion, 'Ancient Ghana and Mali' (1973)",
        ],
    },
    {
        "id": "malik-ambar", "name": "Malik Ambar", "category": "resistance",
        "era": "1548–1626", "region": "East Africa", "lifespan": "1548–1626",
        "summary": "Ethiopian-born Siddi (Habshi) statesman and military strategist who became Regent and de-facto ruler of the Ahmadnagar Sultanate in the Deccan — and the architect of guerrilla warfare techniques that held the Mughal Empire at bay for two decades.",
        "story": "Born Chapu in Harar, sold into slavery as a child, transported through Mocha and Baghdad to the Deccan, manumitted, and rising through the ranks of the Nizam Shahi army — Malik Ambar reorganized the Ahmadnagar sultanate around a new tax-revenue system (the bargi-giri model later adopted by Shivaji), developed light cavalry tactics that frustrated the Mughal armies of Jahangir and Shah Jahan, and founded the city of Khirki, now Aurangabad.",
        "legacy": "His revenue assessment became the template for Maratha and Mughal land taxation. His tomb stands in Khuldabad. Jahangir's hatred of him fills pages of the Mughal emperor's memoirs — including a famous miniature in which Jahangir shoots arrows into Ambar's severed head, a wish that never came true.",
        "image_url": _IMG_B,
        "sources": [
            "Richard M. Eaton, 'A Social History of the Deccan, 1300–1761' (2005)",
            "Omar Ali, 'Malik Ambar: Power and Slavery Across the Indian Ocean' (2016)",
        ],
    },
    {
        "id": "benkos-bioho", "name": "Benkos Biohó", "category": "resistance",
        "era": "c. 1570–1621", "region": "West Africa", "lifespan": "c. 1570–1621",
        "summary": "Bissau-born African leader who founded San Basilio de Palenque (Colombia) — the first free Black town in the Americas, recognized by the Spanish Crown in 1605 — 130 years before the British abolition movement began.",
        "story": "Born in Guinea-Bissau, captured by Portuguese slavers, sold in Cartagena, Biohó escaped in 1599 and established a fortified maroon community in the Montes de María. He led an army that defeated successive Spanish expeditions, forcing the colonial governor in 1605 to sign a peace recognizing the freedom of the Palenque's inhabitants — the first such recognition in the Americas. He was treacherously captured in 1619 and hanged in Cartagena in 1621.",
        "legacy": "San Basilio de Palenque remains a recognized Afro-Colombian municipality; UNESCO declared its language (Palenquero — a Spanish-Kikongo creole) and oral tradition a Masterpiece of the Oral and Intangible Heritage of Humanity in 2005.",
        "image_url": _IMG_A,
        "sources": [
            "Aquiles Escalante, 'El Palenque de San Basilio' (1979)",
            "UNESCO Intangible Cultural Heritage — San Basilio de Palenque (2005)",
        ],
    },
    {
        "id": "gaspar-yanga", "name": "Gaspar Yanga", "category": "resistance",
        "era": "c. 1545–c. 1620", "region": "West Africa",
        "summary": "African leader said to be of Bran (Gabonese) royal lineage who led a four-decade-long maroon rebellion in colonial Mexico — culminating in 1618 in the founding of San Lorenzo de los Negros (today Yanga, Veracruz), the first free Black town in the Americas to be officially recognized.",
        "story": "Yanga led a community of cimarrones in the highlands of Veracruz from around 1570. In 1609 Spanish forces under Pedro González de Herrera attacked; Yanga, then in his 60s, allowed his nephew Francisco de la Matosa to lead the defence while he negotiated. After a brutal siege, the rebels accepted Spanish terms only if the Crown recognized their town as free — and the eleven-clause treaty signed in 1618 did exactly that.",
        "legacy": "The town of Yanga, Veracruz, was renamed for him in 1932. His statue stands at its centre. He is widely regarded as the 'first liberator of the Americas' — preceding Toussaint Louverture by nearly two centuries.",
        "image_url": _IMG_A,
        "sources": [
            "David Davidson, 'Negro Slave Control and Resistance in Colonial Mexico, 1519–1650' (1966)",
            "Gonzalo Aguirre Beltrán, 'La población negra de México' (1946)",
        ],
    },
    {
        "id": "onesimus", "name": "Onesimus of Boston", "category": "scientists",
        "era": "c. 1680–c. 1740", "region": "West Africa",
        "summary": "Enslaved African (likely Akan or Fon) in Massachusetts who in 1716 taught his enslaver Cotton Mather the West African practice of variolation (smallpox inoculation) — directly enabling the 1721 Boston experiment that introduced the technique to the Anglophone world, 80 years before Edward Jenner's vaccine.",
        "story": "Onesimus told Mather that as a child in Africa he had been deliberately inoculated against smallpox by rubbing pus from a sick person's pustule into a cut — and that this procedure was widely practised across the Akan, Hausa, and Wolof worlds. When smallpox struck Boston in 1721, Mather and physician Zabdiel Boylston inoculated 286 people; their fatality rate was 2% versus 14% for the unvaccinated — historically decisive evidence in favour of the technique.",
        "legacy": "In 2016 the Boston Magazine named Onesimus 'one of the best Bostonians of all time'. His case is now a standard reference in histories of medicine, prefacing every modern textbook on vaccination.",
        "image_url": _IMG_A,
        "sources": [
            "Cotton Mather, 'The Angel of Bethesda' (manuscript, c. 1724)",
            "Margot Minardi, 'The Boston Inoculation Controversy of 1721–22' (William and Mary Quarterly, 2004)",
        ],
    },
]


# ===== HEROIC PLACES =====
EXTRA_PLACES_V7 = [
    {
        "id": "dhar-tichitt-site", "name": "Dhar Tichitt",
        "type": "site", "coords": [18.4500, -9.5000], "era": "c. 2000–300 BCE",
        "blurb": "Network of dry-stone hilltop towns in the Saharan plateau of southern Mauritania — among the earliest urban settlements in West Africa.",
        "story": "Excavations by Augustin Holl (1980s–2000s) and Patrick Munson before him revealed that Dhar Tichitt's stone enclosures pre-date the Ghana Empire by more than 2,000 years and represent one of the world's earliest experiments in agricultural urbanism in a semi-arid environment.",
        "sources": ["Augustin Holl, 'The Dhar Tichitt Tradition' (2009)"],
    },
    {
        "id": "sungbo-eredo", "name": "Sungbo's Eredo",
        "type": "site", "coords": [6.8200, 3.9170], "era": "c. 10th–11th c.",
        "blurb": "A 160-km earthen rampart and ditch system in Yorubaland (Nigeria) — the largest single pre-modern monument in Africa, enclosing roughly 1,400 km².",
        "story": "Locally attributed to a wealthy widow named Bilikisu Sungbo (identified by some with the biblical Queen of Sheba), the Eredo was rediscovered by British archaeologist Patrick Darling in 1994 and dated to the 10th–11th century. Its construction is estimated at 3.5 million person-days.",
        "sources": [
            "Patrick Darling, 'Sungbo's Eredo, Southern Nigeria' (1997)",
            "UNESCO Tentative World Heritage List entry (1995)",
        ],
    },
    {
        "id": "san-basilio-palenque", "name": "San Basilio de Palenque",
        "type": "site", "coords": [10.1000, -75.2000], "era": "c. 1599–present",
        "blurb": "The first free Black town in the Americas — founded by Benkos Biohó in the mountains south of Cartagena and recognized by the Spanish Crown in 1605.",
        "story": "Six hundred Afro-Colombians today still speak Palenquero, a Spanish–Kikongo creole that UNESCO recognized in 2005 as a Masterpiece of the Oral and Intangible Heritage of Humanity. The town's lumbalú funerary rite preserves Kongo theological elements unbroken since the seventeenth century.",
        "sources": ["UNESCO Intangible Cultural Heritage of Humanity — Palenque de San Basilio (2005)"],
    },
    {
        "id": "yanga-veracruz", "name": "Yanga (San Lorenzo de los Negros)",
        "type": "site", "coords": [18.8333, -96.8000], "era": "1618–present",
        "blurb": "The first officially-recognized free Black town in the Americas — founded by Gaspar Yanga in the Veracruz highlands of New Spain (Mexico).",
        "story": "After a four-decade insurgency, Yanga negotiated a treaty with the Spanish Crown granting his community legal freedom and self-government. Renamed for him in 1932, the town today hosts an annual Festival de la Negritud.",
        "sources": ["David Davidson, 'Negro Slave Control and Resistance in Colonial Mexico' (1966)"],
    },
    {
        "id": "janjira-fort", "name": "Janjira Fort (Murud-Janjira)",
        "type": "site", "coords": [18.3000, 72.9667], "era": "1490–1947",
        "blurb": "An island fortress off the Konkan coast of Maharashtra, India — capital of the Siddi state founded by Ethiopian-origin Muslim sailors and never conquered by the Marathas, the Portuguese, the Dutch, or the British.",
        "story": "Janjira was held continuously by the Habshi (Ethiopian/East African) Siddis of Murud from the late 15th century until 1947. At its peak the Siddis controlled a small navy that protected the Mughal pilgrimage routes to Mecca. The fort's 19 bastions remain almost intact.",
        "sources": [
            "Ababu Minda Yimene, 'An African Indian Community in Hyderabad' (2004)",
            "Helene Basu (ed.), 'Journeys and Dwellings: Indian Ocean Themes in South Asia' (2008)",
        ],
    },
    {
        "id": "nabta-playa", "name": "Nabta Playa",
        "type": "site", "coords": [22.5000, 30.7300], "era": "c. 5000–3000 BCE",
        "blurb": "A megalithic calendar circle in the Nubian Desert of southern Egypt — among the earliest astronomical monuments on Earth, predating Stonehenge by over 1,500 years.",
        "story": "Discovered by Fred Wendorf in 1973 and dated to the 5th millennium BCE, the Nabta Playa stones align to the summer solstice sunrise and to the rising of major stars (Arcturus, Sirius). Cattle burials at the site testify to a sophisticated pastoral cosmology already in place 7,000 years ago in the Sahara — long before the rise of pharaonic Egypt.",
        "sources": [
            "Fred Wendorf & Romuald Schild, 'Holocene Settlement of the Egyptian Sahara' (2001)",
            "J. McKim Malville et al., 'Astronomy of Nabta Playa' (Cambridge Archaeological Journal, 2008)",
        ],
    },
    {
        "id": "pir-senegal", "name": "Université de Pir",
        "type": "site", "coords": [14.9333, -16.7833], "era": "1603–19th c.",
        "blurb": "Major centre of Islamic scholarship in the Wolof state of Cayor (Senegal) — founded in 1603 and one of the leading universities of Senegambia for two centuries.",
        "story": "Founded by Khaly Amar Fall in the village of Pir Saniokhor, the school trained generations of West African qadis, marabouts, and ajami writers — producing manuscripts that survive today in Dakar, Boutilimit, and private libraries across the Senegal River valley.",
        "sources": [
            "Rudolph T. Ware, 'The Walking Qur'an: Islamic Education, Embodied Knowledge, and History in West Africa' (2014)",
        ],
    },
]


# ===== INDIAN OCEAN / SOUTH AMERICAN DIASPORA =====
EXTRA_DIASPORA_V7 = [
    {
        "id": "afro-argentine", "name": "Afro-Argentine",
        "country": "Argentina", "country_iso2": "AR", "status": "documented",
        "region": "South America",
        "coords": [-34.6037, -58.3816],
        "era_start": 1587, "era_end": 2025,
        "summary": "One of the most systematically erased Black populations in the Americas. In 1810 roughly 30% of Buenos Aires was Afro-descendant; by the 1887 census the official figure was 1.8% — the result of war, epidemics, racial-whitening policy, and statistical disappearance, not assimilation alone.",
        "origin_routes": ["West-Central Africa (Angola, Kongo) via Brazilian and Río de la Plata ports", "Mozambique"],
        "ethnicities": ["Bantu (Kongo, Angola)", "Mozambican Makua", "Some Yoruba"],
        "languages": ["Rioplatense Spanish (with documented Bantu loanwords: quilombo, mucama, dengue, tango itself a likely Kongo etymology)"],
        "religions": ["Catholicism", "Candombe rhythms preserved within secular tradition"],
        "culture": "The very form of tango — its name, its 2/4 rhythm, its early venues in the Afro-Argentine neighbourhoods of San Telmo and Montserrat — has African roots that white-national historiography spent a century minimizing. The Candombe of the Río de la Plata (now mostly Uruguayan) was born here.",
        "story": "Free Afro-Porteños fought in the Wars of Independence (the 6th and 8th 'castas' battalions). Bartolomé Mitre and Domingo Sarmiento's late-19th-century state pursued a deliberate 'whitening' policy: Black men were disproportionately conscripted into the Paraguayan War (1864–70), Black neighbourhoods were targeted by the 1871 yellow-fever epidemic, and the 1887 census's drastic drop reflects an active campaign of statistical erasure — descendants were reclassified as 'trigueño' or simply 'white'.",
        "modern": "The 2010 census added a self-identification question for African descent for the first time in 120 years; 149,000 Argentines now identify as such. Groups like Sociedad de Socorros Mutuos La Protectora and the Africa Vive movement work to restore historical visibility.",
        "image_url": _IMG_LAND,
        "sources": [
            "George Reid Andrews, 'The Afro-Argentines of Buenos Aires, 1800–1900' (1980)",
            "Erika Edwards, 'Hiding in Plain Sight: Black Women, the Law, and the Making of a White Argentine Republic' (2020)",
        ],
    },
    {
        "id": "afro-peruvian", "name": "Afro-Peruvian",
        "country": "Peru", "country_iso2": "PE", "status": "documented",
        "region": "South America",
        "coords": [-12.0464, -77.0428],
        "era_start": 1532, "era_end": 2025,
        "summary": "Roughly 1 million Afro-Peruvians live today on the coast from Chincha to Cañete and Lima — descendants of Africans brought from West-Central Africa and Mozambique to the Spanish viceroyalty. Their cultural output (música criolla, the cajón) shaped Peruvian national identity even as their political visibility remained marginal.",
        "origin_routes": ["West-Central Africa (Angola, Kongo)", "Senegambia", "Mozambique via Portuguese routes"],
        "ethnicities": ["Bantu", "Mandinga", "Wolof"],
        "languages": ["Peruvian Spanish (with Bantu and Akan retentions in zamacueca and landó vocabulary)"],
        "religions": ["Catholicism (Cristo Moreno / Señor de los Milagros)", "Afro-Catholic syncretic practices"],
        "culture": "The cajón — a wooden percussion box invented by enslaved Africans in Peru in the 18th century — is now a foundational instrument of flamenco worldwide; música criolla (landó, festejo, marinera); the poetry of Nicomedes Santa Cruz.",
        "story": "Enslaved Africans were the dominant workforce on coastal sugar and cotton plantations of the viceroyalty. The cofradía of the Señor de los Milagros — founded by an Angolan named Pedro Falcón in 1651 — became Peru's largest religious procession. Abolition came late (1854); freed Afro-Peruvians were displaced by the late-19th-century arrival of indentured Chinese workers.",
        "modern": "In 2009 the Peruvian state issued a formal historical apology to the Afro-Peruvian people. Victoria Santa Cruz's 1978 poem 'Me gritaron negra' is a foundational text of Afro-Latin American feminism. The 2010 census recognized Afro-Peruvian identity; in 2020 a Black-led Ministry of Culture department was finally created.",
        "image_url": _IMG_LAND,
        "sources": [
            "Frederick Bowser, 'The African Slave in Colonial Peru, 1524–1650' (1974)",
            "Heidi Carolyn Feldman, 'Black Rhythms of Peru' (2006)",
        ],
    },
]


# ===== INDIGENOUS PEOPLES =====
EXTRA_ETHNIC_GROUPS_V7 = [
    {
        "id": "san", "name": "San (Bushmen)",
        "homeland": "Botswana, Namibia, South Africa, Angola",
        "coords": [-22.0000, 22.5000],
        "population": "≈ 100,000",
        "language_family": "Khoisan (click languages — !Kung, Ju|'hoan, Naro, Khwe)",
        "summary": "Among the oldest continuous human populations on Earth — genetic studies suggest San lineages diverged from other Homo sapiens lineages 150,000–200,000 years ago. Famed for the click languages, the Kalahari rock art, and one of the most sustainable hunter-gatherer adaptations on the planet.",
        "language": "Multiple click-laden languages of the Khoisan family — !Kung (Ju|'hoan), Naro, Khwe, ǂKx'ao||'ae — with extensive ecological and ethnobotanical vocabulary.",
        "religion": "Trance-dance healing tradition (n!om), ancestor veneration, no centralized clergy.",
        "culture": "Tsodilo Hills rock art (over 4,500 paintings in Botswana, dated 1000–24,000 BP — UNESCO World Heritage); n!om healing dance; extraordinary ethnobotanical knowledge (Hoodia, devil's claw, dozens of medicinal plants).",
        "diaspora": "Tragically dispersed by 20th-century evictions from ancestral lands in Botswana and South Africa. The CKGR ('Central Kalahari Game Reserve') case (2006) returned land rights in principle, though enforcement remains contested.",
        "image_url": _IMG_LAND,
        "sources": [
            "Stephen Schuster et al., 'Complete Khoisan and Bantu genomes' (Nature, 2010)",
            "James Suzman, 'Affluence Without Abundance' (2017)",
        ],
    },
    {
        "id": "khoikhoi", "name": "Khoikhoi (Khoekhoe)",
        "homeland": "Western South Africa, Namibia",
        "coords": [-33.9249, 18.4241],
        "population": "≈ 300,000 (with much larger 'Coloured' population of partial Khoekhoe descent)",
        "language_family": "Khoisan · Khoe",
        "summary": "Pastoralist Khoekhoe-speaking peoples who introduced cattle and sheep husbandry to southern Africa around 2,000 years ago and were among the first African peoples encountered by European mariners at the Cape — including the kidnapped diplomat Krotoa-Eva and the orator Autshumao.",
        "language": "Khoekhoegowab (Nama) — still spoken by 300,000 in Namibia; revival efforts in South Africa.",
        "religion": "Tsui-ǁGoab (creator), ancestor veneration, ritual dance.",
        "culture": "Mat-houses, cattle pastoralism, the click consonants borrowed into isiXhosa and isiZulu; trance dance.",
        "diaspora": "Decimated by smallpox in the 18th century and absorbed into the South African 'Coloured' category by 19th-century colonial classification.",
        "image_url": _IMG_LAND,
        "sources": [
            "Richard Elphick, 'Khoikhoi and the Founding of White South Africa' (1985)",
        ],
    },
    {
        "id": "mbuti-baka", "name": "Mbuti, Baka, Bayaka (forest peoples of the Congo basin)",
        "homeland": "DRC, Cameroon, CAR, Republic of the Congo, Gabon, Uganda, Rwanda",
        "coords": [1.5000, 25.0000],
        "population": "≈ 500,000",
        "language_family": "Multiple (Bantu and Ubangian languages adopted; lost-original languages survive only in ritual vocabulary)",
        "summary": "Forest-dwelling peoples of the equatorial rainforest, with some of the most egalitarian known social systems and the oldest documented polyphonic musical traditions in the world (Mbuti Molimo and Baka yelli).",
        "language": "Adopted Bantu / Ubangian neighbour languages; ritual vocabularies preserve pre-Bantu elements.",
        "religion": "Forest cosmology (Jengi among the Baka, the Forest itself among the Mbuti); molimo and other ritual societies.",
        "culture": "Net-hunting techniques, polyphonic singing now studied by ethnomusicologists as among the world's most sophisticated; the Mbuti elima, ekipa, and molimo ceremonies.",
        "diaspora": "Increasingly displaced by logging concessions and conservation-park creation across the Congo basin; subject of major land-rights litigation in Cameroon (Baka v. State, 2019).",
        "image_url": _IMG_LAND,
        "sources": [
            "Colin Turnbull, 'The Forest People' (1961)",
            "Susanne Fürniss, 'L'Hétérophonie pygmée' (CNRS, 2007)",
        ],
    },
]


# ===== LONG-FORM STORIES (PDF 2 — country-by-country + writing systems + sciences) =====
EXTRA_STORIES_V7 = [
    {
        "id": "zanj-rebellion",
        "title": "The Zanj Rebellion",
        "civilization_id": None,
        "era": "869–883 CE",
        "summary": "One of the longest and largest slave revolts in world history — fifteen years in which East African enslaved labourers shook the Abbasid Caliphate to its foundations and held southern Iraq from a capital they built themselves.",
        "chapters": [
            {"heading": "The Salt Marshes", "body": "In the salt marshes south of Basra, the Abbasid caliphate had concentrated tens of thousands of enslaved East Africans — known as the Zanj — to clear nitrous topsoil for agricultural reclamation. The work was brutal, the diet of dates and flour catastrophic, and the conditions had already provoked two unsuccessful revolts (689 and 694) by the time a charismatic religious reformer named Ali ibn Muhammad arrived in Basra in 869."},
            {"heading": "Ali ibn Muhammad", "body": "Ali — variously claiming descent from Ali ibn Abi Talib and preaching a heterodox egalitarian theology — found a ready audience. By autumn 869 he had assembled fifteen thousand Zanj fighters and routed the first Abbasid expedition sent to crush them. The Zanj built their own fortified capital, al-Mukhtara, in the marshes, minted their own coins, and held southern Iraq for over a decade."},
            {"heading": "The Abbasid Counter-attack", "body": "Caliph al-Mu'tamid mobilized a massive force under his brother al-Muwaffaq and his nephew Abu al-Abbas (the future caliph al-Mu'tadid). The campaign required hundreds of ships, the construction of a counter-city named al-Muwaffaqiya, and three years of attritional warfare in the marshes. Al-Mukhtara fell in August 883; Ali ibn Muhammad was killed."},
            {"heading": "What it changed", "body": "The Zanj revolt cost the Abbasid treasury catastrophically, weakened the central caliphate, and contributed to the political fragmentation from which the Caliphate never fully recovered. The deportation of East African slaves to Iraqi plantation labour was discontinued. The standard Sunni historiography (al-Tabari, Ibn al-Athir) is one-sidedly hostile, but the rebellion has been read since the 20th century — by Alexandre Popovic and others — as one of the great pre-modern revolts of the enslaved."},
        ],
        "sources": [
            "Alexandre Popovic, 'The Revolt of African Slaves in Iraq in the 3rd/9th Century' (1976; English trans. 1999)",
            "al-Tabari, 'Tarikh' — Vols. 36–37",
            "Ghada Hashem Talhami, 'The Zanj Rebellion Reconsidered' (1977)",
        ],
    },
    {
        "id": "african-writing-systems",
        "title": "Letters and Signs — five African writing systems",
        "civilization_id": None,
        "era": "c. 200 BCE – present",
        "summary": "Africa was not 'an oral continent that learned writing from outside'. It was, for at least two millennia, a continent of indigenous scripts — including one that remains undeciphered, one invented in the 19th century by a man who said his sister taught him, and one still in everyday liturgical use today.",
        "chapters": [
            {"heading": "Meroitic", "body": "From the second century BCE, the kingdom of Kush (modern Sudan) developed a fully indigenous script — Meroitic — derived from Egyptian hieroglyphs but used to write a Nilo-Saharan language. We can read the signs (Francis Llewellyn Griffith deciphered the alphabet in 1909) but we still cannot understand the language. Meroitic remains the oldest known undeciphered language of sub-Saharan Africa — a reminder that 'pre-literate' has nothing to do with the actual history of African writing."},
            {"heading": "Ge'ez", "body": "From the 4th century CE, the Christian kingdom of Aksum (modern Ethiopia and Eritrea) developed the Ge'ez script — a syllabary still in liturgical use by the Ethiopian Orthodox Tewahedo Church and the script of an immense religious, philosophical, and chronicle literature. Ge'ez remains the only African writing system continuously used by an African society for over 1,700 years."},
            {"heading": "Nsibidi", "body": "From at least the 5th century CE, the Ekoi, Efik, and Igbo peoples of the Cross River region (Nigeria and Cameroon) developed Nsibidi — an ideographic system of several hundred symbols used by the Ekpe secret society to communicate concepts including law, marriage, war, and death. The British colonial state outlawed Ekpe in 1909, but Nsibidi survived in Calabar masquerades and crossed the Atlantic in Cuban Abakuá ritual."},
            {"heading": "Vai", "body": "In the 1820s a Vai-speaking man named Momolu Duwalu Bukele in what is now Liberia presented his community with a complete 200-character syllabary that he said had come to him in a dream — and that his sister had helped him refine. Within decades, Vai literacy rates in coastal Liberia rivalled those of Europe. The syllabary is now Unicode-encoded and taught in Vai-language schools."},
            {"heading": "Ajami", "body": "From at least the 11th century, West and East African Muslims adapted the Arabic alphabet to write their own languages — Wolof, Fulani (Pulaar), Hausa, Mandinka, Swahili. The result is a vast continental ajami literature: legal treatises, devotional poetry, agricultural manuals, medical compendiums. Most of it remains uncatalogued. Fallou Ngom's Ajami Project at Boston University has begun the digitization."},
        ],
        "sources": [
            "Saki Mafundikwa, 'Afrikan Alphabets' (2004)",
            "Fallou Ngom, 'Muslims Beyond the Arab World: The Odyssey of ʿAjamī and the Murīdiyya' (2016)",
            "Konrad Tuchscherer, 'African Scripts and Scripting' (Cambridge Companion to Linguistic Anthropology, 2007)",
        ],
    },
    {
        "id": "precolonial-african-sciences",
        "title": "Hidden Sciences — how Africa invented",
        "civilization_id": None,
        "era": "c. 5000 BCE – present",
        "summary": "Long before colonial-era narratives of a 'backward continent', Africa produced steel that European metallurgists could not match, mathematical fractals that Western geometry only formalized in the 1970s, astronomical alignments older than Stonehenge, and a smallpox-prevention technique that reached Boston in 1721.",
        "chapters": [
            {"heading": "Haya Steel", "body": "Between the 2nd century BCE and the early 20th century CE, the Haya people of the western Lake Victoria shore (modern Tanzania) operated tall conical furnaces that reached temperatures of 1,800°C — high enough to produce medium-carbon steel directly from the ore, a temperature European blast furnaces did not routinely reach until the late 19th century. The Haya technique was 'rediscovered' for European audiences by Peter Schmidt and Donald Avery in 1978, who fired a replica furnace with local ironmasters and confirmed the metallurgy."},
            {"heading": "Fractals", "body": "Ron Eglash's 'African Fractals' (1999) documented the systematic use of self-similar, recursive geometry in African village planning (Logone-Birni in Cameroon, Ba-ila in Zambia), in textile patterns, in hairstyles, in divination boards, and in Owari and Mancala game-strategy. Western mathematics formalized fractal geometry through Benoît Mandelbrot only in 1975. The conclusion is not that Africans 'discovered Mandelbrot first' but that an explicit recursive mathematics had been built into everyday African design for at least a millennium."},
            {"heading": "Nabta Playa", "body": "In the southern Egyptian desert, the megalithic calendar circle of Nabta Playa — discovered by Fred Wendorf in 1973 and dated to roughly 5000 BCE — predates Stonehenge by 1,500 years and aligns to the summer solstice sunrise and to the rising of Arcturus and Sirius. Its construction belongs to a Saharan pastoralist culture whose cattle cosmology directly fed into the iconography of pharaonic Egypt two thousand years later."},
            {"heading": "Ugandan caesarean section", "body": "In 1879, the British missionary doctor Robert W. Felkin watched a Banyoro surgeon in the kingdom of Bunyoro (Uganda) perform a successful caesarean section on a young mother, using banana wine as antisepsis, cauterizing bleeders, and closing the incision with iron needles. Both mother and child survived. Felkin's report (Edinburgh Medical Journal, 1884) describes a procedure more antiseptic and lower-mortality than contemporaneous European caesareans — a fact that European medical history quietly absorbed and then forgot."},
            {"heading": "Onesimus and variolation", "body": "In 1716 an enslaved African in Massachusetts named Onesimus told the puritan minister Cotton Mather that as a child in Africa he had been deliberately inoculated against smallpox by rubbing pus from an infected pustule into a cut — a procedure widely practised across the Akan, Hausa, and Wolof worlds. When smallpox struck Boston in 1721, Mather and physician Zabdiel Boylston inoculated 286 people; their fatality rate was 2% versus 14% for the unvaccinated. Eight decades before Edward Jenner's cowpox vaccine, the West African practice was already saving New England lives."},
        ],
        "sources": [
            "Peter Schmidt & Donald Avery, 'More Evidence for an Advanced Prehistoric Iron Technology in Africa' (Journal of Field Archaeology, 1983)",
            "Ron Eglash, 'African Fractals: Modern Computing and Indigenous Design' (1999)",
            "Robert W. Felkin, 'Notes on Labour in Central Africa' (Edinburgh Medical Journal, April 1884)",
            "Margot Minardi, 'The Boston Inoculation Controversy of 1721–22' (William and Mary Quarterly, 2004)",
            "J. McKim Malville et al., 'Astronomy of Nabta Playa' (Cambridge Archaeological Journal, 2008)",
        ],
    },
    {
        "id": "moorish-iberia",
        "title": "Al-Andalus — Moorish North Africa in Iberia",
        "civilization_id": None,
        "era": "711–1492",
        "summary": "For nearly eight centuries, North African (Berber and Arab) dynasties governed most of the Iberian peninsula — leaving behind agricultural systems, scientific instruments, philosophical schools, and an architectural vocabulary that Spain and Portugal then carried to the Americas.",
        "chapters": [
            {"heading": "711", "body": "The conquest of Iberia in 711 was led by Tariq ibn Ziyad, a Berber commander whose name survives in Gibraltar (Jabal Tariq — Tariq's mountain). The expeditionary force was 80% Amazigh (Berber); the new al-Andalus would remain politically and culturally a North African creation for the next four centuries."},
            {"heading": "Córdoba", "body": "By the 10th century, Córdoba was the largest city in Europe — 500,000 inhabitants, paved streets, public street lighting, 70 libraries, the Great Mosque (now Mezquita-Catedral), and the court of al-Hakam II's chief librarian, Lubna of Córdoba, a Black woman of slave origin who became the most powerful intellectual of the Caliphate's golden age."},
            {"heading": "Knowledge transfer", "body": "The Almohad caliphate (1147–1269) — itself an Amazigh dynasty from the High Atlas — sponsored Ibn Rushd (Averroes), Ibn Tufayl, Maimonides, and the translation movements of Toledo that returned Aristotle to Latin Europe. Agricultural manuals, irrigation techniques (the noria, the qanat), citrus and sugar cultivation, paper-making, the astrolabe, and Arabic numerals all entered Christian Europe through al-Andalus."},
            {"heading": "1492 and after", "body": "The fall of Granada in 1492 and the subsequent forced conversions and expulsions of Moriscos (1609–14) ended Muslim political power in Iberia. But the cultural inheritance — visible in Spanish vocabulary (about 4,000 words of Arabic origin), in flamenco's bridge between Romani and African musical lineages, in Mexican and Peruvian colonial architecture — quietly continued. The Iberian colonial empire was, in this sense, a partly African empire."},
        ],
        "sources": [
            "María Rosa Menocal, 'The Ornament of the World' (2002)",
            "Hugh Kennedy, 'Muslim Spain and Portugal: A Political History of al-Andalus' (1996)",
        ],
    },
    {
        "id": "tirailleurs-senegalais",
        "title": "The African Soldiers of Two World Wars",
        "civilization_id": None,
        "era": "1914–1945",
        "summary": "Over 200,000 African soldiers fought in the French army in WWI; nearly 200,000 again in WWII — many sent to the deadliest sectors of the Marne, Verdun, and Provence. France's victories were partly an African achievement, and France's post-war debts to these soldiers were systematically dishonoured.",
        "chapters": [
            {"heading": "Tirailleurs Sénégalais", "body": "Despite the name, the Tirailleurs Sénégalais were recruited from across West and Central French Africa — Senegal, Mali, Burkina Faso, Côte d'Ivoire, Niger, Chad, Cameroon, the DRC. In WWI, 134,000 fought on the Western Front; roughly 30,000 died. Blaise Diagne (the first African deputy elected to the French National Assembly) negotiated full French citizenship for the four communes of Senegal in exchange for recruitment."},
            {"heading": "The Liberation of France", "body": "In WWII, 100,000 African soldiers participated in the Allied liberation of France (1944). They were the first liberators of Toulon and Marseille in August 1944 — and then, by direct order, were 'whitened' out of de Gaulle's August 1944 entry into Paris, replaced by white American and FFI troops to fit the political imagery of a 'French' liberation."},
            {"heading": "Thiaroye, December 1944", "body": "When demobilized tirailleurs at the Thiaroye transit camp outside Dakar protested France's refusal to pay them the full demobilization premium owed (a quarter of the white soldiers' rate), French troops opened fire on 1 December 1944. The official toll was 35 killed; recent archival work by Armelle Mabon places it at over 300. Ousmane Sembène's 1988 film 'Camp de Thiaroye' is the canonical retelling."},
            {"heading": "Frozen pensions", "body": "In 1959 France 'crystallized' the pensions of African veterans at their 1959 rates, a fraction of those paid to French veterans. The discrimination was not fully ended until 2010 — and even then with no retroactive compensation. The historian Pap Ndiaye and President Emmanuel Macron's 2018 acknowledgment of Thiaroye represent a still-incomplete national reckoning."},
        ],
        "sources": [
            "Myron Echenberg, 'Colonial Conscripts: The Tirailleurs Sénégalais in French West Africa, 1857–1960' (1991)",
            "Armelle Mabon, 'Prisonniers de guerre indigènes' (2010)",
            "Joe Lunn, 'Memoirs of the Maelstrom: A Senegalese Oral History of the First World War' (1999)",
        ],
    },
]


# ===== WRITING SYSTEMS AS CULTURE ITEMS (compact entries) =====
EXTRA_CULTURE_V7 = [
    {
        "id": "culture-nsibidi", "category": "language", "region": "West Africa",
        "title": "Nsibidi — the ideograms of the Cross River",
        "blurb": "A pre-colonial ideographic writing system used by the Ekpe secret societies of the Cross River region (Nigeria, Cameroon) since at least the 5th century CE — capable of expressing concepts including law, marriage, war, and death.",
        "story": "Nsibidi survived British colonial outlawing of Ekpe in 1909, crossing the Atlantic in the Abakuá ritual of Cuban Lukumí practitioners — making it perhaps the only African writing system that became a diaspora script.",
        "sources": ["Saki Mafundikwa, 'Afrikan Alphabets' (2004)"],
    },
    {
        "id": "culture-vai", "category": "language", "region": "West Africa",
        "title": "The Vai syllabary",
        "blurb": "A 200-character syllabary invented in the 1820s by Momolu Duwalu Bukele in present-day Liberia — making Vai literacy rates in 19th-century coastal Liberia rival those of Europe.",
        "story": "Bukele said the script came to him in a dream and that his sister helped him refine it. The Vai syllabary is now Unicode-encoded and taught in Vai-language schools across Liberia and Sierra Leone.",
        "sources": ["Konrad Tuchscherer, 'African Scripts and Scripting' (Cambridge Companion to Linguistic Anthropology, 2007)"],
    },
    {
        "id": "culture-geez", "category": "language", "region": "Horn of Africa",
        "title": "Ge'ez — the script of Aksum",
        "blurb": "An African syllabary in continuous liturgical use for 1,700 years — the script of the Ethiopian Orthodox Tewahedo Church and of an immense religious, philosophical, and chronicle literature.",
        "story": "Ge'ez gave rise to the modern Amharic, Tigrinya, and Tigre scripts. Manuscripts at the Ethiopian Orthodox Tewahedo Church and at Abba Garima monastery include some of the oldest surviving Christian illuminated manuscripts in the world.",
        "sources": ["Edward Ullendorff, 'Ethiopia and the Bible' (1968)"],
    },
    {
        "id": "culture-meroitic", "category": "language", "region": "Northeast Africa",
        "title": "Meroitic — Africa's undeciphered script",
        "blurb": "The script of the Kushite kingdom of Meroë — fully alphabetic, derived from Egyptian hieroglyphs but used to write a Nilo-Saharan language we still cannot understand.",
        "story": "Francis Llewellyn Griffith deciphered the signs in 1909, but the underlying language has resisted every reconstruction. Meroitic is the oldest known undeciphered language of sub-Saharan Africa.",
        "sources": ["Claude Rilly, 'Le méroïtique et sa famille linguistique' (2010)"],
    },
    {
        "id": "culture-ajami", "category": "language", "region": "West Africa",
        "title": "Ajami — Arabic script for African languages",
        "blurb": "The adaptation of the Arabic alphabet, from at least the 11th century, to write Wolof, Fulani, Hausa, Mandinka, Swahili — producing a vast continental literature mostly still uncatalogued.",
        "story": "The Boston University Ajami Project under Fallou Ngom has begun digitizing tens of thousands of pages of West African ajami — legal treatises, devotional poetry, agricultural manuals, medical compendiums — that were never accessible to Latin-script researchers.",
        "sources": ["Fallou Ngom, 'Muslims Beyond the Arab World: The Odyssey of ʿAjamī and the Murīdiyya' (2016)"],
    },
    {
        "id": "culture-haya-steel", "category": "ritual", "region": "East Africa",
        "title": "Haya high-temperature steel",
        "blurb": "Tall conical furnaces of the Haya people on Lake Victoria's western shore — reaching 1,800°C, hot enough to produce medium-carbon steel directly from ore, two millennia before European metallurgy.",
        "story": "Documented archaeologically from the 2nd century BCE through the early 20th century CE. The technique was reconstructed in 1978 by archaeologists Peter Schmidt and Donald Avery firing a replica furnace with local Haya ironmasters.",
        "sources": ["Peter Schmidt & Donald Avery, 'More Evidence for an Advanced Prehistoric Iron Technology in Africa' (Journal of Field Archaeology, 1983)"],
    },
    {
        "id": "culture-fractals", "category": "ritual", "region": "West Africa",
        "title": "African fractals",
        "blurb": "Self-similar recursive geometry in African village planning, textiles, hairstyles, and divination boards — an explicit recursive mathematics built into everyday African design at least a millennium before Mandelbrot's formalization.",
        "story": "Ron Eglash's 'African Fractals' (1999) documented examples from the Logone-Birni village of Cameroon to the Ba-ila villages of Zambia to the Bamana sand divination of Mali. The book seeded the field of ethnomathematics.",
        "sources": ["Ron Eglash, 'African Fractals: Modern Computing and Indigenous Design' (1999)"],
    },
    {
        "id": "culture-mancala", "category": "ritual", "region": "Horn of Africa",
        "title": "Mancala — an algorithmic mathematics",
        "blurb": "The Mancala family of games — Oware (Akan), Bao (Swahili), Songo (Cameroon), Gebeta (Ethiopia) — is in fact a precise combinatorial-mathematical system whose end-game positions are computationally complex.",
        "story": "Oware was 'weakly solved' in 2002 by Romein and Bal — meaning a draw with perfect play is now known to be the game's optimum outcome — confirming that the game's complexity rivals that of European chess endgames.",
        "sources": ["John W. Romein & Henri E. Bal, 'Solving the Game of Awari Using Parallel Retrograde Analysis' (IEEE Computer, 2002)"],
    },
    {
        "id": "culture-nabta-playa", "category": "ritual", "region": "Northeast Africa",
        "title": "Nabta Playa — Africa's oldest astronomical site",
        "blurb": "A megalithic calendar circle in the southern Egyptian desert, dating to roughly 5000 BCE — predating Stonehenge by 1,500 years.",
        "story": "Aligned to the summer solstice sunrise and to the rising of Arcturus and Sirius. Built by Saharan pastoralists whose cattle cosmology fed into the iconography of pharaonic Egypt 2,000 years later.",
        "sources": ["J. McKim Malville et al., 'Astronomy of Nabta Playa' (Cambridge Archaeological Journal, 2008)"],
    },
    {
        "id": "culture-dogon-cosmology", "category": "spiritual", "region": "West Africa",
        "title": "Dogon cosmology",
        "blurb": "The Dogon people of the Bandiagara escarpment (Mali) preserve one of the most documented indigenous African cosmogonies — including astronomical references that have generated continuing scholarly debate.",
        "story": "Marcel Griaule's 1947 dialogues with the Dogon elder Ogotemmêli recorded an elaborate cosmogonic system. The Dogon's reported astronomical knowledge of Sirius and its companion star Sirius B has been variously interpreted — by Griaule as evidence of ancient African astronomy, by later anthropologists as a case study in cultural exchange and reinterpretation.",
        "sources": [
            "Marcel Griaule, 'Dieu d'eau: Entretiens avec Ogotemmêli' (1948)",
            "Walter van Beek, 'Dogon Restudied: A Field Evaluation of the Work of Marcel Griaule' (1991)",
        ],
    },
]


EXTRA_FIGURE_CIVS_V7 = {
    "aboubakri-ii": "mali",
    "ahmed-baba": "mali",
    "kimpa-vita": "kongo",
    "abbas-ibn-firnas": "egypt",
}


EXTRA_FIGURE_WIKI_V7 = {
    "abbas-ibn-firnas": "Abbas ibn Firnas",
    "ahmed-baba": "Ahmad Baba al-Massufi",
    "aline-sitoe-diatta": "Aline Sitoé Diatta",
    "kimpa-vita": "Beatriz Kimpa Vita",
    "aboubakri-ii": "Abu Bakr II",
    "malik-ambar": "Malik Ambar",
    "benkos-bioho": "Benkos Biohó",
    "gaspar-yanga": "Gaspar Yanga",
    "onesimus": "Onesimus (Bostonian)",
}
