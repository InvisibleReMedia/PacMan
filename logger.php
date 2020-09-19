<?php

function logger($logMsg) {
    file_put_contents('../pacman.log', $logMsg . PHP_EOL, FILE_APPEND | LOCK_EX);
}

logger($_GET['message'])


?>