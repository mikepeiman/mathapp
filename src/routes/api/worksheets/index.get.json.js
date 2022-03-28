import { getWorksheetsFromSupabase } from "$stores/math";

export const get = async () => {
    const { data, error } = await getWorksheetsFromSupabase();
    if (error) {
        console.error(error);
    } else {
        return {
            status: 200,
            body: { data }
        }
    }
}