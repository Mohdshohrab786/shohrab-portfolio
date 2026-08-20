import re

def main():
    file_path = 'd:/xampp/htdocs/araweb/my-portfolio/index.html'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The grid starts here:
    start_str = '<div class="row g-3 text-center wow fadeInUp">'
    start_idx = content.find(start_str)
    
    # We find where this row ends. It ends right before the closing </section>
    end_str = '</section>'
    end_idx = content.find(end_str, start_idx)
    
    section_content = content[start_idx:end_idx]
    
    # We want to split the section_content into individual project blocks.
    # Each project block is wrapped in <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
    # Let's split by this string
    block_delimiter = '<div class="col-lg-3 col-md-4 col-sm-6 mb-3">'
    parts = section_content.split(block_delimiter)
    
    header = parts[0]
    blocks = parts[1:]
    
    # Prepend the delimiter to each block so they are complete
    blocks = [block_delimiter + b for b in blocks]
    
    order = [
        "Sunroop",
        "Second Sight (Health)",
        "Shahi Store",
        "Indian Public Schools",
        "Made in Afghanistan",
        "Shaheen Public School",
        "Ananta Ysela",
        "Uffbyisha",
        "SecondSight Education",
        "SecondSight Medicine",
        "Kisan tools"
    ]
    
    # Extract titles
    def get_title(block):
        # find <h5 class="mb-1 text-truncate" title="Title">Title</h5>
        m = re.search(r'<h5[^>]*>(.*?)</h5>', block)
        if m:
            return m.group(1).strip()
        return ""

    top_blocks = []
    other_blocks = []
    
    used_indices = set()
    
    for req_title in order:
        req_norm = req_title.lower().replace(' ', '')
        found = False
        for i, b in enumerate(blocks):
            if i in used_indices:
                continue
            title = get_title(b)
            title_norm = title.lower().replace(' ', '')
            if req_norm in title_norm or title_norm in req_norm:
                top_blocks.append(b)
                used_indices.add(i)
                found = True
                break
        if not found:
            print(f"Not found: {req_title}")
            
    for i, b in enumerate(blocks):
        if i not in used_indices:
            other_blocks.append(b)
            
    new_section_content = header + "".join(top_blocks) + "".join(other_blocks)
    
    new_content = content[:start_idx] + new_section_content + content[end_idx:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Done rewriting index.html")

if __name__ == '__main__':
    main()
