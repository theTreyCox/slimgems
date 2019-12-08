<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
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
    $authHeader = "Authorization: token " . $accessToken;
    $userAgentHeader = "User-Agent: Demo";

    echo $authHeader . '<br />';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER,array('Accept: application/json', $authHeader, $userAgentHeader));
    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response);

    echo json_encode($data);

     ?>
  </body>
</html>
