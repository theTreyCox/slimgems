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

  function error($msg) {
    $response = [];
    $response['success'] = false;
    $response['message'] = $msg;
    return json_encode($response);
  }

  session_start();
  $accessToken = $_SESSION['my_access_token_accessToken'];

  if ($accessToken == "") {
    die(error('Eoor: Invalid access token'));
  }

  $URL = "https://api.github.com/user";
  $authHeader = "Authorization: token" . $accessToken;
  $userAgentHeader = "User-Agent: Demo";

  echo $authHeader . '<br />';

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $URL);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER,array('Accept: application/json', $authHeader, $userAgentHeader));
  $response = curl_exec($ch);
  curl_close($ch);

  $data = json_decode($response);


 ?>
    <script src="site.js"></script>
</body>
</html>
