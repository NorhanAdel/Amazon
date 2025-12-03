export const getproduct = () => async (dispatch) => {
    try {
        const data = await fetch("http://localhost:5000/allproducts", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        const res = data.json();
        console.log(res)
        dispatch ({type:"SUCCES_GET_PRODUCT", payload:res})
    } catch (err) {
        dispatch({ type: "FAIL_GET_PRODUCT", payload: err.response });
        
    }
}
    
