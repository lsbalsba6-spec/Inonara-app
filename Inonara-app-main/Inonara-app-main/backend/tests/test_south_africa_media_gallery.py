from data.country_dossiers.south_africa import SOUTH_AFRICA_DOSSIER


def test_media_gallery_has_reusable_images_with_attribution():
    gallery = SOUTH_AFRICA_DOSSIER["media_gallery"]
    assert len(gallery) >= 4
    for item in gallery:
        assert item["image_url"].startswith("https://commons.wikimedia.org/")
        assert item["source_page"].startswith("https://commons.wikimedia.org/wiki/File:")
        assert item["author"]
        assert item["license"]
        assert item["caption"]
        assert item["alt"]


def test_media_gallery_covers_multiple_country_sections():
    sections = {item["section"] for item in SOUTH_AFRICA_DOSSIER["media_gallery"]}
    assert {"symbols", "geography", "history", "figures"}.issubset(sections)
