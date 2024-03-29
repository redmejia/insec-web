import { useState } from "react";

const baseURL = "http://localhost:8080/v1";
const baseMAILURL = "http://localhost:8081/v1"

export const useFetch = () => {
    // same response for register and login
    const [resp, setResp] = useState({
        success: false,
        message: "DENIED",
        my_business: {
            bus_id: 0,
            email: "",
            name: "",
            bus_name: ""
        }
    });

    // Creating new deal resp 
    const [deal, setDeal] = useState({
        created: false,
        error: true,
    })

    // Send Mail resp
    const [mailResp, setMailResp] = useState({
        message: "",
        delivered: false
    })

    // Search result for business nema
    const [serchResult, setSeachResult] = useState({
        deals: [
            {
                deal_id: 0,
                bus_id: 0,
                bus_name: "",
                pro_name: "",
                pro_desc: "",
                created_at: "",
                price: 0
            }
        ]
    })

    // All deals
    const [allDeals, setDeals] = useState({
        deals: [
            {
                bus_id: 0,
                email: "",
                bus_name: "",
                pro_name: "",
                pro_desc: "",
                created_at: "",
                price: 0
            }
        ]
    })

    // Update email
    const [updateMailResp, setUpdateMail] = useState({
        updated: false,
        error: true,
        business_info: {
            bus_id: 0,
            email: "",
            name: "",
            bus_name: ""
        }
    })

    // AUTH
    const registerUser = (user) => {
        fetch(baseURL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((resp) => resp.json())
            .then((resp) => setResp(resp));
    };

    const logninUser = (user) => {
        fetch(baseURL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((resp) => resp.json())
            .then((resp) => setResp(resp));
    }

    // Deal
    const createDeal = (newDeal) => {

        fetch(baseURL + "/deal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDeal)

        }).then(resp => resp.json())
            .then(resp => setDeal(resp)) // deal response
    }

    const changeDealCreatedState = () => {
        setDeal({ created: false })
    }

    // Send mail
    const sendMail = (message) => {
        console.log("this are sending ", message);
        fetch(baseMAILURL + "/mail/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).then(resp => {
            if (resp.ok && resp.status === 200) {
                setMailResp({ delivered: true, message: "Your message was send" })
            }
        })
    }

    const changeMailState = () => {
        setMailResp({
            delivered: false,
            message: ""
        })
    }

    // Search
    const searchDealsByBusinessName = (busName) => {
        fetch(baseURL + `/deal?bus_name=${busName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                setSeachResult(resp)
            })
    }


    // all deals
    const getAllDeals = () => {
    
        fetch(baseURL + "/deals/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(resp => resp.json())
            .then(resp => setDeals(resp))
    }

    const addNewDeal = (deal) => {
        setDeals({
            ...allDeals,
            deals : [...allDeals.deals, deal]
        })
    }


    // update email
    const updateBusinessEmail = (myBusiness) => {
        fetch(baseURL + "/my/business", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myBusiness)
        }).then(resp => resp.json())
            .then(resp => setUpdateMail(resp))
    }


    return {
        resp,
        deal, // deal created response
        mailResp,
        serchResult,
        allDeals,
        updateMailResp,
        registerUser,
        logninUser,
        createDeal,
        addNewDeal, // add new deal to state
        changeDealCreatedState,
        sendMail,
        changeMailState,
        searchDealsByBusinessName,
        getAllDeals,
        updateBusinessEmail
    };
};
