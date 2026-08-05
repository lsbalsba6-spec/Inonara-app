"""Autonomous Source objects for the Gabon/Central Africa pilot.

Every source is categorized A-E per the hierarchy established across the
five research dossiers (Gabon/Gabão, Kongo, Loango, Mpongwè/Myènè, Fang
migration). A source citation here validates ONLY the specific claim it was
found to support during that research — it is not a blanket endorsement of
every fact attached to it elsewhere.
"""
from ..builders import make_source

# --- Category A: archive, legal text, contemporary primary source ---
SRC_JORF_AEF_1910 = make_source(
    "Décret du 15 janvier 1910 (Journal officiel de la République française), création du gouvernement général de l'AEF",
    category="A",
)
SRC_JO_COMMUNAUTE_1958 = make_source(
    "Journal officiel de la Communauté / Journal officiel de l'AEF (1er janvier 1959), proclamation de la République gabonaise comme État membre",
    category="A",
)
SRC_JO_INDEPENDANCE_1960 = make_source(
    "Journal officiel (accord de transfert de compétences, 15 juillet 1960 ; documents entourant la proclamation du 17 août 1960)",
    category="A",
)

# --- Category B: specialized academic publication ---
SRC_THORNTON_2001 = make_source(
    "Thornton, John K. (2001), 'The Origins and Early History of the Kingdom of Kongo, c. 1350-1550', International Journal of African Historical Studies 34(1), 89-120",
    category="B",
)
SRC_BUCHER_1977 = make_source(
    "Bucher, Henry H. Jr. (1977), 'The Settlement of the Mpongwe clans in the Gabon estuary: an historical synthesis', Revue française d'histoire d'outre-mer, tome 64, n°235, pp. 149-175",
    category="B",
)
SRC_MARTIN_1972 = make_source(
    "Martin, Phyllis (1972), The External Trade of the Loango Coast, 1576-1870, Oxford: Clarendon Press",
    category="B",
)
SRC_MEDCRAVE_FANG_2023 = make_source(
    "MedCrave (2023), 'The Fang-Bulu-Beti (1665-1850): origin and migrations in Central Africa' — historiographical analysis crossing sources 1819-2018",
    category="B",
)
SRC_ALEXANDRE_BINET = make_source(
    "Alexandre, P. & Binet, J., Le groupe dit pahouin (cité par l'analyse critique académique sur le mythe des migrations fang)",
    category="B",
)
SRC_BALANDIER = make_source(
    "Balandier, G., Sociologie actuelle de l'Afrique noire (cité par l'analyse critique académique sur le mythe des migrations fang)",
    category="B",
)

# --- Category C: institutional publication or recognized specialized encyclopedia ---
SRC_UNIVERSALIS_LIBREVILLE = make_source(
    "Encyclopédie Universalis, article 'Libreville' (contact portugais 1472, nom Gabão)",
    category="C",
)
SRC_BRITANNICA_KONGO = make_source(
    "Encyclopaedia Britannica, article on the Kingdom of Kongo (Mbwila, Pedro IV restoration, provinces)",
    category="C",
)
SRC_BRITANNICA_LOANGO = make_source(
    "Encyclopaedia Britannica, article on the Kingdom of Loango",
    category="C",
)
SRC_BRITANNICA_FANG = make_source(
    "Encyclopaedia Britannica, article 'Fang' (linguistic subgroups Beti/Bulu/Fang)",
    category="C",
)
SRC_IRD_SALLEE = make_source(
    "Sallée, Pierre (Institut de recherche pour le développement — IRD), document citing Abbé André Raponda-Walker, Notes d'histoire du Gabon (1960) and Paul du Chaillu's travel account (1863)",
    category="C",
)
SRC_RAPONDA_WALKER_1960 = make_source(
    "Raponda-Walker, André (Mgr), Notes d'histoire du Gabon, Montpellier, 1960 (BNF 33148611) — texte reproduit consulté",
    category="B",  # authored academic/ethnographic monograph by a recognized specialist, not merely institutional
)
SRC_MJP_UNIV_PERPIGNAN = make_source(
    "Université de Perpignan — Mentions Jurisprudentielles et Politiques (mjp.univ-perp.fr), citant le Journal officiel de la République française (décrets 1886, 1888, 1891) et le Journal officiel de la Communauté (1958-1960)",
    category="A",  # the underlying cited documents are primary legal texts; the site itself compiles/reproduces them
)
SRC_SOROSORO = make_source(
    "Sorosoro (programme de documentation linguistique), fiche 'Le mpongwè' — classification Mpongwè/ensemble myènè",
    category="C",
)

# --- Category D: press, embassy, institutional popularization ---
SRC_AGP_INDEPENDENCE = make_source(
    "Agence Gabonaise de Presse (AGP), récit de la proclamation d'indépendance du 17 août 1960",
    category="D",
)
SRC_AMBASSADE_GABON = make_source(
    "Ambassade du Gabon, notes historiques sur les décrets coloniaux (dates de séparation Gabon/Congo)",
    category="D",
)

# --- Category E: Wikipedia, secondary wiki, blog, general-audience site (kept as leads only) ---
SRC_WIKIPEDIA_KONGO_1914 = make_source(
    "Wikipédia (anglais), article 'Kingdom of Kongo' — abolition de la monarchie en 1914, restauration honorifique 1915",
    category="E",
)
SRC_WIKIPEDIA_LOUIS_TREATY_1842 = make_source(
    "Wikipédia (anglais), article 'Anguilè Ré-Dowé' — traité du 18 mars 1842, transfert de souveraineté explicite",
    category="E",
)
SRC_TIDRIDGE_PDF = make_source(
    "PDF non identifié précisément avec certitude académique ('Collapse of the Kingdom of Kongo', attribution Tidridge) — retrait de la garnison portugaise en 1866",
    category="D",  # not confirmed as academic; treated conservatively as D, not B
)
SRC_MIBOUE_TOPONYME = make_source(
    "Miboue (site de vulgarisation historique gabonaise) — toponyme mpongwè 'Arongo-mbé-Ndiwa', citant implicitement du Chaillu (1855)",
    category="E",
)
SRC_EXPEDITIONS_DUCRET_LOANGO_1883 = make_source(
    "Expeditions Ducret — traité Cordier de 1883 établissant la souveraineté française sur Loango (source unique, non académique)",
    category="E",
)

__all__ = [name for name in dir() if name.startswith("SRC_")]
