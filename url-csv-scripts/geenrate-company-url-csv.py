import pandas as pd
import requests
from bs4 import BeautifulSoup
from googlesearch import search
import time

def get_csr_url(company_name):
    # Refine search query to look for PDF files related to CSR
    query = f"{company_name} CSR policy filetype:pdf"
    potential_csr_urls = []

    # Set up headers to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    # Step 1: Use Google search to find potential CSR URLs
    for url in search(query, num_results=10):
        potential_csr_urls.append(url)

    # Step 2: Filter and validate CSR URLs
    csr_links = []
    for url in potential_csr_urls:
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                # Check if the URL points to a PDF file
                if url.lower().endswith('.pdf'):
                    csr_links.append(url)
        except requests.exceptions.RequestException as e:
            print(f"Error accessing {url}: {e}")
            time.sleep(1)  # Wait for a second before retrying

    return csr_links

# Load the Excel file
from pathlib import Path
script_dir = Path(__file__).resolve().parent
file_path =  f"{script_dir}/companies_shorted-7.xlsx"
df = pd.read_excel(file_path)

# Prepare a list to hold the results
results = []

# Iterate through each company name in the Excel file
for index, row in df.iterrows():
    company_name = row['Company Name']
    print(f"Processing: {company_name}")
    csr_urls = get_csr_url(company_name)
    # Combine company name and CSR URLs into a single row
    result_row = [company_name] + csr_urls
    results.append(result_row)

# Convert results to a DataFrame
max_length = max(len(row) for row in results)
results_df = pd.DataFrame(results, columns=['Company Name'] + [f'URL{i+1}' for i in range(max_length-1)])

# Save the results to a CSV file
results_df.to_csv(f"{script_dir}/csr_urls.csv", index=False)

print("CSV file has been created successfully.")
