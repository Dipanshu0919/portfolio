import re

with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    css_content = style_match.group(1).strip()
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    print(f'Extracted {len(css_content)} chars of CSS')
    
    # Replace <style> block with link tag
    content = content[:style_match.start()] + '<link rel="stylesheet" href="styles.css">' + content[style_match.end():]
else:
    print('No <style> block found.')

# Extract JS
script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if script_match:
    js_content = script_match.group(1).strip()
    with open('main.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f'Extracted {len(js_content)} chars of JS')
    
    # Replace <script> block with script tag
    content = content[:script_match.start()] + '<script src="main.js"></script>' + content[script_match.end():]
else:
    print('No <script> block found.')

with open('portfolio.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated portfolio.html')
