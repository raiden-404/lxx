import Cookies from "js-cookie";

export const addItemFromBackend = async ({ id, quantity }) => {
    const body = {
        productId: id,
        quantity: quantity
    };
    const jwtToken = Cookies.get("jwtToken");
    const apiUri = "http://localhost:8080/user/add-cart-item";
    const response = await fetch(apiUri, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
    });
    const result = await response.text();
    return result;
}

export const removeItemFromBackend = async ({ id, quantity }) => {
    const body = {
        productId: id,
        quantity: quantity
    };
    const jwtToken = Cookies.get("jwtToken");
    const apiUri = "http://localhost:8080/user/remove-cart-item";
    const response = await fetch(apiUri, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
    });
    const result = response.text();
    return result;
}

//Fetching cart data and store in redux
export const fetchCart = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
        try {
            const apiUri = "http://localhost:8080/user/get-cart";
            const response = await fetch(apiUri, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });

            const result = await response.json();
            return await result;

        } catch (error) {
            console.log("Error while loading cart ", error);
        }
    }
}
