"""South Africa: society, public systems, national symbols and international role.

This module is additive. It deliberately avoids live indicators unless they are
explicitly dated, and it does not turn institutional membership into a claim of
political agreement or uniform national identity.
"""

SOUTH_AFRICA_SOCIETY_STATE = {
    "society": {
        "intro": (
            "La société sud-africaine contemporaine est marquée par une forte diversité linguistique, "
            "culturelle, religieuse et régionale, mais aussi par des inégalités héritées de la colonisation, "
            "de la ségrégation et de l'apartheid. Les catégories officielles et statistiques peuvent aider à "
            "décrire certaines réalités, sans résumer les identités vécues ni les trajectoires individuelles."
        ),
        "themes": [
            {
                "title": "Citoyenneté et ordre constitutionnel",
                "text": "La Constitution de 1996 est la loi suprême. Elle comprend une Déclaration des droits et encadre les institutions nationales, provinciales et locales.",
                "status": "ready",
                "sourceIds": ["src-constitution-1996"],
            },
            {
                "title": "Diversité et identités",
                "text": "Les appartenances linguistiques, culturelles, religieuses, familiales et régionales se recoupent. Aucune catégorie unique ne doit être utilisée comme raccourci pour décrire toute la population.",
                "status": "ready",
                "sourceIds": ["src-statssa-census-2022", "src-gov-people"],
            },
            {
                "title": "Inégalités persistantes",
                "text": "Les écarts de revenus, de patrimoine, d'accès à l'emploi, au logement, à l'éducation et aux services restent profondément liés à l'histoire spatiale et économique de l'apartheid.",
                "status": "ready",
                "sourceIds": ["src-worldbank-inclusive-growth-2025"],
            },
            {
                "title": "Urbanisation et territoires",
                "text": "Les grandes métropoles concentrent une part importante de la population, de l'emploi et des infrastructures, tandis que les réalités rurales, périurbaines et municipales restent très contrastées.",
                "status": "provisional",
                "sourceIds": ["src-statssa-census-2022"],
            },
        ],
    },
    "education_health": {
        "education": {
            "intro": "Le droit à l'éducation de base est garanti par la Constitution. Le système public distingue l'éducation de base, de Grade R à Grade 12, et l'enseignement supérieur et la formation.",
            "items": [
                {
                    "title": "Éducation de base",
                    "text": "Le Department of Basic Education est responsable des écoles de Grade R à Grade 12 ainsi que de programmes d'alphabétisation des adultes.",
                    "status": "ready",
                    "sourceIds": ["src-gov-education", "src-dbe-about"],
                },
                {
                    "title": "Grade R",
                    "text": "La législation éducative récente a renforcé l'intégration du Grade R dans la phase fondamentale du système public.",
                    "status": "ready",
                    "sourceIds": ["src-dbe-grade-r-2025"],
                },
                {
                    "title": "Enseignement supérieur",
                    "text": "Les universités, universités de technologie et collèges de formation professionnelle jouent un rôle central dans la formation, la recherche et la mobilité sociale.",
                    "status": "provisional",
                    "sourceIds": ["src-gov-education"],
                },
                {
                    "title": "Accès et qualité",
                    "text": "Les écarts de ressources, d'infrastructures, de résultats et d'accès au numérique restent importants entre établissements et territoires.",
                    "status": "provisional",
                    "sourceIds": ["src-statssa-education-2024"],
                },
            ],
        },
        "health": {
            "intro": "Le National Health Act de 2003 organise un système de santé structuré entre les différents niveaux de gouvernement. Le pays combine un secteur public majeur et un secteur privé.",
            "items": [
                {
                    "title": "Cadre national",
                    "text": "Le Department of Health définit le cadre national, tandis que les provinces jouent un rôle essentiel dans la fourniture des services.",
                    "status": "ready",
                    "sourceIds": ["src-gov-health"],
                },
                {
                    "title": "Prévention et santé publique",
                    "text": "La politique sanitaire inclut la prévention des maladies, la promotion de modes de vie sains, la santé maternelle et infantile, les maladies transmissibles et non transmissibles.",
                    "status": "ready",
                    "sourceIds": ["src-gov-health"],
                },
                {
                    "title": "Assurance maladie nationale",
                    "text": "Le National Health Insurance Act a été promulgué en 2024 comme cadre de réforme vers une couverture sanitaire universelle. Sa mise en œuvre est progressive et reste un chantier de long terme.",
                    "status": "ready",
                    "sourceIds": ["src-presidency-nhi-2024", "src-health-nhi"],
                },
                {
                    "title": "Inégalités d'accès",
                    "text": "La qualité, la disponibilité du personnel, les délais et les infrastructures varient fortement selon les territoires et les secteurs public et privé.",
                    "status": "provisional",
                    "sourceIds": ["src-gov-health"],
                },
            ],
        },
    },
    "national_symbols": {
        "intro": "Les symboles nationaux appartiennent à l'État démocratique contemporain. Ils ne doivent pas être utilisés pour effacer les symboles plus anciens, les mémoires politiques ou les identités locales.",
        "items": [
            {
                "title": "Drapeau national",
                "text": "Le drapeau actuel est entré en usage le 27 avril 1994. Son dessin est couramment interprété comme la convergence d'éléments divers avançant ensemble.",
                "status": "ready",
                "sourceIds": ["src-national-archives-symbols", "src-dsac-flag"],
            },
            {
                "title": "Armoiries",
                "text": "Les armoiries nationales sont le plus haut symbole visuel de l'État. Elles ont été lancées en 2000 et portent la devise !ke e: /xarra //ke, généralement traduite par « des peuples divers s'unissent ».",
                "status": "ready",
                "sourceIds": ["src-gov-coat-arms", "src-presidency-symbols"],
            },
            {
                "title": "Hymne national",
                "text": "L'hymne combine des parties de Nkosi Sikelel' iAfrika et Die Stem/The Call of South Africa et est chanté dans cinq langues.",
                "status": "ready",
                "sourceIds": ["src-dirco-anthem", "src-gov-national-symbols"],
            },
            {
                "title": "Symboles naturels",
                "text": "Les symboles officiels incluent notamment le springbok, la grue de paradis, le galjoen, le protéa royal et le yellowwood véritable.",
                "status": "ready",
                "sourceIds": ["src-gov-symbols-index"],
            },
        ],
    },
    "international_role": {
        "intro": "La politique extérieure sud-africaine s'inscrit dans des cadres africains, régionaux et multilatéraux. Une adhésion institutionnelle ne signifie pas une position uniforme sur tous les dossiers internationaux.",
        "memberships": [
            {
                "title": "Union africaine",
                "text": "L'Afrique du Sud participe aux institutions de l'Union africaine et aux initiatives continentales de paix, de sécurité et de développement.",
                "status": "ready",
                "sourceIds": ["src-dirco-multilateral-africa"],
            },
            {
                "title": "SADC et SACU",
                "text": "Le pays est membre de la Southern African Development Community et de la Southern African Customs Union, deux cadres essentiels de coopération régionale.",
                "status": "ready",
                "sourceIds": ["src-dirco-multilateral-africa"],
            },
            {
                "title": "BRICS",
                "text": "L'Afrique du Sud a rejoint BRICS en décembre 2010 et utilise ce cadre pour promouvoir la coopération Sud-Sud et une plus grande représentation du Sud global.",
                "status": "ready",
                "sourceIds": ["src-dirco-brics"],
            },
            {
                "title": "Nations Unies et multilatéralisme",
                "text": "La diplomatie sud-africaine met officiellement en avant le multilatéralisme, les droits humains, la paix, l'égalité et le développement durable.",
                "status": "ready",
                "sourceIds": ["src-dirco-foreign-policy-2024"],
            },
        ],
    },
    "additionalSources": [
        {"id": "src-presidency-symbols", "category": "A", "title": "National Symbols", "publisher": "The Presidency of South Africa", "year": 2026, "url": "https://www.thepresidency.gov.za/national-symbols-0"},
        {"id": "src-national-archives-symbols", "category": "A", "title": "National Symbols", "publisher": "National Archives and Records Service of South Africa", "year": 2026, "url": "https://www.nationalarchives.gov.za/node/78"},
        {"id": "src-dsac-flag", "category": "A", "title": "The National Flag", "publisher": "Department of Sport, Arts and Culture", "year": 2026, "url": "https://www.dsac.gov.za/the-national-flag"},
        {"id": "src-gov-coat-arms", "category": "A", "title": "National Coat of Arms", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/national-coat-arms"},
        {"id": "src-dirco-anthem", "category": "A", "title": "National Symbols", "publisher": "South African Embassy / DIRCO", "year": 2026, "url": "https://dirco.gov.za/paris/national-symbols/"},
        {"id": "src-gov-national-symbols", "category": "A", "title": "National Symbols", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/national-symbols-0"},
        {"id": "src-gov-symbols-index", "category": "A", "title": "Where do I find information on the National Symbols?", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/faq/national-symbols/where-do-i-find-information-national-symbols"},
        {"id": "src-gov-education", "category": "A", "title": "Education", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/education"},
        {"id": "src-dbe-about", "category": "A", "title": "About Basic Education", "publisher": "Department of Basic Education", "year": 2026, "url": "https://www.education.gov.za/AboutUs/AboutDBE.aspx"},
        {"id": "src-dbe-grade-r-2025", "category": "A", "title": "ECD and Grade R as the new compulsory grade", "publisher": "Department of Basic Education", "year": 2025, "url": "https://www.education.gov.za/ArchivedDocuments/ArchivedArticles/ECDandGradeRasthenewcompulsorygradeR.aspx"},
        {"id": "src-statssa-education-2024", "category": "A", "title": "Marginalised Communities in SA Achieve New Heights in Education", "publisher": "Statistics South Africa", "year": 2024, "url": "https://www.statssa.gov.za/?p=17134"},
        {"id": "src-gov-health", "category": "A", "title": "Health", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/health"},
        {"id": "src-presidency-nhi-2024", "category": "A", "title": "National Health Insurance Act signed into law", "publisher": "The Presidency of South Africa", "year": 2024, "url": "https://www.thepresidency.gov.za/node/8149"},
        {"id": "src-health-nhi", "category": "A", "title": "NHI Resources", "publisher": "National Department of Health", "year": 2026, "url": "https://www.health.gov.za/nhi-resources/"},
        {"id": "src-dirco-multilateral-africa", "category": "A", "title": "Multilateral Partnerships", "publisher": "Department of International Relations and Cooperation", "year": 2026, "url": "https://dirco.gov.za/venezuela/multilateral-partnerships/"},
        {"id": "src-dirco-brics", "category": "A", "title": "Multilateral — BRICS", "publisher": "Department of International Relations and Cooperation", "year": 2026, "url": "https://dirco.gov.za/multilateral/"},
        {"id": "src-dirco-foreign-policy-2024", "category": "A", "title": "South Africa's Foreign Policy", "publisher": "Department of International Relations and Cooperation", "year": 2024, "url": "https://dirco.gov.za/presidency-asserts-responsibility-and-stance-on-south-africas-foreign-policy/"},
    ],
}
