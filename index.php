<?php

$dddCompact = require_once('DddCompact.php');
$educationStore = require_once('EducationStore.php');
$education = $dddCompact->makeDomain(__DIR__.'/Education', $educationStore);

$school = $education->get('School');

var_dump($school->appear());