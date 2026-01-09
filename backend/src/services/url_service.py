

import datetime
import time
from src.models.url_model import urls 
from src.utils.shortener import generate_short_code

def shorten_url(original_url: str):
    existing = urls.find_one({"original_url": original_url})
    if existing:
        return existing["short_code"]
    
    short_code = generate_short_code()
    urls.insert_one({"original_url": original_url, "short_code": short_code, "clicks": 0, "created_at": datetime.now()})
    return short_code

def get_original_url(short_code):
    existing = urls.find_one({"short_code": short_code})
    return existing["original_url"] if existing else None

def get_all_urls(page = 1, page_size: int = 10):
    skip = (page - 1) * page_size
    url_list = list(urls.find().skip(skip).limit(page_size))
    
    total_items = urls.count_documents({})
    
    total_pages = (total_items + page_size - 1) // page_size
    
    return {
        "urls": url_list,
        "page": page,
        "page_size": page_size,
        "total_items": total_items,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_previous": page > 1
    }   