<?php
  // start session
  // add session_start() to each php page of the website that needs to access the $_SESSION variable
  session_start();
  // access token for current session
  $accessToken = $_SESSION['my_access_token_accessToken'];
 ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="styles.css">
    <title>SLIM GƎMZ</title>
</head>
<body>

<h1>SLIM GƎMZ</h1>

<?php

  $SPOTIFY_CLIENT_ID = 'be5ee3a4215c4df69d8149f599c5134a';

  echo '<p>Access Token:</p>';
  echo '<p><code>' . $accessToken . '</code></p>';
  echo '<br />';
  // if access is successful do this
  if ($accessToken != "") {
    echo '<p>Logged in to Spotify!</p>';
  } else {
    // if access is not successful, do this
    //GITHUB
    // echo '<p><a href="https://github.com/login/oauth/authorize?client_id=61fd6c2fbcbfe4f080b8">Sign in with GitHub</a></p>';
    echo '<p><a href="https://accounts.spotify.com/authorize?client_id=be5ee3a4215c4df69d8149f599c5134a&response_type=code&redirect_uri=www.illustratemyalbumcover.com/slimgemz/signin/callback&scope=user">Sign in to Spotify</a></p>';
  }

  // perhaps the preferred way to check is using isset
  if (!isset($accessToken)) {
    // GITHUB
    // echo '<p><a href="https://github.com/login/oauth/authorize?client_id=61fd6c2fbcbfe4f080b8">Sign in with GitHub</a></p>';
    echo '<p><a href="https://accounts.spotify.com/authorize?client_id=be5ee3a4215c4df69d8149f599c5134a"Sign in to Spotify</a></p>';
  } else {
    echo '<p> Isset Successfully Logged In to Spotify!</p>';
  }

 ?>
    <script src="site.js"></script>
</body>
</html>
