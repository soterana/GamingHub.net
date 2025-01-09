def create_game_html():
    # Ask for the game data inputs
    game_data_name = input("Enter game data name (e.g., Taming.io): ")
    game_title = input("Enter game title (e.g., Taming.io): ")
    game_load = input("Enter game load name (e.g., https://taming.io): ")
    file_name = input("Enter the filename (without .html): ")
    game_src = input("Enter the game iframe source link (e.g., https://taming.io): ")
    game_img = input("Enter the game image link (e.g., https://taming.io): ")

    # Generate the game HTML content for the individual game page
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1720344232804931"
     crossorigin="anonymous"></script>
      <link rel="stylesheet" href="styles.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, minimal-ui">
  <meta name="theme-color" content="#007bff">
  <meta name="description" content="GamingHubPlay is your one-stop hub for gaming news, reviews, and community discussions.">
<meta name="keywords" content="gaming, news, reviews, community, games">
    <link rel="icon" href="https://i.ibb.co/gwTKyWV/7476b6d8-b261-40cd-a505-fde11fa99789-1-modified.png">
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P25S7VMFB1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());

  gtag('config', 'G-P25S7VMFB1');
</script>
<script type="text/javascript" data-cmp-ab="1" src="https://cdn.consentmanager.net/delivery/autoblocking/4050ab40324ac.js" data-cmp-host="d.delivery.consentmanager.net" data-cmp-cdn="cdn.consentmanager.net" data-cmp-codesrc="16"></script>
  <title>GamingHub - {game_title}</title>
  <style>
    /* Add your styles here */
  </style>
</head>
<body>
  <h1>GamingHub</h1>
  <div class="game-container">
    <h2>{game_title}</h2>
    <iframe src="{game_src}" title="{game_title} Game"></iframe>
    <div class="controls">
      <button onclick="toggleFullscreen()">Go Full Screen</button>
      <a href="index.html" class="back-link">Back to Game Hub</a>
    </div>
  </div>
  <script>
    function toggleFullscreen() {{
      const iframe = document.querySelector('iframe');
      if (document.fullscreenElement) {{
          document.exitFullscreen();
      }} else {{
          iframe.requestFullscreen();
      }}
    }}
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1720344232804931"
    crossorigin="anonymous"></script>
<ins class="adsbygoogle"
    style="display:block"
    data-ad-format="autorelaxed"
    data-ad-client="ca-pub-1720344232804931"
    data-ad-slot="4880565273"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({{}});
</script>
</body>
</html>
"""
    # Create the individual game HTML file
    try:
        with open(f"{file_name}.html", "w") as file:
            file.write(html_content)
        print(f"HTML file '{file_name}.html' has been created successfully!")
    except Exception as e:
        print(f"Error creating the HTML file: {e}")

    # Now create the game snippet HTML for index.html
    game_snippet = f"""\n<div class="game" data-name="{game_data_name}" onclick="loadGame('{file_name}.html')">
        <img src="{game_img}" alt="{game_title}">
        <h3>{game_title}</h3>
    </div>\n"""

    # Open and read the current index.html content
    try:
        with open("index.html", "r") as index_file:
            index_content = index_file.read()
    except FileNotFoundError:
        print("index.html not found. Creating a new file.")
        index_content = "<html><body><h1>GamingHub</h1><div class='games-grid' id='games'></div></body></html>"

    # Find the games-grid div and append the new game snippet inside it
    if '<div class="games-grid" id="games">' in index_content:
        index_content = index_content.replace(
            '<div class="games-grid" id="games">',
            f'<div class="games-grid" id="games">\n{game_snippet}'
        )
    else:
        index_content = index_content.replace(
            '<body>',
            '<body>\n<div class="games-grid" id="games">'
        )
        index_content = index_content.replace(
            '</body>',
            f'{game_snippet}\n</div>\n</body>'
        )

    # Write the updated content back to index.html
    try:
        with open("index.html", "w") as index_file:
            index_file.write(index_content)
        print("Game snippet has been successfully added to index.html!")
    except Exception as e:
        print(f"Error updating index.html: {e}")

# Run the function to create and append game HTML content
create_game_html()
