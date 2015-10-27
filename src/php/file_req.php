<?php
    
    include_once('file_class.php');
    $fg = new FileGet();
    
    $cmd = $_SERVER['PATH_INFO'];
    $qs = $_SERVER['QUERY_STRING'];
    $sql_rp = urldecode($qs);
    parse_str($sql_rp);
    
    switch ($cmd) {
		case ('/GETFILES'): {
            if (isset($_POST['source']))
                echo $fg->readPath($_POST['source']);
            else
                echo $fg->readPath("");
            exit;
		} break;
		case ('/GETMIMI'): {
			echo $fg->getMIMI();
			exit;
		} break;
		case ('/GETFILECONTENTS'): {
                
            if (isset($_POST['source'])) {
                echo $fg->getFileContents($_POST['source']);
            }else
                echo $fg->getFileContents($sql_rp);
			exit;
		} break;
		case ('/WRITECONFIG'): {
		    echo $fg->writeConfig($_POST['source'], $_POST['data']);
		    exit;
		    
		} break;
		case ('/GETSETTINGS'): {
		    echo $fg->getSettings();
			exit;
		} break;
    }
    echo $cmd;
    
?>
