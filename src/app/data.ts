/* object representing financial data to be displayed on graph 
    Format:
    {
        label: <string: name to identify account>
        originationDate: <*date: date the account was started>
        originiationAmount: <*number: initial value in account at start> 
        data: {
            actual: [<*number: balance entry by month>]
            desired: <number: desired amount change each month>
            minimum: <number: minimum needed to pay off each month>
            // could potentially add infinite data lines here... these are the main ones I could see using.
        }
    }

    * denotes a required field
*/
// export const encryptedData = "U2FsdGVkX19toocg0adJUBrJVwAj4fLaqy1O3COL2O2iSKQQsL+jAxAZmCbHG/ETGIi8hfk91bfjYCt43bqHN/iFLwYIfA95jBVqfHOV6HTbY4cb35IOZ6f7pCWhUm0fCKzj1iuxJdABObD5eYcrs1U31ySNPG3AtGZ0DTpCyW8PJb6q3euO2f8vG2XvTdiE/2d2bI9AEsgAhwar4urZyCfk3efqpCQHneLt/Uu7u9YY5sEwyRIySXbB6worNxYz";
// export const encryptedData = "U2FsdGVkX19dSBVcnBQdynNCFqVc/dEB6m2trvBG72UKVGN+EXdyDTyh9NV1Aqh32Ple+du4gGtiNSaLQghX/u5rSO4QIWg3K6a/Mqeq3p3RIitmUoa8DvV/eZt5Tih3Oo+e695MCF3jDOL/+WCqDBArPgLq8YPBSHFjMMDZhW5rU2c004Hv/dfA1c2P4jMoXo0DTVdZh3vREAn4aPNG0Fg74i7YXU+D2WnHHoXp/JiHl478V1AoIN2D3qPzKnGQbGisuvKDv4f3T+6MiODDM2Vr+I8dUGg0DczyBREoHUXW9Pn226fhfKOL3080fUzZtSyyVz7elFAzqUGY6q3z25I7retboIosenRbusF0uxkF9TE9qn6Qez9k8Rd+Srf1TipxLPRuJvxGYk4rZzfy6g==";
export const encryptedData = "U2FsdGVkX186nZQErunrUeOU2Emdn7OWC19N26LXGvkBQ/SaRaeon/+jsujca8EzLB6vxyAWZfu2nxSQr7FpeyUNRdGVR1seztnIZNqd8REptNNBYoTqt94FSuvx1VG4Acgt32X+yCG5Z375a0RR7t6EweTYv2BSPftS9TOpdyKdi/mJVuI7MLqdCdZxU31wWV8TZOF+Lbzkpv+thr7AEokL7q5czXazV2We70IFCcZGNOnSMjIXCSYVbvUIi9RhGxdtK+wpTDUKW16+Py7cHankQsP/9zWts3oEelDrLhTOo61r0pQVjG0/inp98d3gvtwk0VebP80angn4us4VQamTvpmhy+ASyVv7Pw6vjonjSvxiOGV8WkUdwwVHDlKZ";
export const unencryptedData = `[
    {
        "name": "mortgage",
        "originationDate": "2017-08-01T05:00:00.000Z",
        "originationAmount": -250000,
        "type": 0,
        "financeData": [
            {"label": "actual", "type": 0, "data": [-249000, -248000, -247000, -245950, -244900, -241800]},
            {"label": "desired", "type": 1, "data": 1500},
            {"label": "minimum", "type": 2, "data": [{"constant": 1800, "duration": 3}, {"constant": 3000, "duration": 3}]}
        ]
    }
]`