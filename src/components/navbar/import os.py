import os
import json
import aiohttp
import asyncio
from bs4 import BeautifulSoup
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor

# Headers for browser-like requests
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}

# Save progress to JSON file
def save_progress(data, filename="progress.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

# Load progress if exists
def load_progress(filename="progress.json"):
    if os.path.exists(filename):
        with open(filename, "r") as f:
            return json.load(f)
    return []

# Async download image function to avoid blocking main thread
async def download_image_async(image_url, session, folder="images"):
    try:
        if not os.path.exists(folder):
            os.makedirs(folder)

        async with session.get(image_url) as response:
            response.raise_for_status()
            image_name = os.path.basename(image_url)
            image_path = os.path.join(folder, image_name)

            with open(image_path, "wb") as f:
                f.write(await response.read())
        return image_path
    except Exception:
        return None

# Async function to scrape a single page
async def scrape_page(url, session):
    products = []
    async with session.get(url) as response:
        response_text = await response.text()
        soup = BeautifulSoup(response_text, "html.parser")
        
        # Process products on the page
        for a_tag in soup.select("a[aria-label]"):
            product_info = {}
            product_info["name"] = a_tag["aria-label"]
            product_info["link"] = a_tag["href"]

            if product_info["name"].startswith("Read more about") or product_info["name"].startswith("Select options for"):
                continue
            if "/product/" not in product_info["link"]:
                continue

            img_tag = a_tag.find("img", class_="lazy-load")
            product_info["image_src"] = img_tag["data-src"] if img_tag and "data-src" in img_tag.attrs else None
            products.append(product_info)
    
    return products, soup

# Async function to fetch product details
async def fetch_product_details(product_info, session):
    async with session.get(product_info["link"]) as response:
        response_text = await response.text()
        product_soup = BeautifulSoup(response_text, "html.parser")

        price_tag = product_soup.select_one("p.price > span > bdi")
        product_info["price"] = price_tag.get_text(strip=True) if price_tag else "N/A"

        category_tag = product_soup.select_one("span.posted_in > a")
        product_info["category"] = category_tag.get_text(strip=True) if category_tag else "N/A"

        description_tag = product_soup.select_one("#accordion-description-content")
        if description_tag:
            for br in description_tag.find_all("br"):
                br.replace_with("\n")
            product_info["description"] = description_tag.get_text()
        else:
            product_info["description"] = "N/A"

    return product_info

# Async function to scrape products with pagination
async def scrape_products(url, semaphore):
    all_products = load_progress()  # Load existing data if available
    page = 1
    async with aiohttp.ClientSession(headers=headers) as session:
        while url:
            async with semaphore:  # Limit the number of concurrent requests
                print(f"Scraping page {page} of {url}...")
                try:
                    products, soup = await scrape_page(url, session)
                    detailed_products = await asyncio.gather(
                        *(fetch_product_details(product, session) for product in products)
                    )
                    all_products.extend(detailed_products)
                    save_progress(all_products)  # Save progress after each page
                    
                    next_page = soup.select_one('a.next')
                    if next_page and next_page.get('href'):
                        url = next_page['href']
                        page += 1
                    else:
                        break

                except Exception as e:
                    print(f"Error occurred: {e}")
                    save_progress(all_products)
                    retry = input("An error occurred. Would you like to retry? (y/n): ").strip().lower()
                    if retry == 'y':
                        continue
                    else:
                        break

    return all_products

# Main function to save scraped data to JSON
def save_to_json(products, filename="products.json"):
    try:
        with open(filename, "w") as f:
            json.dump(products, f, indent=4)
        print(f"Product details saved to {filename}")
    except Exception as e:
        print(f"Failed to save data to JSON: {e}")

# Main entry point
async def main():
     urls = [
    "https://ktechnics.com/product-category/computer-accessories/",
    "https://ktechnics.com/product-category/development-platforms/",
    "https://ktechnics.com/product-category/aeronautics-robotics/",
    "https://ktechnics.com/product-category/battery-chargers/",
    "https://ktechnics.com/product-category/components/",
    "https://ktechnics.com/product-category/gyro-accelerometer/",
    "https://ktechnics.com/product-category/intergrated-circuits/",
    "https://ktechnics.com/product-category/lcds-displays/",
    "https://ktechnics.com/product-category/microcontrollers/",
    "https://ktechnics.com/product-category/programmers/",
    "https://ktechnics.com/product-category/prototyping-tools/",
    "https://ktechnics.com/product-category/relays-motors-valves/",
    "https://ktechnics.com/product-category/sensors/",
    "https://ktechnics.com/product-category/arduino-shields-modules/",
    "https://ktechnics.com/product-category/wireless-devices/",
    "https://ktechnics.com/product-category/uncategorized/"
]
    semaphore = asyncio.Semaphore(5)  # Limit the number of concurrent page requests
    all_products = []
    for url in urls:
        print(f"Starting to scrape from {url}...")
        products = await scrape_products(url, semaphore)
        all_products.extend(products)

    save_to_json(all_products)

    # Download images asynchronously in parallel
    image_urls = [product["image_src"] for product in all_products if product["image_src"]]
    async with aiohttp.ClientSession(headers=headers) as session:
        tasks = [download_image_async(image_url, session) for image_url in image_urls]
        for _ in tqdm(asyncio.as_completed(tasks), total=len(tasks), desc="Downloading images"):
            await _
    
    # Remove temporary progress file if scraping completes successfully
    if os.path.exists("progress.json"):
        os.remove("progress.json")

# Run the async main function
asyncio.run(main())

