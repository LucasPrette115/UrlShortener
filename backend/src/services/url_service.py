
from src.models.url_model import urls 
from src.utils.shortener import generate_short_code

def shorten_url(original_url: str):
    existing = urls.find_one({"original_url": original_url})
    if existing:
        return existing["short_code"]
    
    short_code = generate_short_code()
    urls.insert_one({"original_url": original_url, "short_code": short_code})
    return short_code

def get_original_url(short_code):
    existing = urls.find_one({"short_code": short_code})
    return existing["original_url"] if existing else None