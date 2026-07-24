"""Plate tectonics / continental drift snapshots — Pangaea to today.

IMPORTANT — scope and honesty note, please read before using this data:

This is a SEPARATE, purely geological mode from the rest of the Atlas map. It
has NOTHING to do with human migration, empires, or diaspora — continental
drift operates on a scale of hundreds of millions of years, while Homo sapiens
is roughly 300,000 years old. Pangaea finished breaking apart tens of millions
of years before humans existed. This mode must never be combined with the
historical-polities or paleo-geography (land bridge) layers, and the UI must
keep it clearly labeled as a separate "geological epoch" mode.

Precision note: real, scientifically precise paleogeographic reconstructions
require plate-rotation modeling software (e.g. GPlates) and datasets (e.g. the
Scotese PALEOMAP Project) that aren't available in this environment. The
polygons below are DELIBERATELY SIMPLIFIED SCHEMATIC SHAPES for educational
illustration only — they convey the correct story (one landmass, splitting,
drifting toward today's arrangement) but are not precise paleo-coordinates.
The frontend must present this as "simplified schematic, not to scale,"
and should point interested users to the PALEOMAP Project or GPlates for
scientifically precise reconstructions.

Each entry: {id, name, era_mya (millions of years ago, negative = past),
era_label, landmasses: [{name, polygon: [[lat, lon], ...]}], summary, sources}.
"""

PLATE_TECTONICS_EPOCHS = [
    {
        "id": "pangaea-assembly",
        "name": "Pangaea assembles",
        "era_mya": -300,
        "era_label": "il y a ~300 millions d'années",
        "landmasses": [
            {
                "name": "Pangaea",
                "polygon": [
                    [70, -30], [60, 40], [30, 60], [0, 50], [-30, 40],
                    [-60, 10], [-50, -40], [-10, -60], [30, -50],
                    [50, -30], [65, -50], [70, -30],
                ],
            },
        ],
        "summary": "Almost all of Earth's landmass was joined into a single supercontinent, Pangaea, surrounded by one global ocean (Panthalassa). This is roughly 300 million years before the first Homo sapiens.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)", "Standard Permian-period plate tectonic reconstructions"],
    },
    {
        "id": "pangaea-rifting",
        "name": "Pangaea begins to rift",
        "era_mya": -200,
        "era_label": "il y a ~200 millions d'années",
        "landmasses": [
            {
                "name": "Laurasia (north)",
                "polygon": [[75, -20], [60, 50], [40, 70], [20, 40], [30, -10], [55, -40], [75, -20]],
            },
            {
                "name": "Gondwana (south)",
                "polygon": [[10, -60], [-10, 40], [-40, 50], [-60, 10], [-40, -50], [-10, -70], [10, -60]],
            },
        ],
        "summary": "Around the Triassic-Jurassic boundary, Pangaea began splitting into a northern supercontinent (Laurasia — future North America, Europe, and most of Asia) and a southern one (Gondwana — future Africa, South America, Antarctica, India, and Australia), with a narrow seaway (the Tethys) opening between them.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "laurasia-gondwana-separate",
        "name": "Laurasia and Gondwana drift apart",
        "era_mya": -150,
        "era_label": "il y a ~150 millions d'années",
        "landmasses": [
            {
                "name": "Laurasia",
                "polygon": [[78, -10], [65, 55], [45, 75], [25, 45], [35, -5], [58, -35], [78, -10]],
            },
            {
                "name": "Gondwana (Africa-South America still joined)",
                "polygon": [[5, -55], [-15, 35], [-45, 45], [-65, 5], [-45, -45], [-15, -65], [5, -55]],
            },
            {
                "name": "India (island, heading toward Asia)",
                "polygon": [[-15, 55], [-25, 65], [-35, 60], [-30, 50], [-15, 55]],
            },
        ],
        "summary": "By the late Jurassic, the two supercontinents had drifted further apart. Africa and South America were still joined as part of Gondwana; India had already broken away as an isolated island, beginning its long journey north toward Asia.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "atlantic-opening",
        "name": "The Atlantic Ocean opens",
        "era_mya": -100,
        "era_label": "il y a ~100 millions d'années",
        "landmasses": [
            {
                "name": "North America",
                "polygon": [[70, -140], [55, -60], [30, -80], [25, -110], [50, -150], [70, -140]],
            },
            {
                "name": "Eurasia",
                "polygon": [[75, 0], [60, 100], [30, 130], [20, 60], [40, 10], [75, 0]],
            },
            {
                "name": "South America",
                "polygon": [[10, -75], [-20, -35], [-55, -65], [-40, -80], [-5, -85], [10, -75]],
            },
            {
                "name": "Africa",
                "polygon": [[35, -15], [10, 45], [-30, 40], [-35, 15], [-10, -15], [15, -20], [35, -15]],
            },
            {
                "name": "India (still isolated, mid-ocean)",
                "polygon": [[-5, 65], [-20, 78], [-30, 70], [-22, 58], [-5, 65]],
            },
        ],
        "summary": "The South Atlantic Ocean had begun opening between Africa and South America, a rift still widening today at a few centimeters per year — roughly the speed fingernails grow.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "end-cretaceous",
        "name": "The end of the dinosaurs",
        "era_mya": -66,
        "era_label": "il y a ~66 millions d'années",
        "landmasses": [
            {
                "name": "North America",
                "polygon": [[72, -145], [50, -55], [25, -85], [22, -115], [48, -155], [72, -145]],
            },
            {
                "name": "Eurasia",
                "polygon": [[78, -5], [62, 110], [28, 135], [18, 55], [42, 5], [78, -5]],
            },
            {
                "name": "South America",
                "polygon": [[12, -78], [-22, -33], [-56, -68], [-42, -82], [-8, -87], [12, -78]],
            },
            {
                "name": "Africa",
                "polygon": [[38, -18], [12, 48], [-32, 42], [-38, 18], [-12, -18], [18, -22], [38, -18]],
            },
            {
                "name": "India (nearing Asia)",
                "polygon": [[8, 70], [-18, 85], [-28, 75], [-15, 62], [8, 70]],
            },
            {
                "name": "Australia (still attached to Antarctica)",
                "polygon": [[-35, 110], [-55, 135], [-70, 120], [-60, 95], [-35, 110]],
            },
        ],
        "summary": "At the moment of the asteroid impact that ended the age of dinosaurs, Earth's continents were recognizably close to their modern shapes and positions, though India had not yet collided with Asia and Australia was still attached to Antarctica.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "india-collision",
        "name": "India collides with Asia",
        "era_mya": -35,
        "era_label": "il y a ~35 millions d'années",
        "landmasses": [
            {
                "name": "Eurasia (with India now attached, Himalayas rising)",
                "polygon": [[78, -5], [62, 145], [5, 95], [15, 65], [42, 5], [78, -5]],
            },
            {
                "name": "Africa",
                "polygon": [[38, -18], [12, 48], [-32, 42], [-38, 18], [-12, -18], [18, -22], [38, -18]],
            },
            {
                "name": "Australia (now separated from Antarctica)",
                "polygon": [[-10, 112], [-28, 155], [-45, 140], [-35, 112], [-10, 112]],
            },
        ],
        "summary": "India's collision with Asia, beginning around 50 million years ago and continuing today, pushed up the Himalayas and the Tibetan Plateau — still rising a few millimeters each year. Australia had also fully separated from Antarctica and begun drifting north.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
    {
        "id": "near-modern-world",
        "name": "A near-modern world",
        "era_mya": -14,
        "era_label": "il y a ~14 millions d'années",
        "landmasses": [
            {"name": "Africa", "polygon": [[37, -17], [14, 50], [-34, 43], [-35, 19], [-11, -17], [19, -20], [37, -17]]},
            {"name": "Eurasia", "polygon": [[78, -8], [60, 148], [8, 100], [16, 68], [40, 8], [78, -8]]},
            {"name": "North America", "polygon": [[72, -168], [48, -55], [22, -85], [20, -120], [50, -168], [72, -168]]},
            {"name": "South America", "polygon": [[12, -80], [-20, -35], [-55, -70], [-42, -80], [-8, -85], [12, -80]]},
            {"name": "Australia", "polygon": [[-10, 112], [-28, 155], [-45, 140], [-35, 112], [-10, 112]]},
        ],
        "summary": "By the Miocene, continents had drifted very close to today's positions; ongoing changes since then are subtle (a few centimeters per year) compared to the dramatic rifting of Pangaea.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
]

__all__ = ["PLATE_TECTONICS_EPOCHS"]
