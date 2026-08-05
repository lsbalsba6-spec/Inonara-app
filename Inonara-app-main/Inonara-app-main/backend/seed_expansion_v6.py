"""Iteration 13 — international narrative journeys.

Six new long-form stories (4 chapters each, with sources) drawn from across the
African and African-diaspora world. Schema matches seed_data.STORIES.

This rebalances the story collection away from a US-centric default toward
true global reach: Haiti, Brazil, South Africa, Sahel, Ethiopia, United Kingdom.
"""

EXTRA_STORIES_V6 = [
    {
        "id": "haitian-revolution",
        "title": "The Haitian Revolution",
        "civilization_id": None,
        "era": "1791–1804",
        "summary": "The only successful slave revolt in history that founded a sovereign state — and the first independent Black republic in the Americas.",
        "chapters": [
            {
                "heading": "Bois Caïman",
                "body": "On the night of 14 August 1791, Vodou priest Dutty Boukman led a ceremony in the Bois Caïman forest of northern Saint-Domingue. The oath sworn there — and the uprising that began eight days later — set fire to the plantations of the Plaine du Nord and launched the only enslaved revolt that would end with an independent state. Within weeks, more than 100,000 enslaved people were in arms.",
            },
            {
                "heading": "Toussaint Louverture",
                "body": "By 1793, Toussaint Louverture had emerged as the revolution's strategic and political mind. A self-emancipated coachman fluent in French and Kreyòl, he played France, Spain, and Britain against one another, abolished slavery on the island in 1794, and by 1801 governed Saint-Domingue as Governor-General-for-life under a constitution he drafted himself. Napoleon's response — sending 30,000 troops under General Leclerc in 1802 — was a strategic catastrophe for France.",
            },
            {
                "heading": "Dessalines and Vertières",
                "body": "Toussaint was deceived, captured, and shipped to die in the Jura Mountains in 1803. Command passed to Jean-Jacques Dessalines, who at the Battle of Vertières (18 November 1803) decisively defeated the French expeditionary force. On 1 January 1804 at Gonaïves, Dessalines proclaimed independence and renamed the country Haiti — a Taíno word meaning 'mountainous land'.",
            },
            {
                "heading": "Aftershock",
                "body": "Haiti's victory reshaped the Atlantic world: it forced Napoleon to sell the Louisiana Territory (1803), terrified slaveholders from Virginia to Bahia, and inspired anti-slavery and independence movements throughout the Americas. The price was crushing: an 1825 French indemnity of 150 million gold francs — extorted under naval blockade — saddled Haiti with debt that it finished paying only in 1947 and that historians have estimated cost the country between $21–115 billion in lost development.",
            },
        ],
        "sources": [
            "C. L. R. James, 'The Black Jacobins' (1938)",
            "Laurent Dubois, 'Avengers of the New World' (2004)",
            "Marlene L. Daut, 'Awakening the Ashes: An Intellectual History of the Haitian Revolution' (2023)",
        ],
    },
    {
        "id": "palmares-quilombo",
        "title": "Palmares — the Republic of the Free",
        "civilization_id": None,
        "era": "1605–1694",
        "summary": "For most of the 17th century a confederation of self-emancipated communities in northeastern Brazil sustained an independent African society on Portuguese-claimed soil — and held out against 24 colonial military expeditions.",
        "chapters": [
            {
                "heading": "Mocambos in the Serra da Barriga",
                "body": "The first mocambos (maroon settlements) of what became known as the Quilombo dos Palmares appeared around 1605 in the Serra da Barriga, in present-day Alagoas. By 1670 the confederation comprised some ten fortified towns with as many as 20,000 inhabitants — self-emancipated Africans (largely of West Central African origin), Indigenous allies, and a smaller number of dissident Portuguese.",
            },
            {
                "heading": "Ganga Zumba and Zumbi",
                "body": "Palmares was ruled by an elected king — Ganga Zumba in the 1670s, then his nephew Zumbi from 1678 — and organized along Kongo-derived political and military lines. The economy combined manioc and maize farming, ironwork, and selective trade with sympathetic colonists. In 1678 Ganga Zumba accepted a Portuguese peace offering land in exchange for returning future runaways; Zumbi rejected the terms and led the militants.",
            },
            {
                "heading": "The Bandeirantes",
                "body": "Earlier expeditions had failed. In 1694, the Portuguese contracted Domingos Jorge Velho, a paulista bandeirante (slave-raider) with cannon and Tupi auxiliaries, to destroy Palmares. The capital Macaco fell on 6 February 1694 after a 42-day siege; Zumbi escaped, was betrayed in 1695, and beheaded — his head impaled in Recife to dispel the rumor that he was immortal.",
            },
            {
                "heading": "Aftermath and memory",
                "body": "Palmares' destruction did not end Brazilian marronage: hundreds of other quilombos continued through abolition (1888) and into the present, where roughly 6,000 quilombola communities are recognized by the Brazilian state and protected under Article 68 of the 1988 Constitution. 20 November (Zumbi's death) is Brazil's national Day of Black Consciousness.",
            },
        ],
        "sources": [
            "R. K. Kent, 'Palmares: An African State in Brazil' (1965)",
            "Stuart B. Schwartz, 'Slaves, Peasants, and Rebels' (1992)",
            "Brazilian Federal Constitution (1988), Article 68 of the Transitory Provisions",
        ],
    },
    {
        "id": "soweto-uprising",
        "title": "The Soweto Uprising",
        "civilization_id": None,
        "era": "16 June 1976",
        "summary": "A schoolchildren's protest against the apartheid state's enforcement of Afrikaans as the medium of instruction became the turning point of the South African anti-apartheid struggle.",
        "chapters": [
            {
                "heading": "The Afrikaans Medium Decree",
                "body": "In 1974 the apartheid government's Bantu Education Department decreed that Afrikaans — the language of the white minority that enforced apartheid — would become the compulsory medium of instruction in Black secondary schools, alongside English. To students for whom Afrikaans was associated with the police, the courts, and the pass laws, it was an intolerable imposition on top of an already inferior 'Bantu Education' curriculum.",
            },
            {
                "heading": "The march",
                "body": "On the morning of 16 June 1976, between 10,000 and 20,000 students from schools across Soweto — coordinated by the South African Students Movement and Action Committee — converged on Orlando Stadium in disciplined columns, singing 'Nkosi Sikelel' iAfrika'. They carried hand-painted placards: 'Down with Afrikaans', 'We are not Boers'. The police met them at Orlando West with tear gas, then live rounds.",
            },
            {
                "heading": "Hector Pieterson",
                "body": "Hector Pieterson, twelve years old, was among the first to be shot. The photograph by Sam Nzima of Mbuyisa Makhubo carrying Hector's body, with his sister Antoinette running beside them, was on every front page within 48 hours. By the end of the day at least 23 were dead; by the time the unrest had spread across the country, the death toll had reached between 176 and 700, depending on the source.",
            },
            {
                "heading": "The world watches",
                "body": "Soweto galvanized the international anti-apartheid movement. The UN Security Council passed Resolution 392 condemning the killings; sports, cultural, and economic boycotts intensified through the 1980s; the African National Congress's underground recruitment surged. When apartheid ended in 1994, 16 June was made South Africa's Youth Day in commemoration. The Hector Pieterson Museum opened in Orlando West in 2002.",
            },
        ],
        "sources": [
            "Sifiso Mxolisi Ndlovu, 'The Soweto Uprisings' (1998)",
            "Truth and Reconciliation Commission of South Africa Report, Vol. 3 (1998)",
            "Sam Nzima, 'The story of the photograph' — South African History Archive interviews",
        ],
    },
    {
        "id": "ghana-empire-wagadu",
        "title": "Wagadu — the Empire of Ghana",
        "civilization_id": "ghana-empire",
        "era": "c. 300–1240 CE",
        "summary": "The first of the great West African gold empires — known to its Soninké people as Wagadu and to North African Arabs as 'the land of gold'.",
        "chapters": [
            {
                "heading": "Land of gold",
                "body": "Long before Mali and Songhai, the Soninké-speaking peoples of the upper Niger and Senegal rivers built a state that controlled the trans-Saharan exchange of gold from the Bambuk and Bure fields for North African salt, copper, and Mediterranean manufactures. By the time the Cordoban geographer al-Bakri described it in the 11th century, Ghana's king commanded an army of 200,000 and a court so wealthy that even his dogs reportedly wore collars of gold and silver.",
            },
            {
                "heading": "Koumbi Saleh",
                "body": "The capital, archaeologists believe, was at Koumbi Saleh in modern-day Mauritania — a 'twin city' with one quarter for the king and the Soninké religious establishment, and another six miles away for the Muslim Berber merchants who handled the long-distance trade. The royal city had a fortified palace, stone-built houses, and groves sacred to non-Islamic Soninké religion.",
            },
            {
                "heading": "The legend of Bida",
                "body": "Soninké oral tradition tells of Bida, a great serpent who guarded the rains and the gold of Wagadu, demanding the annual sacrifice of a virgin chosen from the noble Cissé clan. When the suitor Mamadi Sefe Dekote intervened to save his betrothed and killed Bida, the rains failed for seven years and the Soninké dispersed — explaining the wider Soninké diaspora across West Africa, from the Senegal to the upper Niger.",
            },
            {
                "heading": "Decline and afterlives",
                "body": "By the 12th century Ghana faced pressure from the Almoravid berber dynasty to the north, internal succession disputes, and the rise of the Sosso kingdom under Sumanguru Kanté. After Sumanguru's defeat by Sundiata Keita at the Battle of Kirina (c. 1235), Wagadu's former tributaries reorganized into the Mali Empire — a continuity reflected in the fact that modern Ghana (the West African nation) took its name from this older state, hundreds of kilometres to its northwest.",
            },
        ],
        "sources": [
            "Nehemia Levtzion, 'Ancient Ghana and Mali' (1973)",
            "al-Bakri, Kitab al-Masalik wa al-Mamalik (1067/68)",
            "Soninké oral tradition — Bida cycle, recorded in Charles Monteil, 'La Légende de Ouagadou et l'origine des Soninké' (1953)",
        ],
    },
    {
        "id": "battle-of-adwa",
        "title": "The Battle of Adwa",
        "civilization_id": "ethiopia",
        "era": "1 March 1896",
        "summary": "The decisive Ethiopian victory over invading Italian forces — the only major battle of the imperial era in which an African state defeated a European colonial army.",
        "chapters": [
            {
                "heading": "The Treaty of Wuchale",
                "body": "In 1889 Emperor Menelik II of Ethiopia signed the Treaty of Wuchale with Italy. The Italian version of Article XVII obliged Ethiopia to conduct foreign relations through Rome — making it, in effect, an Italian protectorate. The Amharic version did not. When Menelik discovered the deception, he denounced the treaty (1893) and prepared for war.",
            },
            {
                "heading": "Mobilizing the empire",
                "body": "Menelik and Empress Taytu Betul spent two years importing modern Hotchkiss machine guns, Mauser and Berdan rifles, and field artillery — paid for in gold from Wollega — and forging an unprecedented imperial coalition of Tigray, Shewa, Wollo, and Gojjam armies. By February 1896, over 100,000 Ethiopian soldiers had assembled north of Aksum.",
            },
            {
                "heading": "Sunrise over the rocks",
                "body": "Italian commander Oreste Baratieri commanded roughly 18,000 troops — 10,000 Italians and 8,000 Eritrean askaris — with about 56 artillery pieces. Under political pressure for a quick victory, he advanced before dawn on 1 March into the mountainous terrain around Adwa. His four brigades got lost in the dark and were enveloped piecemeal. By 1pm the Italian army had collapsed: roughly 7,000 killed, 1,500 captured, two generals dead.",
            },
            {
                "heading": "Pan-African echo",
                "body": "Adwa secured Ethiopian sovereignty for forty years — until the 1935 Italian invasion under Mussolini, which used poison gas. But the symbolic weight was permanent: Adwa entered Pan-African consciousness from W. E. B. Du Bois to Marcus Garvey to Haile Selassie's 1936 address to the League of Nations as the irrefutable proof that European colonial conquest was contingent, not inevitable. Ethiopia became one of only two African states to remain uncolonized through the Scramble.",
            },
        ],
        "sources": [
            "Raymond Jonas, 'The Battle of Adwa: African Victory in the Age of Empire' (2011)",
            "Bahru Zewde, 'A History of Modern Ethiopia, 1855–1991' (2001)",
            "Paulos Milkias & Getachew Metaferia (eds.), 'The Battle of Adwa: Reflections on Ethiopia's Historic Victory Against European Colonialism' (2005)",
        ],
    },
    {
        "id": "windrush-generation",
        "title": "The Windrush Generation",
        "civilization_id": None,
        "era": "1948–present",
        "summary": "Half a million Caribbean migrants invited to help rebuild post-war Britain — and the betrayal by the British state that decades later threatened many of them with deportation from the only home they had ever known.",
        "chapters": [
            {
                "heading": "Empire Windrush",
                "body": "On 22 June 1948 the troopship HMT Empire Windrush docked at Tilbury, near London, carrying 1,027 passengers — among them around 800 Caribbean migrants, mostly Jamaicans who had served in the RAF during the war. They had answered advertisements placed in Jamaican newspapers by British employers facing a post-war labour shortage. Under the British Nationality Act of 1948, every Commonwealth citizen had the right to live and work in the United Kingdom.",
            },
            {
                "heading": "Building post-war Britain",
                "body": "Over the next twenty-five years roughly 500,000 Caribbean migrants followed. They drove the buses of London, nursed in the new NHS, manned the foundries of the Midlands. They were also met by 'No Blacks, No Irish, No Dogs' boarding-house signs, the 1958 Notting Hill riots, and a hostile press. The community responded by founding Notting Hill Carnival (1966), the West Indian Standing Conference, and a generation of writers from Sam Selvon to Andrea Levy.",
            },
            {
                "heading": "The hostile environment",
                "body": "Between 2010 and 2014 the Home Office, under successive ministers, imposed a 'hostile environment' policy requiring landlords, banks, doctors, and employers to verify the immigration status of every Black face. Many of the original Windrush arrivals — who had never naturalized because they didn't need to — had no documents. Their landing cards, the only official record of their arrival, had been destroyed by the Home Office in 2010. The state began demanding 'evidence' of presence for every year going back to 1973.",
            },
            {
                "heading": "Recognition and reckoning",
                "body": "Thousands lost jobs, homes, or NHS care; at least 83 were wrongfully deported, several to countries they had not seen in fifty years. The 2018 Guardian investigation by Amelia Gentleman forced the resignation of Home Secretary Amber Rudd and an official apology by Prime Minister Theresa May. The Wendy Williams 'Windrush Lessons Learned Review' (2020) was scathing. Compensation schemes have been slow; in 2022 Windrush Day became a national observance.",
            },
        ],
        "sources": [
            "Amelia Gentleman, 'The Windrush Betrayal' (2019)",
            "Wendy Williams, 'Windrush Lessons Learned Review' — UK Government, March 2020",
            "Mike Phillips & Trevor Phillips, 'Windrush: The Irresistible Rise of Multi-Racial Britain' (1998)",
        ],
    },
]
