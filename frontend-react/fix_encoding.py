import re

src  = r'd:\YUI Nook\frontend -latest\chat-app.js'
dest = r'd:\YUI Nook\frontend-react\src\legacy-chat\chat-app.js'

# Read original (likely GBK or UTF-8 with BOM)
for enc in ('utf-8-sig', 'utf-8', 'gbk', 'gb18030'):
    try:
        with open(src, 'r', encoding=enc) as f:
            text = f.read()
        print(f'Read with encoding: {enc}, length: {len(text)}')
        break
    except Exception as e:
        print(f'{enc}: {e}')

# Our SVG change 1: mini-send button in renderMomentCard
OLD_SVG_1 = '''<button class="mini-send" onclick="submitComment(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>'''
NEW_SVG_1 = '''<button class="mini-send" onclick="submitComment(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </button>'''

# Our SVG change 2: mini-send button in legacyRenderMomentCard  
OLD_SVG_2 = OLD_SVG_1  # same pattern used twice
NEW_SVG_2 = NEW_SVG_1

if OLD_SVG_1 in text:
    text = text.replace(OLD_SVG_1, NEW_SVG_1)
    print('Applied SVG fix (all occurrences)')
else:
    print('WARNING: SVG pattern not found, searching for partial...')
    # Search for the mini-send button area
    idx = text.find('class="mini-send"')
    if idx >= 0:
        print(f'Found mini-send at offset {idx}:')
        print(repr(text[idx:idx+200]))

# Write as UTF-8 with CRLF
output = text.replace('\r\n', '\n').replace('\r', '\n').replace('\n', '\r\n')
with open(dest, 'w', encoding='utf-8', newline='') as f:
    f.write(text)

# Re-read and normalize CRLF properly
with open(dest, 'rb') as f:
    raw = f.read()
crlf = raw.replace(b'\r\n', b'\n').replace(b'\r', b'\n').replace(b'\n', b'\r\n')
with open(dest, 'wb') as f:
    f.write(crlf)

print(f'Written: {len(crlf)} bytes, {crlf.count(chr(13).encode() + chr(10).encode())} lines')
