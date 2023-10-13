// dir
if(stat(file_data, &s1) == 0 && (s1.st_mode & S_IFDIR)){
	
}

// file
if(stat(file_data, &s1) == 0 && (s1.st_mode & S_IFREG)){
	
}