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
  // GITHUB CLIENT ID
  // $CLIENT_ID = "61fd6c2fbcbfe4f080b8";
  $CLIENT_ID = "be5ee3a4215c4df69d8149f599c5134a";
  // client secret from service
  // GITHUB CLIENT SECRET
  // $CLIENT_SECRET = "9275b6e34d091e5a41467e8c7ff3a9f9f2f7e5d4";
  $CLIENT_SECRET = "d67ef826dc7b468eb558019e145a80de";
  // endpoint to get access_token from service
  // GITHUB TOKEN URL
  // $URL = "https://github.com/login/oauth/access_token";
  $URL = "https://accounts.spotify.com/api/token";

  // parameters to include in curl POST requests to service
  $postParams = array(
    'client_id' => $CLIENT_ID,
    'client_secret' => $CLIENT_SECRET,
    'code' => $code
  );

  $httpPostHeaders = array(
    'Accept: application/json',
  );

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $URL);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postParams);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $httpPostHeaders);
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
