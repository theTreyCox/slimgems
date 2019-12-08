<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
    // function to handle errors
    function error($msg) {
      $response = [];
      $response['success'] = false;
      $response['message'] = $msg;
      return json_encode($response);
    }

    session_start();
    $accessToken = $_SESSION['my_access_token_accessToken'];

    // if access token is invalid
    if ($accessToken == "") {
      die(error('Error: Invalid access token'));
    }

    // url for GET request after authenticated
    $URL = "https://api.github.com/user";
    // headers to include
    // $authHeader = "Authorization: token " . $accessToken;
    // $userAgentHeader = "User-Agent: Demo";

    $httpHeaderArray = array(
      'Accept: application/json',
      'Authorization: token ' . $accessToken,
      'User-Agent: Demo',
    );

    // print the auth header to the page
    echo $authHeader . '<br />';

    // use curl to GET response after authentication
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeaderArray);
    $response = curl_exec($ch);
    curl_close($ch);

    // decode the response and convert to JSON
    $data = json_decode($response);

    // encode the JSON and print it to the screen
    echo json_encode($data);
     ?>

  </body>
</html>
