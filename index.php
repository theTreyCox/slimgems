<?php
  session_start();
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
  echo '<p>Access Token:</p>';
  echo '<p><code>' . $accessToken . '</code></p>';
  echo '<br />';
  if ($accessToken != "") {
    echo '<p>Logged in!</p>';
  } else {
    // not logged in
    echo '<p><a href="https://github.com/login/oauth/authorize?client_id=61fd6c2fbcbfe4f080b8">Sign in with GitHub</a></p>';
  }
 ?>
    <script src="site.js"></script>
</body>
</html>
