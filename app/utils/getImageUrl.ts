import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/clientApp";
import axios from "axios";
import { print } from "./console";





export const getUrl = async (src: string) => {

    const pathReference = ref(storage, src);
    var url = ""
    try {
        url = await getDownloadURL(pathReference);

        const response = await fetch(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });

        const buffer = await response.arrayBuffer();
        print(buffer);
        print(buffer);
        print(buffer);
        print(buffer);
        print(buffer);
        print(buffer);
        print(buffer);
        return buffer;
    } catch (error) {
        console.error(error);
        return null;
    }


}