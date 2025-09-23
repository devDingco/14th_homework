export const checkVaildationFile = (file: File) => {
    if(typeof file === "undefined"){
        return false
    }

    if(file.size  > 5 * 1024 * 1024){
        return false
    }

    if(!file.type.includes("jpeg") && !file.type.includes("png")){
        return false
    }
    return true;
}