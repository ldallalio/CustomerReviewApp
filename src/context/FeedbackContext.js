//This is where state goes
import { v4 as uuidv4} from 'uuid'
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id:1,
            text: 'This item is from context #1',
            rating:1
        },
        {
            id:2,
            text: 'This item is from context #2',
            rating:5
        },
        {
            id:4,
            text: 'This item is from context #3',
            rating:9
        },
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
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
        deleteFeedback,
        addFeedback,
        editFeedback, //This is the function
        updateFeedback, //Updates Feedback

    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext