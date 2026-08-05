"""Plate tectonics / continental drift epochs — Pangaea to today.

IMPORTANT — this is a SEPARATE, purely geological mode with NOTHING to do with
human migration, empires, or diaspora (see historical_polities.py / paleo_geography.py
for those). Continental drift operates on a scale of hundreds of millions of
years; Homo sapiens is roughly 300,000 years old.

REVISED APPROACH (v2): rather than hand-drawn schematic continent shapes,
the frontend now reuses the REAL, accurate modern country coastlines (the
same topojson used for the historical/present-day map) and repositions them
as rigid groups (Africa, Eurasia, North America, South America, India,
Australia, Antarctica) using the `fusion_factor` below (0 = modern position,
1 = fully-assembled Pangaea), interpolating the same way real textbook
Pangaea diagrams are drawn: authentic coastlines, slid and rotated together.
See frontend/src/lib/plateGroups.js for the actual transform math.

This is still NOT a precise GPlates plate-rotation reconstruction (which
requires real Euler-pole rotation data unavailable in this project) — the
frontend must keep presenting it as "schéma simplifié, pas à l'échelle."

Each epoch: {id, name, era_mya, era_label, fusion_factor, labels, summary, sources}.
`labels`: on-map text anchored to a plate group (so it drifts with it) or
free-floating (group: null) for open-ocean labels like "Mer de Téthys".
Each label gives {text, group, lat, lon, size} — lat/lon is the label's
anchor point in MODERN coordinates; the frontend applies that group's current
transform to reposition it.
"""

PLATE_TECTONICS_EPOCHS = [
    {
        "id": "pangaea-assembly",
        "name": "Pangaea assembles",
        "era_mya": -300,
        "era_label": "il y a ~300 millions d'années",
        "fusion_factor": 1.0,
        "labels": [
            {"text": "PANGÉE", "group": None, "lat": -5, "lon": 10, "size": 30},
        ],
        "summary": "Almost all of Earth's landmass was joined into a single supercontinent, Pangaea, surrounded by one global ocean (Panthalassa). This is roughly 300 million years before the first Homo sapiens.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)", "Standard Permian-period plate tectonic reconstructions"],
    },
    {
        "id": "pangaea-rifting",
        "name": "Pangaea begins to rift",
        "era_mya": -200,
        "era_label": "il y a ~200 millions d'années",
        "fusion_factor": 0.82,
        "labels": [
            {"text": "LAURASIA", "group": "Eurasia", "lat": 50, "lon": 40, "size": 18},
            {"text": "GONDWANA", "group": "Africa", "lat": -10, "lon": 15, "size": 18},
            {"text": "Mer de Téthys", "group": None, "lat": 15, "lon": 45, "size": 11},
        ],
        "summary": "Around the Triassic-Jurassic boundary, Pangaea began splitting into a northern supercontinent (Laurasia — future North America, Europe, and most of Asia) and a southern one (Gondwana — future Africa, South America, Antarctica, India, and Australia), with a narrow seaway (the Tethys) opening between them.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "laurasia-gondwana-separate",
        "name": "Laurasia and Gondwana drift apart",
        "era_mya": -150,
        "era_label": "il y a ~150 millions d'années",
        "fusion_factor": 0.62,
        "labels": [
            {"text": "LAURASIA", "group": "Eurasia", "lat": 50, "lon": 40, "size": 16},
            {"text": "Afrique / Amérique du Sud", "group": "Africa", "lat": -8, "lon": 5, "size": 13},
            {"text": "Inde", "group": "India", "lat": 15, "lon": 75, "size": 10},
            {"text": "Antarctique / Australie", "group": "Antarctica", "lat": -70, "lon": 60, "size": 10},
        ],
        "summary": "By the late Jurassic, the two supercontinents had drifted further apart. Africa and South America were still joined as part of Gondwana; India had already broken away as an isolated island, beginning its long journey north toward Asia.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "atlantic-opening",
        "name": "The Atlantic Ocean opens",
        "era_mya": -100,
        "era_label": "il y a ~100 millions d'années",
        "fusion_factor": 0.42,
        "labels": [
            {"text": "Amérique du Nord", "group": "NorthAmerica", "lat": 45, "lon": -100, "size": 12},
            {"text": "Eurasie", "group": "Eurasia", "lat": 55, "lon": 60, "size": 13},
            {"text": "Amérique du Sud", "group": "SouthAmerica", "lat": -15, "lon": -60, "size": 12},
            {"text": "AFRIQUE", "group": "Africa", "lat": 3, "lon": 20, "size": 15},
            {"text": "Inde", "group": "India", "lat": 15, "lon": 75, "size": 10},
            {"text": "Antarctique / Australie", "group": "Antarctica", "lat": -70, "lon": 80, "size": 10},
            {"text": "Océan Atlantique (nouveau)", "group": None, "lat": -5, "lon": -25, "size": 10},
        ],
        "summary": "The South Atlantic Ocean had begun opening between Africa and South America, a rift still widening today at a few centimeters per year — roughly the speed fingernails grow.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "end-cretaceous",
        "name": "The end of the dinosaurs",
        "era_mya": -66,
        "era_label": "il y a ~66 millions d'années",
        "fusion_factor": 0.22,
        "labels": [
            {"text": "Amérique du Nord", "group": "NorthAmerica", "lat": 45, "lon": -100, "size": 12},
            {"text": "Eurasie", "group": "Eurasia", "lat": 55, "lon": 60, "size": 13},
            {"text": "Amérique du Sud", "group": "SouthAmerica", "lat": -15, "lon": -60, "size": 12},
            {"text": "AFRIQUE", "group": "Africa", "lat": 3, "lon": 20, "size": 15},
            {"text": "Inde (proche de l'Asie)", "group": "India", "lat": 15, "lon": 75, "size": 10},
            {"text": "Antarctique", "group": "Antarctica", "lat": -75, "lon": 20, "size": 11},
            {"text": "Australie", "group": "Australia", "lat": -25, "lon": 135, "size": 10},
        ],
        "summary": "At the moment of the asteroid impact that ended the age of dinosaurs, Earth's continents were recognizably close to their modern shapes and positions, though India had not yet collided with Asia and Australia was still attached to Antarctica.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "india-collision",
        "name": "India collides with Asia",
        "era_mya": -35,
        "era_label": "il y a ~35 millions d'années",
        "fusion_factor": 0.10,
        "labels": [
            {"text": "Eurasie", "group": "Eurasia", "lat": 55, "lon": 60, "size": 13},
            {"text": "Himalaya (naissant)", "group": "India", "lat": 28, "lon": 82, "size": 10},
            {"text": "Amérique du Nord", "group": "NorthAmerica", "lat": 45, "lon": -100, "size": 12},
            {"text": "Amérique du Sud", "group": "SouthAmerica", "lat": -15, "lon": -60, "size": 12},
            {"text": "AFRIQUE", "group": "Africa", "lat": 3, "lon": 20, "size": 15},
            {"text": "Antarctique", "group": "Antarctica", "lat": -80, "lon": 0, "size": 11},
            {"text": "Australie", "group": "Australia", "lat": -25, "lon": 135, "size": 11},
        ],
        "summary": "India's collision with Asia, beginning around 50 million years ago and continuing today, pushed up the Himalayas and the Tibetan Plateau — still rising a few millimeters each year. Australia had also fully separated from Antarctica and begun drifting north.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "near-modern-world",
        "name": "A near-modern world",
        "era_mya": -14,
        "era_label": "il y a ~14 millions d'années",
        "fusion_factor": 0.03,
        "labels": [
            {"text": "AFRIQUE", "group": "Africa", "lat": 3, "lon": 20, "size": 15},
            {"text": "Eurasie", "group": "Eurasia", "lat": 55, "lon": 60, "size": 13},
            {"text": "Amérique du Nord", "group": "NorthAmerica", "lat": 45, "lon": -100, "size": 12},
            {"text": "Amérique du Sud", "group": "SouthAmerica", "lat": -15, "lon": -60, "size": 12},
            {"text": "Antarctique", "group": "Antarctica", "lat": -80, "lon": 0, "size": 11},
            {"text": "Australie", "group": "Australia", "lat": -25, "lon": 135, "size": 11},
        ],
        "summary": "By the Miocene, continents had drifted very close to today's positions; ongoing changes since then are subtle (a few centimeters per year) compared to the dramatic rifting of Pangaea.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
]

__all__ = ["PLATE_TECTONICS_EPOCHS"]
