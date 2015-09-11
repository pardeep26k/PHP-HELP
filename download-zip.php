<?php

$files = Array(
    'https://scontent.fdel1-1.fna.fbcdn.net/hphotos-xaf1/v/t1.0-9/11755214_918302304907084_8668927868624235520_n.jpg?oh=16d9ea1f0e9b5c89de7d6c738bd96f98&oe=569F728E',
    'https://scontent.fdel1-1.fna.fbcdn.net/hphotos-xtp1/v/t1.0-9/11825068_926904840713497_2808773665250094429_n.jpg?oh=636fdeffd1b4c93eca4ea4a4f7114d03&oe=56759BA5'
    );

# create new zip opbject
$zip = new ZipArchive();
# create a temp file & open it
$tmp_file = tempnam('.','');
$zip->open($tmp_file, ZipArchive::CREATE);

# loop through each file
foreach($files as $file){

    # download file
    $download_file = file_get_contents($file);

    #add it to the zip
    $zip->addFromString(basename($file),$download_file);

}

# close zip
$zip->close();

# send the file to the browser as a download
header('Content-disposition: attachment; filename=download.zip');
header('Content-type: application/zip');
readfile($tmp_file);
?>
