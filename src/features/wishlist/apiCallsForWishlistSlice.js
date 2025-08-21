import Cookies from "js-cookie";

export const addItemToBackendWishlist = async (id) => {

    const jwtToken = Cookies.get("jwtToken");
    const apiUri = `${import.meta.env.VITE_API_URL}/user/add-wishlist-item`;
    const response = await fetch(apiUri, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(id),
    });
    const result = await response.text();
    return result;
}

export const removeItemFromBackendWishlist = async (id) => {
    
    const jwtToken = Cookies.get("jwtToken");
    const apiUri = `${import.meta.env.VITE_API_URL}/user/remove-wishlist-item`;
    const response = await fetch(apiUri, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(id),
    });
    const result = response.text();
    return result;
}