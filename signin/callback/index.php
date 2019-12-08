<?php
  // the REDIRECT URI is this

  // the auth code that is returned in the URL
  $code = $_GET['code'];
  //e9c0996dd812cdf2ff3f, for example

  if ($code == "") {
    // if code is null, return to this page
    header('Location: https://www.illustratemyalbumcover.com/slimgemz');
    exit;
  }

  // client id from service
  $CLIENT_ID = "61fd6c2fbcbfe4f080b8";
  // client secret from service
  $CLIENT_SECRET = "9275b6e34d091e5a41467e8c7ff3a9f9f2f7e5d4";
  // endpoint to get access_token from service
  $URL = "https://github.com/login/oauth/access_token";

  // parameters to include in curl POST requests to service
  $postParams = [
    'client_id' => $CLIENT_ID,
    'client_secret' => $CLIENT_SECRET,
    'code' => $code
  ];
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $URL);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postParams);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER,array('Accept: application/json'));
  $response = curl_exec($ch);
  curl_close($ch);

  $data = json_decode($response);

  if ($data->access_token != "") {
    session_start();
    $_SESSION['my_access_token_accessToken'] = $data->access_token;
    header('Location: https://www.illustratemyalbumcover.com/slimgemz');
    exit;
  }

  echo '<br/>';
  echo $data->error_description;
  // var_dump($data);
 ?>
