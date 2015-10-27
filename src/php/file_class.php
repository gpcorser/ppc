<?php

    class FileGet {
        private $dir_arr = [];
        private $fil_arr = [];
        
        function __construct() {
            
        }
        
        function load_path_array($dir) {
           $this->dir_arr = [];
           $this->fil_arr = [];
           
            if ($handle = opendir($dir)) {
                while (false !== ($entry = readdir($handle))) {
                    $path = $dir . '/' . $entry;
                        
                    if ($entry != "." && $entry != "..") {
                        $isdir = is_dir($path);
                        if ( $isdir ) {
                            $at = -1;
                            for($i = 0; $i < count($this->dir_arr); $i++) {
                                if (strcmp($this->dir_arr[$i], $entry) > 0) {
                                    $at = $i;
                                    break;
                                }
                            }
                            
                            if ($at == -1)
                                array_push($this->dir_arr, $entry);
                            else
                                array_splice($this->dir_arr, $i, 0, $entry);
                        } else {
                            $at = -1;
                            for($i = 0; $i < count($this->fil_arr); $i++) {
                                if (strcmp($this->fil_arr[$i], $entry) > 0) {
                                    $at = $i;
                                    break;
                                }
                            }
                            
                            if ($at == -1)
                                array_push($this->fil_arr, $entry);
                            else
                                array_splice($this->fil_arr, $i, 0, $entry);
                        } 
                    }
                }
                closedir($handle);
            }
        }
        
        function readPath($_path) {
            $dir = "../../files/";
            if ($_path != null) $dir = $_path;
            $this->load_path_array($dir);
            
            return (json_encode( array(
                        'path'   => $dir,
                        'dirs'   => $this->dir_arr,
                        'files'  => $this->fil_arr
                    )));
        }
        
        function  getMIMI() {
			echo (file_get_contents("../mimi.json"));
		}
		function  getSettings() {
			echo (file_get_contents("../settings.conf"));
		}
		
		function getFileContents($_path) {
			
			return file_get_contents($_path);
		}
        
        function writeConfig($path, $data) {
            
            return file_put_contents($path, $data);
            
            
        }
        
    }

?>
