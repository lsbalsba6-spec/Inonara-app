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
polygons below are DELIBERATELY IMPROVED SCHEMATIC SHAPES for educational
illustration — designed to be recognizable (Africa's Horn, South America's
eastward bulge, India's triangular wedge, etc., fused in the broadly correct
Pangaea arrangement) but are NOT precise paleo-coordinates. The frontend must
present this as "schéma simplifié, pas à l'échelle," and should point
interested users to the PALEOMAP Project or GPlates for scientifically
precise reconstructions.

Each entry: {id, name, era_mya (millions of years ago, negative = past),
era_label, landmasses: [{name, polygon: [[lat, lon], ...]}],
labels: [{text, lat, lon, size}] (permanent on-map text, not just popup),
summary, sources}.
"""

PLATE_TECTONICS_EPOCHS = [
    {
        "id": "pangaea-assembly",
        "name": "Pangaea assembles",
        "era_mya": -300,
        "era_label": "il y a ~300 millions d'années",
        "landmasses": [
            {
                # Fused Africa (center-left) + South America (bulging west) +
                # North America/Eurasia (north) + India/Antarctica/Australia (south/east),
                # traced as one connected silhouette in the classic Pangaea arrangement.
                "name": "Pangaea",
                "polygon": [
                    [72, -10], [68, 20], [62, 45], [55, 70], [48, 95], [45, 120],
                    [38, 130], [25, 122], [15, 110], [5, 100], [-8, 105], [-20, 115],
                    [-35, 128], [-48, 118], [-58, 95], [-62, 60], [-58, 30], [-50, 5],
                    [-40, -20], [-30, -35], [-15, -42], [0, -45], [15, -42], [28, -35],
                    [35, -25], [40, -10], [45, 5], [50, -15], [58, -30], [65, -25],
                    [72, -10],
                ],
            },
        ],
        "labels": [
            {"text": "PANGÉE", "lat": 5, "lon": 20, "size": 22},
            {"text": "(future Afrique)", "lat": -15, "lon": 15, "size": 11},
            {"text": "(future Amérique du Sud)", "lat": -30, "lon": -25, "size": 11},
            {"text": "(future Eurasie)", "lat": 55, "lon": 60, "size": 11},
            {"text": "(future Inde)", "lat": -5, "lon": 100, "size": 11},
            {"text": "(future Antarctique / Australie)", "lat": -45, "lon": 105, "size": 10},
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
                "name": "Laurasia (nord)",
                "polygon": [
                    [78, -15], [72, 15], [65, 45], [55, 75], [48, 100], [42, 122],
                    [30, 118], [22, 100], [25, 75], [30, 45], [35, 15], [42, -15],
                    [55, -35], [68, -30], [78, -15],
                ],
            },
            {
                "name": "Gondwana (sud)",
                "polygon": [
                    [10, -45], [5, -20], [-2, 5], [-10, 30], [-18, 55], [-28, 78],
                    [-40, 95], [-55, 110], [-65, 85], [-62, 55], [-55, 25], [-45, -5],
                    [-35, -30], [-20, -45], [-5, -50], [10, -45],
                ],
            },
        ],
        "labels": [
            {"text": "LAURASIA", "lat": 45, "lon": 30, "size": 18},
            {"text": "GONDWANA", "lat": -30, "lon": 20, "size": 18},
            {"text": "Mer de Téthys", "lat": 10, "lon": 55, "size": 11},
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
                "polygon": [
                    [80, -12], [73, 20], [65, 50], [55, 80], [48, 105], [40, 128],
                    [28, 122], [22, 102], [26, 78], [32, 50], [38, 20], [45, -12],
                    [58, -32], [70, -28], [80, -12],
                ],
            },
            {
                "name": "Afrique + Amérique du Sud (encore soudées)",
                "polygon": [
                    [5, -50], [0, -25], [-6, 2], [-14, 28], [-22, 52], [-32, 75],
                    [-44, 92], [-58, 78], [-56, 50], [-48, 20], [-38, -8], [-25, -30],
                    [-10, -48], [5, -50],
                ],
            },
            {
                "name": "Inde (île, en route vers l'Asie)",
                "polygon": [[-8, 62], [-20, 72], [-32, 66], [-28, 55], [-14, 52], [-8, 62]],
            },
            {
                "name": "Antarctique + Australie",
                "polygon": [[-48, 88], [-58, 105], [-70, 98], [-66, 78], [-52, 78], [-48, 88]],
            },
        ],
        "labels": [
            {"text": "LAURASIA", "lat": 45, "lon": 35, "size": 17},
            {"text": "AFRIQUE / AMÉRIQUE DU SUD", "lat": -20, "lon": 5, "size": 14},
            {"text": "INDE", "lat": -20, "lon": 62, "size": 12},
            {"text": "ANTARCTIQUE / AUSTRALIE", "lat": -58, "lon": 90, "size": 11},
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
                "name": "Amérique du Nord",
                "polygon": [[72, -145], [58, -120], [48, -100], [30, -95], [22, -105], [28, -130], [45, -155], [60, -160], [72, -145]],
            },
            {
                "name": "Eurasie",
                "polygon": [[75, -5], [65, 40], [55, 80], [45, 115], [30, 130], [22, 105], [28, 70], [38, 35], [48, 0], [60, -20], [75, -5]],
            },
            {
                "name": "Amérique du Sud",
                "polygon": [[10, -78], [-5, -60], [-20, -48], [-38, -55], [-52, -70], [-45, -82], [-25, -88], [-5, -85], [10, -78]],
            },
            {
                "name": "Afrique",
                "polygon": [[35, -18], [22, 15], [8, 42], [-8, 48], [-25, 42], [-33, 22], [-30, -5], [-15, -18], [5, -22], [20, -22], [35, -18]],
            },
            {
                "name": "Inde (île, océan ouvert)",
                "polygon": [[-2, 62], [-15, 75], [-28, 68], [-24, 55], [-10, 52], [-2, 62]],
            },
            {
                "name": "Antarctique / Australie",
                "polygon": [[-52, 85], [-62, 108], [-72, 100], [-68, 78], [-55, 78], [-52, 85]],
            },
        ],
        "labels": [
            {"text": "Amérique du Nord", "lat": 45, "lon": -125, "size": 12},
            {"text": "Eurasie", "lat": 50, "lon": 50, "size": 13},
            {"text": "Amérique du Sud", "lat": -25, "lon": -68, "size": 12},
            {"text": "AFRIQUE", "lat": 0, "lon": 15, "size": 15},
            {"text": "Inde", "lat": -16, "lon": 62, "size": 10},
            {"text": "Antarctique / Australie", "lat": -62, "lon": 92, "size": 10},
            {"text": "Océan Atlantique (nouveau)", "lat": -5, "lon": -35, "size": 10},
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
                "name": "Amérique du Nord",
                "polygon": [[74, -150], [58, -122], [48, -100], [28, -92], [20, -108], [28, -135], [48, -160], [64, -165], [74, -150]],
            },
            {
                "name": "Eurasie",
                "polygon": [[78, -8], [65, 45], [55, 90], [45, 122], [28, 135], [18, 108], [26, 72], [36, 35], [46, -2], [60, -22], [78, -8]],
            },
            {
                "name": "Amérique du Sud",
                "polygon": [[12, -80], [-4, -62], [-22, -50], [-40, -58], [-56, -72], [-48, -85], [-25, -90], [-4, -87], [12, -80]],
            },
            {
                "name": "Afrique",
                "polygon": [[38, -20], [24, 18], [10, 45], [-10, 50], [-30, 44], [-38, 22], [-35, -8], [-18, -20], [5, -24], [22, -24], [38, -20]],
            },
            {
                "name": "Inde (proche de l'Asie)",
                "polygon": [[6, 68], [-16, 82], [-28, 74], [-20, 60], [6, 68]],
            },
            {
                "name": "Antarctique",
                "polygon": [[-58, 60], [-68, 110], [-78, 90], [-72, 40], [-58, 60]],
            },
            {
                "name": "Australie (encore proche de l'Antarctique)",
                "polygon": [[-32, 112], [-45, 148], [-58, 130], [-50, 105], [-32, 112]],
            },
        ],
        "labels": [
            {"text": "Amérique du Nord", "lat": 48, "lon": -128, "size": 12},
            {"text": "Eurasie", "lat": 52, "lon": 55, "size": 13},
            {"text": "Amérique du Sud", "lat": -28, "lon": -70, "size": 12},
            {"text": "AFRIQUE", "lat": -2, "lon": 18, "size": 15},
            {"text": "Inde", "lat": -10, "lon": 72, "size": 10},
            {"text": "Antarctique", "lat": -68, "lon": 70, "size": 11},
            {"text": "Australie", "lat": -42, "lon": 125, "size": 10},
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
                "name": "Eurasie (Inde désormais rattachée, Himalaya en formation)",
                "polygon": [[78, -8], [62, 40], [50, 90], [30, 130], [8, 100], [5, 75], [18, 62], [30, 40], [42, 5], [60, -22], [78, -8]],
            },
            {
                "name": "Amérique du Nord",
                "polygon": [[75, -155], [58, -125], [46, -100], [25, -90], [18, -110], [28, -140], [50, -165], [66, -170], [75, -155]],
            },
            {
                "name": "Amérique du Sud",
                "polygon": [[13, -81], [-3, -63], [-22, -50], [-42, -60], [-56, -74], [-48, -87], [-24, -92], [-3, -89], [13, -81]],
            },
            {
                "name": "Afrique",
                "polygon": [[40, -20], [26, 20], [12, 46], [-8, 52], [-30, 45], [-38, 22], [-35, -8], [-18, -22], [5, -25], [24, -25], [40, -20]],
            },
            {
                "name": "Antarctique",
                "polygon": [[-60, 40], [-70, 120], [-80, 90], [-75, 20], [-60, 40]],
            },
            {
                "name": "Australie (séparée de l'Antarctique)",
                "polygon": [[-10, 112], [-22, 155], [-38, 148], [-30, 115], [-10, 112]],
            },
        ],
        "labels": [
            {"text": "Amérique du Nord", "lat": 50, "lon": -132, "size": 12},
            {"text": "Eurasie", "lat": 48, "lon": 60, "size": 13},
            {"text": "Himalaya (naissant)", "lat": 28, "lon": 82, "size": 10},
            {"text": "Amérique du Sud", "lat": -30, "lon": -72, "size": 12},
            {"text": "AFRIQUE", "lat": -3, "lon": 15, "size": 15},
            {"text": "Antarctique", "lat": -70, "lon": 60, "size": 11},
            {"text": "Australie", "lat": -25, "lon": 133, "size": 11},
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
            {"name": "Afrique", "polygon": [[37, -17], [24, 20], [10, 44], [-10, 51], [-30, 44], [-35, 19], [-11, -17], [19, -20], [37, -17]]},
            {"name": "Eurasie", "polygon": [[78, -8], [62, 42], [48, 92], [28, 132], [8, 100], [16, 68], [40, 8], [78, -8]]},
            {"name": "Amérique du Nord", "polygon": [[72, -168], [50, -128], [22, -85], [20, -118], [50, -168], [72, -168]]},
            {"name": "Amérique du Sud", "polygon": [[12, -80], [-20, -35], [-55, -70], [-42, -80], [-8, -85], [12, -80]]},
            {"name": "Antarctique", "polygon": [[-62, 30], [-72, 110], [-80, 60], [-70, 10], [-62, 30]]},
            {"name": "Australie", "polygon": [[-10, 112], [-28, 155], [-45, 140], [-35, 112], [-10, 112]]},
        ],
        "labels": [
            {"text": "AFRIQUE", "lat": -3, "lon": 15, "size": 15},
            {"text": "Eurasie", "lat": 48, "lon": 62, "size": 13},
            {"text": "Amérique du Nord", "lat": 45, "lon": -110, "size": 12},
            {"text": "Amérique du Sud", "lat": -28, "lon": -70, "size": 12},
            {"text": "Antarctique", "lat": -72, "lon": 45, "size": 11},
            {"text": "Australie", "lat": -25, "lon": 133, "size": 11},
        ],
        "summary": "By the Miocene, continents had drifted very close to today's positions; ongoing changes since then are subtle (a few centimeters per year) compared to the dramatic rifting of Pangaea.",
        "sources": ["Scotese, C.R., PALEOMAP Project (paleomap.science)"],
    },
]

__all__ = ["PLATE_TECTONICS_EPOCHS"]
