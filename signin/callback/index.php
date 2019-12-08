<?php
  $code = $_GET['code'];
  //e9c0996dd812cdf2ff3f

  if ($code == "") {
    header('Location: https://www.illustratemyalbumcover.com/slimgems');
    exit;
  }

  $CLIENT_ID = "61fd6c2fbcbfe4f080b8";
  $CLIENT_SECRET = "9275b6e34d091e5a41467e8c7ff3a9f9f2f7e5d4";
  $URL = "https://github.com/login/oauth/access_token";

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
  echo '<br/>';
  var_dump($data);
 ?>
