"""South Africa: constitutional democracy, justice, elections and public memory.

The module favours official constitutional, judicial, electoral and Truth and
Reconciliation Commission sources. It separates legal institutions from the
unfinished social and historical work of justice and reconciliation.
"""

SOUTH_AFRICA_LAW_MEMORY = {
    "law_memory": {
        "intro": (
            "L'Afrique du Sud contemporaine repose sur une Constitution négociée après l'apartheid, "
            "un catalogue étendu de droits fondamentaux et des institutions judiciaires indépendantes. "
            "Ce cadre juridique ne signifie pas que les injustices historiques ont disparu : accès à la "
            "justice, restitution foncière, réparations, égalité matérielle et mémoire publique restent des "
            "enjeux politiques et sociaux."
        ),
        "constitutional_democracy": {
            "title": "Constitution, démocratie et droits",
            "items": [
                {
                    "title": "La Constitution de 1996",
                    "text": (
                        "Adoptée en 1996 et entrée pleinement en vigueur en 1997, la Constitution établit "
                        "une démocratie fondée sur la dignité humaine, l'égalité, les droits fondamentaux, "
                        "la primauté de la Constitution et l'État de droit. Elle organise les pouvoirs national, "
                        "provincial et local et encadre leurs relations par le principe de gouvernement coopératif."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-sa-constitution-full", "src-sa-constitution-ch1"],
                },
                {
                    "title": "Le Bill of Rights",
                    "text": (
                        "Le chapitre 2 de la Constitution protège notamment l'égalité, la dignité, la vie, "
                        "la liberté, la sécurité, la liberté d'expression, la religion, les droits politiques, "
                        "le logement, la santé, l'éducation, la culture, la langue et les droits des enfants. "
                        "Plusieurs de ces droits imposent aussi à l'État des obligations positives et progressives."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-sa-bill-rights"],
                },
                {
                    "title": "Institutions soutenant la démocratie constitutionnelle",
                    "text": (
                        "Le chapitre 9 prévoit des institutions indépendantes destinées à renforcer la démocratie, "
                        "parmi lesquelles la Public Protector, la Human Rights Commission, la Commission for Gender "
                        "Equality, l'Auditor-General et l'Electoral Commission. Leur existence ne garantit pas à elle "
                        "seule l'efficacité : leurs moyens, leur indépendance pratique et le suivi de leurs décisions "
                        "doivent être examinés séparément."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-sa-constitution-ch9"],
                },
                {
                    "title": "Élections nationales, provinciales et locales",
                    "text": (
                        "L'Electoral Commission organise les élections nationales, provinciales, municipales et "
                        "les élections partielles. Le système national conserve une représentation proportionnelle "
                        "compensatoire ; depuis la réforme appliquée aux élections de 2024, des candidats indépendants "
                        "peuvent aussi concourir pour une partie des sièges régionaux de l'Assemblée nationale."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-iec-home", "src-iec-2024-system"],
                },
                {
                    "title": "Citoyens sud-africains vivant à l'étranger",
                    "text": (
                        "Les citoyens inscrits peuvent voter à l'étranger dans les élections nationales auprès de "
                        "missions accréditées, sous réserve des règles de l'Electoral Commission. Ce droit ne s'étend "
                        "pas automatiquement aux scrutins provinciaux, régionaux ou municipaux organisés dans le pays."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-iec-voting-abroad"],
                },
            ],
        },
        "justice_system": {
            "title": "Justice et pluralisme juridique",
            "items": [
                {
                    "title": "La Cour constitutionnelle",
                    "text": (
                        "Née de la transition démocratique et installée à Constitution Hill à Johannesburg, la Cour "
                        "constitutionnelle est la juridiction suprême du pays. Elle contrôle la conformité des lois et "
                        "des actes publics à la Constitution et joue un rôle central dans la protection des droits."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-judiciary-constitutional-court", "src-justice-courts"],
                },
                {
                    "title": "Une hiérarchie de juridictions",
                    "text": (
                        "Le système comprend la Cour constitutionnelle, la Supreme Court of Appeal, les High Courts, "
                        "les Magistrates' Courts et plusieurs juridictions spécialisées, notamment en matière de travail, "
                        "de concurrence et de restitution foncière. Les compétences et voies de recours diffèrent selon "
                        "la nature civile, pénale, constitutionnelle ou spécialisée du litige."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-judiciary-system", "src-judiciary-sca", "src-judiciary-magistrates"],
                },
                {
                    "title": "Droit coutumier et autorités traditionnelles",
                    "text": (
                        "La Constitution reconnaît le droit coutumier et le rôle des autorités traditionnelles, sous "
                        "réserve de leur conformité à la Constitution et aux droits fondamentaux. Il n'existe donc pas "
                        "de séparation simple entre un droit 'moderne' et un droit 'traditionnel' : les normes, les "
                        "pratiques locales, l'égalité de genre et la jurisprudence interagissent et peuvent entrer en tension."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-sa-constitution-ch12", "src-sa-bill-rights"],
                },
                {
                    "title": "Accès à la justice",
                    "text": (
                        "L'existence de droits constitutionnels ne garantit pas un accès égal aux tribunaux. Coût des "
                        "procédures, distances, langue, connaissance des droits, délais et inégalités sociales peuvent "
                        "limiter les recours. Cette section décrit le cadre institutionnel sans présenter l'accès réel "
                        "comme uniforme sur tout le territoire."
                    ),
                    "status": "provisional",
                    "sourceIds": ["src-sa-bill-rights", "src-justice-courts"],
                },
            ],
        },
        "memory_reconciliation": {
            "title": "Mémoire, vérité et réconciliation",
            "items": [
                {
                    "title": "La Truth and Reconciliation Commission",
                    "text": (
                        "Créée après la fin de l'apartheid, la Commission Vérité et Réconciliation a recueilli des "
                        "témoignages de victimes, enquêté sur de graves violations des droits humains et examiné des "
                        "demandes d'amnistie conditionnées à une divulgation complète. Elle n'était ni un tribunal pénal "
                        "ordinaire ni une garantie de réparation intégrale pour toutes les victimes."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-trc-home", "src-trc-report-index"],
                },
                {
                    "title": "Le rapport final de 1998",
                    "text": (
                        "Le rapport final a été remis au président Nelson Mandela le 29 octobre 1998. Ses volumes "
                        "documentent le contexte des violations, les expériences des victimes, les responsabilités "
                        "institutionnelles et les recommandations. L'ensemble constitue une source majeure, mais doit "
                        "être lu avec les archives, les critiques et les témoignages qui n'ont pas tous été entendus."
                    ),
                    "status": "ready",
                    "sourceIds": ["src-trc-report-volume1", "src-trc-report-handover"],
                },
                {
                    "title": "Réconciliation sans clôture de l'histoire",
                    "text": (
                        "La notion de réconciliation reste débattue. Les audiences publiques ont créé un espace national "
                        "de reconnaissance, mais les réparations, les poursuites, les inégalités économiques, la terre "
                        "et la transmission intergénérationnelle des traumatismes demeurent des sujets non résolus. "
                        "Inonara ne présente donc pas la TRC comme ayant 'réglé' l'héritage de l'apartheid."
                    ),
                    "status": "provisional",
                    "sourceIds": ["src-trc-report-index", "src-trc-report-volume5"],
                },
                {
                    "title": "Lieux de mémoire et récits concurrents",
                    "text": (
                        "Constitution Hill, Robben Island, les musées, monuments, mémoriaux, archives familiales et "
                        "commémorations produisent des récits parfois complémentaires, parfois concurrents. La mémoire "
                        "publique dépend de qui est représenté, de la langue utilisée, du financement et de la place "
                        "accordée aux histoires locales, aux femmes, aux travailleurs et aux communautés déplacées."
                    ),
                    "status": "provisional",
                    "sourceIds": ["src-trc-report-index", "src-judiciary-constitutional-court"],
                },
            ],
        },
        "editorial_note": (
            "Cette section expose le cadre constitutionnel et les principaux dispositifs de justice et de mémoire. "
            "Elle ne transforme pas l'adoption d'une loi ou la création d'une institution en preuve que les droits "
            "sont appliqués de manière égale dans la vie quotidienne."
        ),
    },
    "additionalSources": [
        {
            "id": "src-sa-constitution-full",
            "category": "A",
            "title": "Constitution of the Republic of South Africa, 1996",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 1996,
            "url": "https://www.justice.gov.za/constitution/SAConstitution-web-eng.pdf",
        },
        {
            "id": "src-sa-constitution-ch1",
            "category": "A",
            "title": "Constitution — Chapter 1: Founding Provisions",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 1996,
            "url": "https://www.justice.gov.za/constitution/SAConstitution-web-eng-01.pdf",
        },
        {
            "id": "src-sa-bill-rights",
            "category": "A",
            "title": "Constitution — Chapter 2: Bill of Rights",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 1996,
            "url": "https://www.justice.gov.za/constitution/SAConstitution-web-eng-02.pdf",
        },
        {
            "id": "src-sa-constitution-ch9",
            "category": "A",
            "title": "Constitution — Chapter 9: State institutions supporting constitutional democracy",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 1996,
            "url": "https://www.justice.gov.za/constitution/SAConstitution-web-eng-09.pdf",
        },
        {
            "id": "src-sa-constitution-ch12",
            "category": "A",
            "title": "Constitution — Chapter 12: Traditional leaders",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 1996,
            "url": "https://www.justice.gov.za/constitution/SAConstitution-web-eng-12.pdf",
        },
        {
            "id": "src-iec-home",
            "category": "A",
            "title": "Electoral Commission of South Africa",
            "publisher": "Electoral Commission of South Africa",
            "year": 2026,
            "url": "https://www.elections.org.za/",
        },
        {
            "id": "src-iec-2024-system",
            "category": "A",
            "title": "What's new in the 2024 Elections: Electoral Amendment Act",
            "publisher": "Electoral Commission of South Africa",
            "year": 2024,
            "url": "https://www.elections.org.za/pw/elections/whats-new-in-the-2024-elections-electoral-amendment-act",
        },
        {
            "id": "src-iec-voting-abroad",
            "category": "A",
            "title": "About voting abroad",
            "publisher": "Electoral Commission of South Africa",
            "year": 2026,
            "url": "https://www.elections.org.za/pw/VotingAbroad/About-Voting-Abroad",
        },
        {
            "id": "src-judiciary-system",
            "category": "A",
            "title": "The South African Judicial System",
            "publisher": "Office of the Chief Justice",
            "year": 2026,
            "url": "https://www.judiciary.org.za/index.php/the-south-african-judicial-system",
        },
        {
            "id": "src-judiciary-constitutional-court",
            "category": "A",
            "title": "The Constitutional Court",
            "publisher": "Office of the Chief Justice",
            "year": 2026,
            "url": "https://www.judiciary.org.za/index.php/about-us/97-the-constitutional-court",
        },
        {
            "id": "src-judiciary-sca",
            "category": "A",
            "title": "The Supreme Court of Appeal",
            "publisher": "Office of the Chief Justice",
            "year": 2026,
            "url": "https://www.judiciary.org.za/index.php/about-us/98-the-supreme-court-of-appeal",
        },
        {
            "id": "src-judiciary-magistrates",
            "category": "A",
            "title": "Magistrates' Courts",
            "publisher": "Office of the Chief Justice",
            "year": 2026,
            "url": "https://www.judiciary.org.za/index.php/about-us/16-magistrates-courts",
        },
        {
            "id": "src-justice-courts",
            "category": "A",
            "title": "Courts in South Africa",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 2026,
            "url": "https://www.justice.gov.za/about/sa-courts.html",
        },
        {
            "id": "src-trc-home",
            "category": "A",
            "title": "Truth and Reconciliation Commission",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 2024,
            "url": "https://www.justice.gov.za/trc/",
        },
        {
            "id": "src-trc-report-index",
            "category": "A",
            "title": "Truth and Reconciliation Commission Final Report — index",
            "publisher": "Department of Justice and Constitutional Development",
            "year": 1998,
            "url": "https://www.justice.gov.za/trc/report/index.htm",
        },
        {
            "id": "src-trc-report-volume1",
            "category": "A",
            "title": "Truth and Reconciliation Commission Final Report — Volume 1",
            "publisher": "Truth and Reconciliation Commission",
            "year": 1998,
            "url": "https://www.justice.gov.za/trc/report/finalreport/volume%201.pdf",
        },
        {
            "id": "src-trc-report-volume5",
            "category": "A",
            "title": "Truth and Reconciliation Commission Final Report — Volume 5",
            "publisher": "Truth and Reconciliation Commission",
            "year": 1998,
            "url": "https://www.justice.gov.za/trc/report/finalreport/Volume5.pdf",
        },
        {
            "id": "src-trc-report-handover",
            "category": "A",
            "title": "Truth Report handed to President Mandela",
            "publisher": "Truth and Reconciliation Commission",
            "year": 1998,
            "url": "https://www.justice.gov.za/trc/media/1998/9810/s981029r.htm",
        },
    ],
}
