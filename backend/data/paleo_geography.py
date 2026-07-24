"""Prehistoric land bridges and coastlines for the Atlas map's deep-time mode.

IMPORTANT — scope and honesty note:
These are simplified, approximate reconstructions of exposed land during
periods of lower sea level (chiefly the Last Glacial Maximum, c. 26,000-19,000
years ago, when global sea level was roughly 120m lower than today), based on
established paleoclimate and archaeogenetic literature. They are NOT precise
coastline surveys — the frontend must present them as "approximate
reconstruction," matching the same honesty standard as HISTORICAL_POLITIES.

This deep-time mode exists specifically to correctly represent what actually
changed about Earth's geography during the span of human migration (sea level
and land bridges), rather than continents drifting — continental drift
operates on a scale of hundreds of millions of years and had already finished
shaping today's continents long before humans existed. See the site's design
notes: this was a deliberate correction requested during development after an
initial (mistaken) request to show continents "still joined together."

Each entry: {id, name, era_start, era_end (both negative = years ago, i.e.
era_start is the more ancient bound), polygon [[lat, lon], ...], color,
summary, sources}.
"""

PALEO_GEOGRAPHY = [
    {
        "id": "beringia",
        "name": "Beringia (Bering Land Bridge)",
        "era_start": -35000, "era_end": -11000,
        "polygon": [
            [70.0, 175.0], [68.0, -175.0], [64.0, -168.0], [62.0, -172.0],
            [60.0, 178.0], [65.0, 170.0], [70.0, 175.0],
        ],
        "color": "#4A7C82",
        "summary": "A wide plain, not a narrow bridge, connecting Siberia and Alaska when sea levels were roughly 120m lower during the last glacial period; the route by which humans first reached the Americas, roughly 20,000-15,000 years ago.",
        "sources": ["Bidirectional dispersals during the peopling of the North American Arctic, PMC9871004"],
    },
    {
        "id": "sundaland",
        "name": "Sundaland",
        "era_start": -50000, "era_end": -10000,
        "polygon": [
            [10.0, 95.0], [10.0, 110.0], [5.0, 118.0], [-8.0, 118.0],
            [-10.0, 105.0], [-3.0, 95.0], [10.0, 95.0],
        ],
        "color": "#4A7C82",
        "summary": "During glacial periods of lower sea level, the Malay Peninsula, Sumatra, Java, and Borneo formed one continuous landmass, a key stepping-stone for early human dispersal toward Sahul.",
        "sources": ["Discerning the Origins of the Negritos, First Sundaland People, Genome Biology and Evolution (2017)"],
    },
    {
        "id": "sahul",
        "name": "Sahul",
        "era_start": -65000, "era_end": -8000,
        "polygon": [
            [-2.0, 130.0], [-2.0, 150.0], [-10.0, 153.0], [-25.0, 153.0],
            [-40.0, 145.0], [-38.0, 137.0], [-15.0, 128.0], [-2.0, 130.0],
        ],
        "color": "#4A7C82",
        "summary": "New Guinea, Australia, and Tasmania formed a single connected landmass, settled by some of the earliest human migrants outside Africa via the 'southern coastal route,' roughly 50,000-65,000 years ago.",
        "sources": ["Reyes-Centeno et al., 'Genomic and cranial phenotype data support multiple modern human dispersals from Africa and a southern route into Asia', PNAS (2014)"],
    },
    {
        "id": "bab-el-mandeb-crossing",
        "name": "Bab-el-Mandeb crossing",
        "era_start": -70000, "era_end": -50000,
        "polygon": [
            [13.0, 42.5], [12.3, 43.5], [11.8, 43.4], [12.5, 42.3], [13.0, 42.5],
        ],
        "color": "#D4AF37",
        "summary": "During glacial periods of lower sea level, the strait separating the Horn of Africa from the Arabian Peninsula narrowed considerably, making it a plausible crossing point for early human migration out of Africa via the 'southern coastal route.'",
        "sources": ["Geographic and archaeological literature on Bab-el-Mandeb migration routes"],
    },
    {
        "id": "sinai-land-route",
        "name": "Sinai land route",
        "era_start": -125000, "era_end": -45000,
        "polygon": [
            [31.5, 32.0], [31.5, 35.0], [29.0, 35.0], [29.0, 32.5], [31.5, 32.0],
        ],
        "color": "#D4AF37",
        "summary": "Always dry land (not a bridge requiring exposure), the Sinai Peninsula's Nile-to-Levant corridor is the 'northern route' proposed for early out-of-Africa dispersals, with sites like Misliya Cave (Israel) dated to around 180,000 years ago.",
        "sources": ["Hublin et al., Nature (2017); Misliya Cave archaeological record"],
    },
]

__all__ = ["PALEO_GEOGRAPHY"]
