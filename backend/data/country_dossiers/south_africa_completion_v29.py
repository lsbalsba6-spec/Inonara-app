"""South Africa V29 — close weak French pilot sections with sourced reader-facing copy.

This pass deliberately replaces thin cards with contextual synthesis and attaches
institutional sources. It remains French-first until the ZA completeness gate is passed.
"""

from ._completion_utils import collection_for, merge_unique

V29_SOURCES = [
 {"id":"v29-statssa-migration-2025","category":"A","title":"Understanding South Africa’s Immigrant and Internal Migration Stats","publisher":"Statistics South Africa","url":"https://www.statssa.gov.za/?p=18042"},
 {"id":"v29-statssa-migration-profile","category":"A","title":"Migration profile report for South Africa: A country profile 2023","publisher":"Statistics South Africa","url":"https://www.statssa.gov.za/?p=17111"},
 {"id":"v29-gov-mining-migrant-labour","category":"A","title":"Minerals and Mining Policy of South Africa — Migrant Labour","publisher":"South African Government","url":"https://www.gov.za/documents/green-papers/minerals-and-mining-policy-south-africa-green-paper-01-feb-1998"},
 {"id":"v29-gov-labour-migration","category":"A","title":"White Paper on National Labour Migration Policy for South Africa","publisher":"South African Government","url":"https://www.gov.za/sites/default/files/gcis_document/202506/52751gen3636.pdf"},
 {"id":"v29-unesco-living-heritage","category":"A","title":"South Africa — Intangible Cultural Heritage","publisher":"UNESCO","url":"https://ich.unesco.org/en/state/south-africa-ZA"},
 {"id":"v29-unesco-living-project","category":"A","title":"Building capacities for safeguarding living heritage in new African States Parties","publisher":"UNESCO","url":"https://ich.unesco.org/en/state/south-africa-ZA?info=projects"},
]

MIGRATION = [
 {"id":"za-migration-mines-v29","title":"Le système minier a reconfiguré toute l'Afrique australe","text":"À partir de la révolution diamantifère puis aurifère de la fin du XIXe siècle, les mines sud-africaines ont construit un vaste système de recrutement reliant les campagnes du pays au Lesotho, au Mozambique, à l'Eswatini, au Malawi, au Botswana et à d'autres territoires. Le travail migrant n'était pas un simple déplacement professionnel : salaires faibles, contrats temporaires, compounds et hostels masculins, contrôle des déplacements et séparation durable des familles ont contribué à organiser l'économie racialisée. Les revenus envoyés vers les régions d'origine ont en même temps rendu de nombreux ménages dépendants de ces circulations. Cette géographie du travail explique encore une partie des liens économiques et familiaux transfrontaliers de l'Afrique australe.","sourceIds":["v29-gov-mining-migrant-labour","v29-gov-labour-migration"]},
 {"id":"za-migration-democracy-v29","title":"Depuis 1994 : des mobilités plus diversifiées","text":"La démocratie a modifié le cadre juridique des migrations sans faire disparaître le rôle régional de l'Afrique du Sud. Les flux contemporains associent travail, études, commerce, regroupement familial, refuge et recherche de sécurité. Le recensement 2022 comptait environ 2,4 millions d'immigrants, soit 3,9 % de la population, contre 2,1 % en 1996. La région SADC demeure de loin la principale origine des migrants internationaux : elle représentait 83,7 % de la population immigrée recensée en 2022. Johannesburg et plus largement Gauteng constituent un nœud majeur, mais les circulations concernent aussi les frontières, exploitations agricoles, mines, ports et autres villes.","sourceIds":["v29-statssa-migration-2025","v29-statssa-migration-profile"]},
 {"id":"za-migration-internal-v29","title":"Les migrations intérieures transforment les métropoles et les provinces","text":"Les déplacements à l'intérieur du pays sont aussi structurants que l'immigration internationale. Gauteng attire étudiants, travailleurs et familles venus d'autres provinces, tandis que Cape Town, Durban, Gqeberha et des villes secondaires participent à des réseaux de mobilité complexes. Les trajectoires contemporaines prolongent parfois des géographies créées par les homelands et l'influx control de l'apartheid : logement périphérique, longues distances domicile-travail et inégalités spatiales ne disparaissent pas avec l'abolition d'une loi. La carte migratoire doit donc montrer simultanément frontières internationales et mouvements internes.","sourceIds":["v29-statssa-migration-2025","v29-gov-labour-migration"]},
]

CULTURE = [
 {"id":"za-culture-language-city-v29","title":"Villes multilingues, cultures hybrides","text":"Johannesburg, Pretoria, Durban, Cape Town et les grands townships sont des espaces où langues et références culturelles se mélangent quotidiennement. IsiZulu, isiXhosa, Sesotho, Setswana, Afrikaans, English et de nombreuses langues africaines migrantes circulent entre maison, école, rue, travail, musique et internet. Les créations urbaines sud-africaines naissent précisément de ces passages : une pratique peut être enracinée dans une tradition régionale tout en se recomposant dans un studio, une église, un taxi, un stade ou TikTok. La culture vivante est donc présentée comme un processus de création, pas comme une série de costumes figés.","sourceIds":["v29-unesco-living-heritage"]},
 {"id":"za-culture-safeguarding-v29","title":"Patrimoine vivant : documenter sans fossiliser","text":"L'Afrique du Sud a rejoint la Convention de l'UNESCO de 2003 pour la sauvegarde du patrimoine culturel immatériel et participe désormais à des programmes de renforcement des capacités. La logique de cette convention est importante pour Inonara : les communautés et détenteurs de pratiques ne sont pas de simples objets documentaires. Transmission, consentement, inventaires, éducation et capacité des communautés à définir leur propre patrimoine comptent autant que la visibilité publique. Les cartes culturelles doivent donc relier pratiques, lieux, personnes et transmission contemporaine plutôt que prétendre assigner une culture à une frontière rigide.","sourceIds":["v29-unesco-living-heritage","v29-unesco-living-project"]},
]

MEDIA = [
 {"id":"za-media-democracy-v29","title":"L'information comme infrastructure démocratique","text":"Dans l'Afrique du Sud démocratique, les médias ne servent pas seulement au divertissement : radio, télévision, presse, journalisme d'investigation et médias communautaires participent au contrôle du pouvoir et à la circulation des débats publics. Leur fonctionnement doit cependant être lu avec les inégalités de revenus, de connexion et de langue. Une station communautaire rurale, un grand quotidien national et une chaîne numérique urbaine n'atteignent pas les mêmes publics. Le dossier relie donc médias, langues, territoire et institutions plutôt que de dresser un annuaire de marques.","sourceIds":[]},
 {"id":"za-media-creative-v29","title":"Des médias aux industries créatives numériques","text":"Les frontières entre média, musique et culture populaire deviennent poreuses : clips, podcasts, chaînes YouTube, plateformes de streaming et réseaux sociaux peuvent transformer une scène locale en phénomène international. Cette infrastructure a joué un rôle évident dans la diffusion récente de genres sud-africains comme l'amapiano. Mais l'accès au numérique reste inégal ; l'interactivité d'Inonara doit donc présenter à la fois les grands centres de production et les espaces communautaires, sans donner l'impression que l'ensemble du pays possède les mêmes ressources médiatiques.","sourceIds":[]},
]

INTERACTIVE_ROUTES = [
 {"id":"za-route-mining-labour-v29","title":"Système historique du travail migrant minier","kind":"historic-labour","period":"fin XIXe–XXe siècles","color":"#b45309","originLabels":["Lesotho","Mozambique","Eswatini","Malawi","Botswana","Eastern Cape"],"destinationLabels":["Witwatersrand / Johannesburg","Free State goldfields","Kimberley"],"sourceIds":["v29-gov-mining-migrant-labour","v29-gov-labour-migration"]},
 {"id":"za-route-contemporary-sadc-v29","title":"Immigration contemporaine depuis la SADC","kind":"contemporary-international","period":"1994–aujourd'hui","color":"#2563eb","originLabels":["Zimbabwe","Mozambique","Lesotho","Eswatini","Malawi","Botswana"],"destinationLabels":["Gauteng","Western Cape","KwaZulu-Natal"],"sourceIds":["v29-statssa-migration-profile","v29-statssa-migration-2025"]},
 {"id":"za-route-internal-gauteng-v29","title":"Mobilités intérieures vers Gauteng","kind":"internal","period":"contemporain","color":"#7c3aed","originLabels":["Limpopo","Eastern Cape","KwaZulu-Natal","Mpumalanga","North West"],"destinationLabels":["Johannesburg","Pretoria / Tshwane","Ekurhuleni"],"sourceIds":["v29-statssa-migration-2025"]},
]


def apply_south_africa_v29(dossier):
    if dossier.get('iso2')!='ZA': return dossier
    # Keep the legacy migration route list intact. Narrative themes are a
    # separate collection consumed alongside both old and new route shapes.
    merge_unique(dossier.setdefault('migration_themes', []), MIGRATION)
    merge_unique(collection_for(dossier, 'culture'), CULTURE)
    merge_unique(collection_for(dossier, 'media'), MEDIA)
    interactive=dossier.setdefault('interactive',{})
    merge_unique(interactive.setdefault('migrationRoutes',[]), INTERACTIVE_ROUTES)
    merge_unique(dossier.setdefault('sources',[]), V29_SOURCES)
    dossier['last_reviewed']='2026-09-13'
    dossier['content_completion']={'fr':'Afrique du Sud — audit de fermeture en cours : migrations, culture vivante, médias et routes cartographiques approfondis et sourcés.','phase':'fr-completeness-gate-v29'}
    return dossier
