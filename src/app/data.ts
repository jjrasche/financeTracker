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
export const encryptedData = "U2FsdGVkX19toocg0adJUBrJVwAj4fLaqy1O3COL2O2iSKQQsL+jAxAZmCbHG/ETGIi8hfk91bfjYCt43bqHN/iFLwYIfA95jBVqfHOV6HTbY4cb35IOZ6f7pCWhUm0fCKzj1iuxJdABObD5eYcrs1U31ySNPG3AtGZ0DTpCyW8PJb6q3euO2f8vG2XvTdiE/2d2bI9AEsgAhwar4urZyCfk3efqpCQHneLt/Uu7u9YY5sEwyRIySXbB6worNxYz";