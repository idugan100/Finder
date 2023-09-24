import requests
from facebook_scraper import *
from urllib.parse import urlparse
import os

os.makedirs("images", exist_ok=True)
for post in get_posts("Arnold-Schwarzenegger", None, None, None, None):
    for url in post["images"]:
        filename = os.path.basename(urlparse(url).path)
        print(f"Fetching {filename}")
        r = requests.get(url)
        with open(f"images/{filename}", "wb") as f:
            f.write(r.content)