//This is where state goes
import { v4 as uuidv4} from 'uuid'
import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    //State
    const [feedback, setFeedback] = useState([

    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchFeedback()
    }, [])

    //Fetch Feedback -- Getting Feedback from JSON Server
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    //Set Item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }
    //Delete Feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    //Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    //Update Feedback Item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {... item, ...updItem} : item))
    }
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit, ///Actual Item to Edit
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback, //This is the function
        updateFeedback, //Updates Feedback

    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext