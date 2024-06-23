import csv
import requests
import PyPDF2
import re
from io import BytesIO
import json

def download_pdf(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BytesIO(response.content)
    else:
        raise Exception(f"Failed to download PDF from {url}")

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ''
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    return text

def search_keywords_in_text(text, keywords):
    results = {}
    for keyword in keywords:
        results[keyword] = bool(re.search(r'\b' + re.escape(keyword) + r'\b', text, re.IGNORECASE))
    return results

def process_pdfs_from_csv(csv_file_path, keywords):
    results = {}
    with open(csv_file_path, newline='') as csvfile:
        csv_reader = csv.reader(csvfile)
        next(csv_reader)  # Skip the header row

        for row in csv_reader:
            company_name = row[0]
            urls = [url for url in row[1:] if url]  # Filter out empty URLs
            company_results = {keyword: False for keyword in keywords}
            for url in urls:
                try:
                    pdf_file = download_pdf(url)
                    text = extract_text_from_pdf(pdf_file)
                    search_results = search_keywords_in_text(text, keywords)
                    for keyword, found in search_results.items():
                        if found:
                            company_results[keyword] = True
                except Exception as e:
                    print(f"Error processing {url} for {company_name}: {e}")
            results[company_name] = company_results
    return results

from pathlib import Path
if __name__ == "__main__":
    script_dir = Path(__file__).resolve().parent
    csv_file_path =  f"{script_dir}/csr_urls.csv"
    keywords = ['water', 'sanitation', 'health']

    results = process_pdfs_from_csv(csv_file_path, keywords)
    
    # Convert the results dictionary to a JSON object
    results_json = json.dumps(results, indent=4)
    
        # Define the path where the JSON file should be saved relative to client/src/components/admin-home
    json_file_path = script_dir.parent.parent / 'TEAM-53' / 'client' / 'src' / 'components' / 'admin-home' / 'companies-filtered.json'
    json_file_path = str(json_file_path).replace('\\','/')
    # Print the JSON object
    print(results_json)
    
    # Save the JSON object to the file
    with open(json_file_path, 'w') as json_file:
        json.dump(results, json_file, indent=4)
